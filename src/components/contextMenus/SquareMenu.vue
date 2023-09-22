<template>
  <nav>
    <Logo />
    <MenuBackButton />
    <p class="info">Stroke</p>
    <ColorList
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
      :opacity="SHAPE_BACKGROUND_OPACITY"
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
    <div class="nav-buttons">
      <Button
        isFullWidth
        title="Hexagon"
        @click="handleShapeChange('hexagon')"
        :isSelect="selectedShape === 'hexagon'"
      >
        <template #icon>
          <vue-feather type="hexagon" size="16" class="icon" />
        </template>
      </Button>
      <Button
        isFullWidth
        title="Square"
        @click="handleShapeChange('square')"
        :isSelect="selectedShape === 'square'"
      >
        <template #icon>
          <vue-feather type="square" size="16" class="icon" />
        </template>
      </Button>
      <Button
        isFullWidth
        title="Triangle"
        @click="handleShapeChange('triangle')"
        :isSelect="selectedShape === 'triangle'"
      >
        <template #icon>
          <vue-feather type="triangle" size="16" class="icon" />
        </template>
      </Button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import Button from "@/components/Button.vue";
import ColorList from "@/components/ColorList.vue";
import Logo from "@/components/Logo.vue";
import MenuBackButton from "@/components/contextMenus/MenuBackButton.vue";
import { SHAPE_BACKGROUND_OPACITY } from "@/hardcoded";
import useCanvasStore from "@/stores/useCanvasStore";
import { ref } from "vue";
import VueFeather from "vue-feather";

type ShapeType = "square" | "triangle" | "hexagon";

const canvasStore = useCanvasStore();

const selectedShape = ref<ShapeType>("square");

const handleShapeChange = (shape: ShapeType) => {
  selectedShape.value = shape;
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

.nav-buttons {
  gap: 0.5rem;
  width: 100%;
  gap: 0.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
