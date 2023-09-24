<template>
  <nav>
    <!-- <Logo /> -->
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
    <div class="nav-buttons">
      <Button
        isFullWidth
        title="Rounded"
        @click="handleShapeChange('rounded')"
        :isSelect="selectedShape === 'rounded'"
      >
        <template #icon>
          <ReRoundedCorner class="icon" />
        </template>
      </Button>
      <Button
        isFullWidth
        title="Sharp"
        @click="handleShapeChange('sharp')"
        :isSelect="selectedShape === 'sharp'"
      >
        <template #icon>
          <PxSharpCorner class="icon" />
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
import { BACKGROUND_COLORS, COLORS } from "@/hardcoded";
import useCanvasStore from "@/stores/useCanvasStore";
import { PxSharpCorner, ReRoundedCorner } from "@kalimahapps/vue-icons";
import { ref } from "vue";

type ShapeType = "rounded" | "sharp";

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
  width: 10.2rem;
  display: flex;
  padding: 0.5rem;
  flex-direction: column;
  justify-content: space-between;
}

.icon {
  font-size: 2em;
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
  /* flex-direction: column; */
}
</style>
