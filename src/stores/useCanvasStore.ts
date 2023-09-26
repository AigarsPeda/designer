import { COLORS } from "@/hardcoded";
import type {
  DefaultDrawingMode,
  DefaultSquareMode,
  StateType,
} from "@/stores/types/CanvasStoreTypes";
import type { CustomObjI } from "@/types/fabric.types";
import { fabric } from "fabric";
import { defineStore } from "pinia";

const useCanvasStore = defineStore("design", {
  state: (): StateType => ({
    canvas: [],
    selectedCanvas: null,
    defaultCanvasSate: {
      drawingMode: {
        size: 4,
        thinning: 0.3,
        smoothing: 0.99,
        streamline: 0.99,
        stroke: COLORS[0],
      },
      squareModeSettings: {
        background: "",
        strokeWidth: 2,
        stroke: COLORS[0],
        rx: 10,
        ry: 10,
        backgroundPattern: "none",
      },
    },
    selectedObjectIds: [],
  }),

  getters: {
    getDrawingMode(): DefaultDrawingMode {
      return this.defaultCanvasSate.drawingMode;
    },
    getCanvasLength({ canvas }: StateType) {
      return canvas.length;
    },
    getCanvasIds({ canvas }: StateType) {
      return canvas.map(({ id }) => id);
    },
    getSelectedObjectIds({ selectedObjectIds }: StateType) {
      return selectedObjectIds;
    },
    getSelectedCanvas({ selectedCanvas }: StateType) {
      return selectedCanvas;
    },
    getSquareModeSettings({ defaultCanvasSate }: StateType) {
      return defaultCanvasSate.squareModeSettings;
    },
    getSelectedObjInCanvas({ selectedCanvas, selectedObjectIds }: StateType) {
      const canvasObj = selectedCanvas?.getObjects() as CustomObjI[];

      return canvasObj.filter((obj) => {
        return selectedObjectIds.includes(obj.id);
      });
    },
  },
  actions: {
    setCanvas({ id, canva }: { id: string; canva: fabric.Canvas }) {
      this.canvas.push({ id, canva });
    },
    setDrawingMode({ drawingMode }: { drawingMode: DefaultDrawingMode }) {
      this.defaultCanvasSate.drawingMode = drawingMode;
    },
    setSelectedObjectIds({
      selectedObjectIds,
    }: {
      selectedObjectIds: string[];
    }) {
      this.selectedObjectIds = selectedObjectIds;
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
  },
});

export default useCanvasStore;
