import type {
  DefaultDrawingMode,
  StateType,
} from "@/stores/types/CanvasStoreTypes";
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
        stroke: "#60a5fa",
      },
    },
    selectedObjectIds: [],
  }),

  getters: {
    getDrawingMode(): DefaultDrawingMode {
      return this.defaultCanvasSate.drawingMode;
    },
    getCanvasLength({ canvas }: StateType): number {
      return canvas.length;
    },
    getCanvasIds({ canvas }: StateType): string[] {
      return canvas.map(({ id }) => id);
    },
    getSelectedObjectIds({ selectedObjectIds }: StateType): string[] {
      return selectedObjectIds;
    },
    getSelectedCanvas({ selectedCanvas }: StateType): fabric.Canvas | null {
      return selectedCanvas;
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
  },
});

export default useCanvasStore;
