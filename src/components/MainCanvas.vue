<template>
  <div class="design-canvas-container" ref="elRef">
    <FabricCanvas
      :id="'1'"
      @mouse-dblclick="handleDoubleClick"
      @canvas-created="handleCanvasCreated"
      @selection-created="handleObjSelected"
      @selection-updated="handleObjSelected"
      @object-added="saveCanvasToLocalStorage"
      @object-removed="saveCanvasToLocalStorage"
      @object-modified="saveCanvasToLocalStorage"
      @selection-cleared="handleObjSelectionCleared"
    />
  </div>
</template>

<script setup lang="ts">
import FabricCanvas from "@/components/FabricCanvas.vue";
import useKeydownListener from "@/composables/useKeydownListener";
import useCanvasStore from "@/stores/useCanvasStore";
import useLocalStorageCanvas from "@/stores/useLocalStorageCanvas";
import useUIStore from "@/stores/useUIStore";
import type { CustomITextI } from "@/types/fabric.types";
import deleteActiveCanvasObjWithBackspace from "@/utils/fabricUtils/deleteActiveCanvasObjWithBackspace";
import drawStrokeOnCanvas from "@/utils/fabricUtils/drawStrokeOnCanvas";
import handleAddITextToCanvas from "@/utils/fabricUtils/handleAddITextToCanvas";
import handleArrowDrawing from "@/utils/fabricUtils/handleArrowDrawing";
import handleCanvasBackgroundColor from "@/utils/fabricUtils/handleCanvasBackgroundColor";
import handleCanvasPanning from "@/utils/fabricUtils/handleCanvasPanning";
import handleLineDrawing from "@/utils/fabricUtils/handleLineDrawing";
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
const { storedCanvasSate, addCanvasStateToLocalStorage } =
  useLocalStorageCanvas();

const saveCanvasToLocalStorage = () => {
  const canvas = canvasStore.getSelectedCanvas;

  if (!canvas) {
    return;
  }

  const state = canvas.toJSON();

  addCanvasStateToLocalStorage({
    state: state,
    name: uiStore.getSelectedCanvasName,
  });
};

const { addListener, removeListener } = useKeydownListener((e) => {
  const canvas = canvasStore.getSelectedCanvas;

  if (!canvas) {
    return;
  }

  deleteActiveCanvasObjWithBackspace(e, canvas);
});

const handleDoubleClick = (e: fabric.IEvent<MouseEvent>) => {
  console.log("double click", e);

  // isTextEditing.value = true;

  if (e.target && e.target.type === "i-text") {
    const text = e.target as CustomITextI;
    text.enterEditing();
    removeListener();
    return;
  }

  const targetMiddle = {
    y: e.pointer?.y || 0,
    x: (e.pointer?.x || 0) - 100,
  };

  handleAddITextToCanvas({
    position: targetMiddle,
    text: "Double click to edit text",
    canvas: canvasStore.getSelectedCanvas,
  });
};

const handleCanvasCreated = (fabricCanvas: fabric.Canvas) => {
  const state = storedCanvasSate;

  if (state && state[uiStore.getSelectedCanvasName]) {
    const length = state[uiStore.getSelectedCanvasName].length;

    const s = state[uiStore.getSelectedCanvasName][length - 1];

    fabricCanvas.loadFromJSON(s, fabricCanvas.renderAll.bind(fabricCanvas));

    canvasStore.setSelectedCanvas({
      selectedCanvas: fabricCanvas,
    });
    return;
  }

  canvasStore.setSelectedCanvas({
    selectedCanvas: fabricCanvas,
  });
};

const handleObjSelected = (event: fabric.IEvent<MouseEvent>) => {
  console.log("selection", event);
  // TODO: Depending on selected object add or remove listener

  addListener();

  uiStore.setCanvasMode({
    canvasMode: "ObjContextMenu",
  });
};

const handleObjSelectionCleared = (event: fabric.IEvent<MouseEvent>) => {
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
      case "line":
        handleLineDrawing({
          canvas: getSelectedCanvas,
          squareModeSettings: getSquareModeSettings,
        });
        break;
      case "arrow":
        handleArrowDrawing({
          canvas: getSelectedCanvas,
          squareModeSettings: getSquareModeSettings,
        });
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
