<template>
  <nav>
    <p class="info">Stroke</p>
    <ColorList
      :colors="COLORS"
      :selectedColor="strokeColor"
      :handleColorClick="(color) => handleStrokeColorChange(color)"
    />
    <p class="info">Background</p>
    <ColorList
      :selectedColor="fillColor"
      :colors="BACKGROUND_COLORS"
      :handleColorClick="(color) => handleFillColorChange(color)"
    />
    <SquareOption
      :selectedShape="selectedShape"
      :handleShapeChange="handleShapeChange"
    />
  </nav>
</template>

<script setup lang="ts">
import ColorList from "@/components/ColorList.vue";
import SquareOption from "@/components/SquareOption.vue";
import { BACKGROUND_COLORS, COLORS } from "@/hardcoded";
import useCanvasStore from "@/stores/useCanvasStore";
import type { ShapeType } from "@/types/shape.types";
import { ref } from "vue";

const fillColor = ref("");
const strokeColor = ref("");
const canvasStore = useCanvasStore();
const selectedShape = ref<ShapeType>(null);

const handleShapeChange = (shape: ShapeType) => {
  selectedShape.value = shape;
  const selectedObj = canvasStore.getSelectedObjInCanvas;
  console.log("handleShapeChange", selectedObj);

  for (let i = 0; i < selectedObj.length; i++) {
    const element = selectedObj[i];

    element.setOptions({
      rx: shape === "rounded" ? 10 : 0,
      ry: shape === "rounded" ? 10 : 0,
    });

    // if (element.type === "rect") {
    //   console.error("element is not rect");
    //   // element.set({
    //   //   rx: shape === "rounded" ? 10 : 0,
    //   //   ry: shape === "rounded" ? 10 : 0,
    //   // });
    //   continue;
    // }
  }

  canvasStore.getSelectedCanvas?.renderAll();
};

const handleStrokeColorChange = (color: string) => {
  strokeColor.value = color;

  const selectedObj = canvasStore.getSelectedObjInCanvas;

  for (let i = 0; i < selectedObj.length; i++) {
    const obj = selectedObj[i];

    obj.set({
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

  const selectedObj = canvasStore.getSelectedObjInCanvas;

  for (let i = 0; i < selectedObj.length; i++) {
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
  display: flex;
  width: 10.2rem;
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
