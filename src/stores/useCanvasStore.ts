import { COLORS, TRANSPARENT_COLOR } from "@/hardcoded";
import type {
  DefaultSquareMode,
  DrawingSettingsType,
  StateType,
} from "@/stores/types/CanvasStoreTypes";
import type { CustomObjI } from "@/types/fabric.types";
import { fabric } from "fabric";
import { defineStore } from "pinia";

const useCanvasStore = defineStore("design", {
  state: (): StateType => ({
    canvas: [],
    selectedCanvas: null,
    isTextToObject: false,
    defaultCanvasSate: {
      drawingSettings: {
        size: 6,
        thinning: 0.3,
        smoothing: 0.99,
        streamline: 0.99,
        stroke: COLORS[0],
      },
      squareModeSettings: {
        rx: 10,
        ry: 10,
        strokeWidth: 2,
        stroke: COLORS[0],
        backgroundPattern: "none",
        background: TRANSPARENT_COLOR,
      },
    },
    selectedObjects: [],
  }),

  getters: {
    getDrawingSettings(): DrawingSettingsType {
      return this.defaultCanvasSate.drawingSettings;
    },
    getCanvasLength({ canvas }: StateType) {
      return canvas.length;
    },
    getCanvasIds({ canvas }: StateType) {
      return canvas.map(({ id }) => id);
    },
    getSelectedObject({ selectedObjects }: StateType) {
      return selectedObjects;
    },
    getSelectedCanvas({ selectedCanvas }: StateType) {
      return selectedCanvas;
    },
    getSquareModeSettings({ defaultCanvasSate }: StateType) {
      return defaultCanvasSate.squareModeSettings;
    },
    // getSelectedObjInCanvas({ selectedCanvas, selectedObjectIds }: StateType) {
    //   const canvasObj = selectedCanvas?.getObjects() as CustomObjI[];

    //   return canvasObj.filter((obj) => {
    //     return selectedObjectIds.includes(obj.id);
    //   });
    // },
    getIsTextToObject({ isTextToObject }: StateType) {
      return isTextToObject;
    },
  },
  actions: {
    setCanvas({ id, canva }: { id: string; canva: fabric.Canvas }) {
      this.canvas.push({ id, canva });
    },
    setDrawingSettings({
      drawingSettings,
    }: {
      drawingSettings: DrawingSettingsType;
    }) {
      this.defaultCanvasSate.drawingSettings = drawingSettings;
    },
    setSelectedObjects({ selectedObjects }: { selectedObjects: CustomObjI[] }) {
      this.selectedObjects = selectedObjects;
    },
    setSelectedCanvas({ selectedCanvas }: { selectedCanvas: fabric.Canvas }) {
      this.selectedCanvas = selectedCanvas;
    },
    setSquareModeSettings({
      squareModeSettings,
    }: {
      squareModeSettings: DefaultSquareMode;
    }) {
      this.defaultCanvasSate.squareModeSettings = squareModeSettings;
    },
    setIsTextToObject({ isTextToObject }: { isTextToObject: boolean }) {
      this.isTextToObject = isTextToObject;
    },
  },
});

export default useCanvasStore;
