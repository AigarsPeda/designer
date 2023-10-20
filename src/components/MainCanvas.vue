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
import drawStrokeOnCanvas from "@/utils/fabricUtils/drawStrokeOnCanvas";
import handleAddITextToCanvas from "@/utils/fabricUtils/handleAddITextToCanvas";
import handleArrowDrawing from "@/utils/fabricUtils/handleArrowDrawing";
import handleCanvasPanning from "@/utils/fabricUtils/handleCanvasPanning";
import handleLineDrawing from "@/utils/fabricUtils/handleLineDrawing";
import handleSquareDrawing from "@/utils/fabricUtils/handleSquareDrawing";
import isCanvasObjSelectable from "@/utils/fabricUtils/isCanvasObjSelectable";
import makeAllObjCanvasSelectable from "@/utils/fabricUtils/makeAllObjCanvasSelectable";
import makeAllObjCanvasUnselectable from "@/utils/fabricUtils/makeAllObjCanvasUnselectable";
import resetCanvasMouseMoveUpDown from "@/utils/fabricUtils/resetCanvasMouseMoveUpDown";
import scalingObjAndPreservingCorners from "@/utils/fabricUtils/scalingObjAndPreservingCorners";
import getStoredCanvasStateByName from "@/utils/getStoredCanvasStateByName";
import { fabric } from "fabric";
import { ref, watch } from "vue";

const uiStore = useUIStore();
const isLoadingCanvas = ref(false);
const canvasStore = useCanvasStore();
const elRef = ref<HTMLDivElement | null>(null);
const {
  storedCanvasMetaData,
  storedSelectedCanvasName,
  addCanvasStateToLocalStorage,
} = useLocalStorageCanvas();

const saveCanvasToLocalStorage = () => {
  const canvas = canvasStore.getSelectedCanvas;

  if (!canvas || isLoadingCanvas.value) {
    return;
  }

  const state = canvas.toDatalessJSON();

  console.log("state", state);

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

watch(
  () => {
    return {
      canvas: canvasStore.getSelectedCanvas,
      getSelectedCanvasName: storedSelectedCanvasName.storedValue,
    };
  },
  (newSate) => {
    const { canvas, getSelectedCanvasName } = newSate;
    const state = getStoredCanvasStateByName(getSelectedCanvasName);

    if (!canvas) {
      return;
    }

    isLoadingCanvas.value = true;

    if (state) {
      canvas.loadFromJSON(state, canvas.renderAll.bind(canvas));
      // canvas.loadFromJSON(
      //   state,
      //   canvas.renderAll.bind(canvas),
      //   (o: fabric.Object, obj: fabric.Object) => {
      //     // canvas.remove(obj);
      //     // console.log("obj", obj);
      //     // // canvas.remove(obj);
      //     // obj.setCoords();
      //     obj.on("scaling", (event) => scalingObjAndPreservingCorners(event));
      //     // canvas.add(obj);

      //     // canvas.sendToBack(o[0]);
      //   }
      // );

      canvas.forEachObject((obj) => {
        canvas.remove(obj);

        obj.setCoords();
        obj.on("scaling", (event) => scalingObjAndPreservingCorners(event));

        canvas.add(obj);
      });
    }

    canvas.renderAll();
    isLoadingCanvas.value = false;
  }
);

watch(
  () => {
    return {
      getCanvasMode: uiStore.getCanvasMode,
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
      getSquareModeSettings,
    } = newSate;

    if (!getSelectedCanvas) {
      return;
    }

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
          callback: saveCanvasToLocalStorage,
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
