<template>
  <nav>
    <ColorList
      :selectedColor="fillColor"
      :handleColorClick="(color) => handleFillColorChange(color)"
    />
  </nav>
</template>

<script setup lang="ts">
import ColorList from "@/components/ColorList.vue";
import useCanvasStore from "@/stores/useCanvasStore";
import type { CustomObjI } from "@/types/fabric.types";
import { ref } from "vue";

const fillColor = ref("");
const canvasStore = useCanvasStore();

const getSelectedObjInCanvas = () => {
  const selectedObjIds = canvasStore.getSelectedObjectIds;
  const canvasObj = canvasStore.getSelectedCanvas?.getObjects() as CustomObjI[];

  const selectedObj = canvasObj.filter((obj) => {
    return selectedObjIds.includes(obj.id);
  });

  return selectedObj;
};

const handleFillColorChange = (color: string) => {
  fillColor.value = color;

  const selectedObj = getSelectedObjInCanvas();

  for (var i = 0; i < selectedObj.length; i++) {
    const obj = selectedObj[i];

    if (!obj._objects) {
      console.error("obj does not have _objects property");
      return;
    }

    for (var j = 0; j < obj._objects.length; j++) {
      const obj2 = obj._objects[j];

      obj2.set({
        fill: color,
      });
    }
  }

  canvasStore.getSelectedCanvas?.renderAll();
};
</script>

<style scoped>
nav {
  gap: 0.5rem;
  width: 5.5rem;
  display: flex;
  padding: 0.5rem;
  flex-direction: column;
  justify-content: space-between;
}
</style>
