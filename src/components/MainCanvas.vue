<template>
  <div class="design-canvas-container" ref="elRef">
    <FabricCanvas
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
import handleAddITextToCanvas from "@/utils/fabricUtils/handleAddITextToCanvas";
import handleCanvasPanning from "@/utils/fabricUtils/handleCanvasPanning";
import handleHandDrawing from "@/utils/fabricUtils/handleHandDrawing";
import handleLineDrawing from "@/utils/fabricUtils/handleLineDrawing";
import handleSquareDrawing from "@/utils/fabricUtils/handleSquareDrawing";
import isCanvasObjSelectable from "@/utils/fabricUtils/isCanvasObjSelectable";
import loadCanvasFromJson from "@/utils/fabricUtils/loadCanvasFromJson";
import makeAllObjCanvasSelectable from "@/utils/fabricUtils/makeAllObjCanvasSelectable";
import makeAllObjCanvasUnselectable from "@/utils/fabricUtils/makeAllObjCanvasUnselectable";
import resetCanvasMouseMoveUpDown from "@/utils/fabricUtils/resetCanvasMouseMoveUpDown";
import { fabric } from "fabric";
import { onMounted, ref, watch } from "vue";

const uiStore = useUIStore();
const isCanvasLoaded = ref(false);
const canvasStore = useCanvasStore();
const elRef = ref<HTMLDivElement | null>(null);
const { storedSelectedCanvasName, addCanvasStateToLocalStorage } =
  useLocalStorageCanvas();

const saveCanvasToLocalStorage = () => {
  const canvas = canvasStore.getSelectedCanvas;

  if (!canvas || !isCanvasLoaded.value) {
    return;
  }

  const state = canvas.toDatalessJSON();

  console.log("state saved --->", state);

  addCanvasStateToLocalStorage({
    state: state,
    name: storedSelectedCanvasName.storedValue,
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
  canvasStore.setSelectedCanvas({
    selectedCanvas: fabricCanvas,
  });
};

const handleObjSelected = (event: fabric.IEvent<MouseEvent>) => {
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

onMounted(async () => {
  isCanvasLoaded.value = false;
  const isFinished = await loadCanvasFromJson(
    canvasStore.getSelectedCanvas,
    storedSelectedCanvasName.storedValue
  );
  isCanvasLoaded.value = isFinished;
});

watch(
  () => {
    return {
      canvasName: storedSelectedCanvasName.storedValue,
    };
  },
  async (newSate) => {
    const { canvasName } = newSate;

    isCanvasLoaded.value = false;
    const isFinished = await loadCanvasFromJson(
      canvasStore.getSelectedCanvas,
      canvasName
    );
    isCanvasLoaded.value = isFinished;
  }
);

watch(
  () => {
    return {
      canvasMode: uiStore.getCanvasMode,
      canvas: canvasStore.getSelectedCanvas,
      squareSettings: canvasStore.getSquareSettings,
      drawingSettings: canvasStore.getDrawingSettings,
    };
  },
  (newSate) => {
    const { canvasMode, canvas, drawingSettings, squareSettings } = newSate;

    if (!canvas) {
      return;
    }

    resetCanvasMouseMoveUpDown(canvas);

    if (isCanvasObjSelectable(canvasMode)) {
      makeAllObjCanvasUnselectable(canvas);
    }

    if (!isCanvasObjSelectable(canvasMode)) {
      makeAllObjCanvasSelectable(canvas);
    }

    if (uiStore.getCanvasMode === "panning") {
      canvas.defaultCursor = "grab";
    }

    if (uiStore.getCanvasMode !== "panning") {
      canvas.defaultCursor = "default";
    }

    switch (uiStore.getCanvasMode) {
      case "drawing":
        // drawStrokeOnCanvas({
        //   canvas: canvas,
        //   drawingSettings,
        //   callback: saveCanvasToLocalStorage,
        // });
        handleHandDrawing({
          kind: "drawing",
          canvas: canvas,
          squareSettings,
          drawingSettings,
          callbackForEvents: saveCanvasToLocalStorage,
        });
        break;
      case "panning":
        handleCanvasPanning({ canvas: canvas });
        break;
      case "square":
        handleSquareDrawing({
          canvas: canvas,
          squareSettings,
        });
        break;
      case "line":
        handleLineDrawing({
          canvas: canvas,
          squareSettings,
        });
        break;
      case "arrow":
        handleHandDrawing({
          kind: "arrow",
          canvas: canvas,
          squareSettings,
          drawingSettings,
          callbackForEvents: saveCanvasToLocalStorage,
        });
        break;

      default:
        resetCanvasMouseMoveUpDown(canvas);
        break;
    }
  }
);
</script>

<style scoped>
.design-canvas-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
}
</style>
@/utils/fabricUtils/handleHandDrawing
