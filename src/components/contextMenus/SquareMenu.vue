<template>
  <nav>
    <MenuBackButton />
    <p class="info">Stroke</p>
    <ColorList
      :colors="COLORS"
      :selectedColor="canvasStore.getSquareModeSettings.stroke"
      :handleColorClick="
        (color) =>
          canvasStore.setSquareModeSettings({
            squareModeSettings: {
              ...canvasStore.getSquareModeSettings,
              stroke: color,
            },
          })
      "
    />
    <p class="info">Background</p>
    <ColorList
      :colors="BACKGROUND_COLORS"
      :selectedColor="canvasStore.getSquareModeSettings.background"
      :handleColorClick="
        (color) =>
          canvasStore.setSquareModeSettings({
            squareModeSettings: {
              ...canvasStore.getSquareModeSettings,
              background: color,
            },
          })
      "
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
import MenuBackButton from "@/components/contextMenus/MenuBackButton.vue";
import { BACKGROUND_COLORS, COLORS } from "@/hardcoded";
import useCanvasStore from "@/stores/useCanvasStore";
import type { ShapeType } from "@/types/shape.types";
import { ref } from "vue";

const canvasStore = useCanvasStore();
const selectedShape = ref<ShapeType>("rounded");

const handleShapeChange = (shape: ShapeType) => {
  selectedShape.value = shape;
  canvasStore.setSquareModeSettings({
    squareModeSettings: {
      ...canvasStore.getSquareModeSettings,
      rx: shape === "rounded" ? 10 : 0,
      ry: shape === "rounded" ? 10 : 0,
    },
  });
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
