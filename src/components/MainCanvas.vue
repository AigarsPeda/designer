<template>
  <div class="design-canvas-container" ref="elRef">
    <FabricCanvas
      :id="'1'"
      @canvas-created="handleCanvasCreated"
      @selection-created="handleObjSelected"
      @selection-updated="handleObjSelected"
      @selection-cleared="handleObjSelectedCleared"
    />
  </div>
</template>

<script setup lang="ts">
import FabricCanvas from "@/components/FabricCanvas.vue";
import useKeydownListener from "@/composables/useKeydownListener";
import useCanvasStore from "@/stores/useCanvasStore";
import useUIStore from "@/stores/useUIStore";
import deleteActiveCanvasObjWithBackspace from "@/utils/fabricUtils/deleteActiveCanvasObjWithBackspace";
import drawStrokeOnCanvas from "@/utils/fabricUtils/drawStrokeOnCanvas";
import handleCanvasBackgroundColor from "@/utils/fabricUtils/handleCanvasBackgroundColor";
import handleCanvasPanning from "@/utils/fabricUtils/handleCanvasPanning";
import handleSquareDrawing from "@/utils/fabricUtils/handleSquareDrawing";
import isCanvasObjSelectable from "@/utils/fabricUtils/isCanvasObjSelectable";
import makeAllObjCanvasSelectable from "@/utils/fabricUtils/makeAllObjCanvasSelectable";
import makeAllObjCanvasUnselectable from "@/utils/fabricUtils/makeAllObjCanvasUnselectable";
import resetCanvasMouseMoveUpDown from "@/utils/fabricUtils/resetCanvasMouseMoveUpDown";
import dotPattern from "@/utils/svgUtils/patterns/dotPattern";
import { fabric } from "fabric";
import { ref, watch } from "vue";

const uiStore = useUIStore();
const canvasStore = useCanvasStore();
const elRef = ref<HTMLDivElement | null>(null);

const { addListener, removeListener } = useKeydownListener((e) => {
  const canvas = canvasStore.getSelectedCanvas;

  if (!canvas) {
    return;
  }

  deleteActiveCanvasObjWithBackspace(e, canvas);
});

const handleCanvasCreated = (fabricCanvas: fabric.Canvas) => {
  canvasStore.setSelectedCanvas({
    selectedCanvas: fabricCanvas,
  });
};

const handleObjSelected = (opt: fabric.IEvent) => {
  console.log("obj selected --->", opt);
  addListener();
  uiStore.setCanvasMode({
    canvasMode: "ObjContextMenu",
  });
};

const handleObjSelectedCleared = (opt: fabric.IEvent) => {
  console.log("obj cleared --->", opt);
  removeListener();
  uiStore.setCanvasMode({
    canvasMode: "mainMenu",
  });
};

watch(
  () => {
    return {
      getCanvasMode: uiStore.getCanvasMode,
      getIsDotBackground: uiStore.getIsDotBackground,
      getSelectedCanvas: canvasStore.getSelectedCanvas,
      getDrawingSettings: canvasStore.getDrawingSettings,
      getSquareModeSettings: canvasStore.getSquareModeSettings,
    };
  },
  (newSate) => {
    const {
      getCanvasMode,
      getSelectedCanvas,
      getDrawingSettings,
      getIsDotBackground,
      getSquareModeSettings,
    } = newSate;

    resetCanvasMouseMoveUpDown(getSelectedCanvas);

    if (isCanvasObjSelectable(getCanvasMode)) {
      makeAllObjCanvasUnselectable(getSelectedCanvas);
    }

    if (!isCanvasObjSelectable(getCanvasMode)) {
      makeAllObjCanvasSelectable(getSelectedCanvas);
    }

    switch (uiStore.getCanvasMode) {
      case "drawing":
        drawStrokeOnCanvas({
          canvas: getSelectedCanvas,
          drawingSettings: getDrawingSettings,
        });
        break;
      case "panning":
        handleCanvasPanning({ canvas: getSelectedCanvas });
        break;
      case "square":
        handleSquareDrawing({
          canvas: getSelectedCanvas,
          squareModeSettings: getSquareModeSettings,
        });
        break;
      case "mainMenu":
        // handleContextSelectDeselect({
        //   removeListener,
        //   canvas: getSelectedCanvas,
        //   action: (str, ids) => {
        //     // uiStore.setCanvasMode({
        //     //   canvasMode: str,
        //     // });
        //     // canvasStore.setSelectedObjectIds({
        //     //   selectedObjectIds: ids,
        //     // });
        //   },
        // });
        break;
      case "ObjContextMenu":
        // addListener();
        // addListener();
        // handleContextSelectDeselect({
        //   removeListener,
        //   canvas: getSelectedCanvas,
        //   action: (str, ids) => {
        //     uiStore.setCanvasMode({
        //       canvasMode: str,
        //     });
        //     canvasStore.setSelectedObjectIds({
        //       selectedObjectIds: ids,
        //     });
        //   },
        // });
        break;

      default:
        resetCanvasMouseMoveUpDown(getSelectedCanvas);
        break;
    }

    handleCanvasBackgroundColor({
      canvas: getSelectedCanvas,
      backgroundColor: getIsDotBackground ? dotPattern({}) : "transparent",
    });
  }
);
</script>

<style scoped>
span {
  font-weight: bold;
  color: #000;
}

.design-canvas-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
}
</style>
