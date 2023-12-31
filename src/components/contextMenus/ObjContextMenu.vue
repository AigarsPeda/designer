<template>
  <nav>
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
    <div class="divider" />
    <AdditionOptions />
  </nav>
</template>

<script setup lang="ts">
import AdditionOptions from "@/components/AdditionOptions.vue";
import ColorList from "@/components/ColorList.vue";
import SquareOption from "@/components/SquareOption.vue";
import { BACKGROUND_COLORS, COLORS } from "@/hardcoded";
import useCanvasStore from "@/stores/useCanvasStore";
import type {
  CustomGroupI,
  CustomITextI,
  CustomRectI,
} from "@/types/fabric.types";
import updateCanvasRect from "@/utils/fabricUtils/updateCanvasRect";
import { watch } from "vue";

const canvasStore = useCanvasStore();

watch(
  () => {
    return {
      getSelectedCanvas: canvasStore.getSelectedCanvas,
      getSquareModeSettings: canvasStore.getSquareSettings,
    };
  },
  (newSate) => {
    const { getSelectedCanvas, getSquareModeSettings } = newSate;
    const selectedObj = getSelectedCanvas?.getActiveObjects();

    if (!selectedObj) {
      return;
    }

    for (let i = 0; i < selectedObj.length; i++) {
      const element = selectedObj[i];

      if (element.type === "group") {
        const group = element as CustomGroupI;

        for (var j = 0; j < group._objects.length; j++) {
          const obj2 = group._objects[j];

          obj2.set({
            fill: getSquareModeSettings.stroke,
          });
        }
        continue;
      }

      if (element.type === "polyline") {
        const arrow = element;
        arrow.setOptions({
          // stroke: getSquareModeSettings.stroke,
          // getSquareModeSettings.stroke
          fill: getSquareModeSettings.stroke,
        });
        continue;
      }

      if (element.type === "line") {
        const line = element as CustomITextI;
        line.setOptions({
          // stroke: getSquareModeSettings.stroke,
          stroke: getSquareModeSettings.stroke,
        });
        continue;
      }

      if (element.type === "path") {
        const path = element as CustomRectI;
        path.setOptions({
          fill: getSquareModeSettings.stroke,
        });
        continue;
      }

      if (element.type === "rect") {
        const rect = element as CustomRectI;

        updateCanvasRect({
          rect,
          squareSettings: getSquareModeSettings,
        });

        continue;
      }

      if (element.type === "i-text") {
        const text = element as CustomITextI;
        text.setOptions({
          fill: getSquareModeSettings.stroke,
        });

        continue;
      }

      // getSelectedCanvas?.add(element);
    }

    getSelectedCanvas?.fire("object:modified");
    getSelectedCanvas?.renderAll();
  }
);
</script>

<style scoped>
nav {
  gap: 0.5rem;
  width: 13rem;
  display: flex;
  padding: 0.5rem;
  flex-direction: column;
  justify-content: space-between;
}

.divider {
  width: 100%;
  height: 1.5px;
  background-color: #64748b;
}

.info {
  font-weight: 500;
  color: #64748b;
  font-size: 0.65rem;
}
</style>
