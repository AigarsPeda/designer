<template>
  <nav>
    <p class="info">Stroke</p>
    <ColorList
      :selectedColor="strokeColor"
      :handleColorClick="(color) => handleStrokeColorChange(color)"
    />
    <p class="info">Background</p>
    <ColorList
      :selectedColor="fillColor"
      :opacity="SHAPE_BACKGROUND_OPACITY"
      :handleColorClick="(color) => handleFillColorChange(color)"
    />
  </nav>
</template>

<script setup lang="ts">
import ColorList from "@/components/ColorList.vue";
import { SHAPE_BACKGROUND_OPACITY } from "@/hardcoded";
import useCanvasStore from "@/stores/useCanvasStore";
import type { CustomObjI } from "@/types/fabric.types";
import { ref } from "vue";

const fillColor = ref("");
const strokeColor = ref("");

const canvasStore = useCanvasStore();

const getSelectedObjInCanvas = () => {
  const selectedObjIds = canvasStore.getSelectedObjectIds;
  const canvasObj = canvasStore.getSelectedCanvas?.getObjects() as CustomObjI[];

  const selectedObj = canvasObj.filter((obj) => {
    return selectedObjIds.includes(obj.id);
  });

  return selectedObj;
};

const handleStrokeColorChange = (color: string) => {
  strokeColor.value = color;

  const selectedObj = getSelectedObjInCanvas();

  for (var i = 0; i < selectedObj.length; i++) {
    const obj = selectedObj[i];

    obj.set({
      // fill: color,
      stroke: color,
    });

    if (obj._objects) {
      console.error("obj does not have _objects property");
      for (var j = 0; j < obj._objects.length; j++) {
        const obj2 = obj._objects[j];

        obj2.set({
          fill: color,
        });
      }
    }
  }

  canvasStore.getSelectedCanvas?.renderAll();
};

const handleFillColorChange = (color: string) => {
  fillColor.value = color;

  const selectedObj = getSelectedObjInCanvas();

  for (var i = 0; i < selectedObj.length; i++) {
    const obj = selectedObj[i];

    obj.set({
      fill: color,
    });

    if (obj._objects) {
      console.error("obj does not have _objects property");
      for (var j = 0; j < obj._objects.length; j++) {
        const obj2 = obj._objects[j];

        obj2.set({
          fill: color,
        });
      }
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

.info {
  font-weight: 500;
  color: #64748b;
  font-size: 0.65rem;
}
</style>
