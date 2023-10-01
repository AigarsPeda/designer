<template>
  <nav>
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
      :selectedColor="canvasStore.getSquareModeSettings.background"
      :colors="BACKGROUND_COLORS"
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
  </nav>
</template>

<script setup lang="ts">
import ColorList from "@/components/ColorList.vue";
import SquareOption from "@/components/SquareOption.vue";
import { BACKGROUND_COLORS, COLORS } from "@/hardcoded";
import useCanvasStore from "@/stores/useCanvasStore";
import type {
  CustomGroupI,
  CustomITextI,
  CustomRectI,
} from "@/types/fabric.types";
import createAllPatterns from "@/utils/fabricUtils/createAllPatterns";
import findPattern from "@/utils/fabricUtils/findPattern";
import updateCanvasRect from "@/utils/fabricUtils/updateCanvasRect";
import { watch } from "vue";

const canvasStore = useCanvasStore();
const pasterns = createAllPatterns();

watch(
  () => {
    return {
      // selectedObj: canvasStore.getSelectedObjInCanvas,
      getSelectedCanvas: canvasStore.getSelectedCanvas,
      getSquareModeSettings: canvasStore.getSquareModeSettings,
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

      if (element.type === "rect") {
        const rect = element as CustomRectI;
        updateCanvasRect({
          rect,
          squareSettings: getSquareModeSettings,
          pattern: findPattern({
            pasterns,
            stroke: getSquareModeSettings.stroke,
            background: getSquareModeSettings.background,
          }),
        });
        continue;
      }

      if (element.type === "i-text") {
        const text = element as CustomITextI;
        text.set({
          fill: getSquareModeSettings.stroke,
          // stroke: getSquareModeSettings.stroke,
        });
        continue;
      }

      getSelectedCanvas?.add(element);
    }

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

.info {
  font-weight: 500;
  color: #64748b;
  font-size: 0.65rem;
}
</style>
