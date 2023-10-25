<template>
  <nav>
    <MenuBackButton />
    <p class="info">Stroke</p>
    <ColorList
      :colors="COLORS"
      :selectedColor="canvasStore.getSquareSettings.stroke"
      :handleColorClick="
        (color) =>
          canvasStore.setSquareSettings({
            squareSettings: {
              ...canvasStore.getSquareSettings,
              stroke: color,
            },
          })
      "
    />
    <!-- <div v-if="uiStore.getCanvasMode === 'square'"> -->
    <p class="info">Background</p>
    <ColorList
      :colors="BACKGROUND_COLORS"
      :selectedColor="canvasStore.getSquareSettings.background"
      :handleColorClick="
        (color) =>
          canvasStore.setSquareSettings({
            squareSettings: {
              ...canvasStore.getSquareSettings,
              background: color,
            },
          })
      "
    />

    <SquareOption />
    <!-- </div> -->
  </nav>
</template>

<script setup lang="ts">
import ColorList from "@/components/ColorList.vue";
import SquareOption from "@/components/SquareOption.vue";
import MenuBackButton from "@/components/contextMenus/MenuBackButton.vue";
import { BACKGROUND_COLORS, COLORS } from "@/hardcoded";
import useCanvasStore from "@/stores/useCanvasStore";

// const uiStore = useUIStore();
const canvasStore = useCanvasStore();
</script>

<style scoped>
nav {
  gap: 0.5rem;
  display: flex;
  width: 13rem;
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
