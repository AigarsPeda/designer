<template>
  <nav>
    <div class="nav-buttons">
      <MenuBackButton />
      <ColorList
        :colors="COLORS"
        :selectedColor="canvasStore.getDrawingSettings.stroke"
        :handleColorClick="
          (color) =>
            canvasStore.setDrawingSettings({
              drawingSettings: {
                ...canvasStore.getDrawingSettings,
                stroke: color,
              },
            })
        "
      />
    </div>
  </nav>
</template>

<script setup lang="ts">
import ColorList from "@/components/ColorList.vue";
import MenuBackButton from "@/components/contextMenus/MenuBackButton.vue";
import { COLORS } from "@/hardcoded";
import useCanvasStore from "@/stores/useCanvasStore";

const canvasStore = useCanvasStore();
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

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  margin: 0;
  padding: 0;
}
.nav-buttons {
  gap: 0.5rem;
  width: 100%;
  gap: 0.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.color-container {
  gap: 0.5rem;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(2, 1fr);
}

.color-btn {
  width: 2rem;
  height: 2rem;
  border: none;
  opacity: 0.9;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  justify-content: center;
  transition: all 0.2s ease-in-out;
}

.color-btn_active {
  border: 2px solid #374151;
  opacity: 1;
}

@media (hover: hover) {
  .color-btn:hover {
    opacity: 1;
    cursor: pointer;
  }
}
</style>
