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
    <!-- <div v-if="uiStore.getCanvasMode === 'square'"> -->
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
