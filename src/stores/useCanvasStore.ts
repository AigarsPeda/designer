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
    defaultCanvasSate: {
      drawingSettings: {
        size: 6,
        thinning: 0.3,
        smoothing: 0.99,
        streamline: 0.99,
        // stroke: COLORS[0],
      },
      squareSettings: {
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
    getSquareSettings({ defaultCanvasSate }: StateType) {
      return defaultCanvasSate.squareSettings;
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
    setSquareSettings({
      squareSettings,
    }: {
      squareSettings: DefaultSquareMode;
    }) {
      this.defaultCanvasSate.squareSettings = squareSettings;
    },
  },
});

export default useCanvasStore;
