<template>
  <div class="nav-buttons">
    <Button
      isFullWidth
      title="Rounded"
      @click="handleShapeChange('rounded')"
      :isSelect="canvasStore.getSquareModeSettings.rx === 10"
    >
      <template #icon>
        <ReRoundedCorner class="icon" />
      </template>
    </Button>
    <Button
      isFullWidth
      title="Sharp"
      @click="handleShapeChange('sharp')"
      :isSelect="canvasStore.getSquareModeSettings.rx === 0"
    >
      <template #icon>
        <PxSharpCorner class="icon" />
      </template>
    </Button>
    <!-- <Button
      isFullWidth
      title="Background"
      @click="handleBackgroundChange"
      :isSelect="canvasStore.getSquareModeSettings.backgroundPattern === 'dots'"
    >
      <template #icon>
        <FlGridDots class="icon" />
      </template>
    </Button> -->
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/Button.vue";
import useCanvasStore from "@/stores/useCanvasStore";
import type { ShapeType } from "@/types/shape.types";
import {
  FlGridDots,
  PxSharpCorner,
  ReRoundedCorner,
} from "@kalimahapps/vue-icons";

const canvasStore = useCanvasStore();

const handleShapeChange = (shape: ShapeType) => {
  canvasStore.setSquareModeSettings({
    squareModeSettings: {
      ...canvasStore.getSquareModeSettings,
      rx: shape === "rounded" ? 10 : 0,
      ry: shape === "rounded" ? 10 : 0,
    },
  });
};

// const handleBackgroundChange = () => {
//   canvasStore.setSquareModeSettings({
//     squareModeSettings: {
//       ...canvasStore.getSquareModeSettings,
//       backgroundPattern:
//         canvasStore.getSquareModeSettings.backgroundPattern === "dots"
//           ? "none"
//           : "dots",
//     },
//   });
// };
</script>

<style scoped>
.icon {
  font-size: 2em;
}
.nav-buttons {
  gap: 0.5rem;
  padding-top: 0.5rem;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(2, 1fr);
}
</style>
