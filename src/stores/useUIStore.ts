import type {
  CanvaModeType,
  UiStoreStateType,
} from "@/stores/types/UiStoreTypes";
import { defineStore } from "pinia";
import useCanvasStore from "./useCanvasStore";

const useUIStore = defineStore("uiStore", {
  state: (): UiStoreStateType => ({
    offsetWidthInVW: 0,
    canvasMode: "mainMenu",
    isDotBackground: false,
  }),

  getters: {
    getCanvasMode({ canvasMode }: UiStoreStateType): CanvaModeType {
      return canvasMode;
    },
    getOffSetWidthInVW({ offsetWidthInVW }: UiStoreStateType): number {
      return offsetWidthInVW;
    },

    getIsDotBackground({ isDotBackground }: UiStoreStateType): boolean {
      return isDotBackground;
    },
  },
  actions: {
    saveOffSet({ offsetWidthInVW }: { offsetWidthInVW: number }) {
      this.offsetWidthInVW = offsetWidthInVW;
    },
    setIsDotBackground({ isDotBackground }: { isDotBackground: boolean }) {
      this.isDotBackground = isDotBackground;
    },
    setCanvasMode({ canvasMode }: { canvasMode: CanvaModeType }) {
      // const canvasStore = useCanvasStore();
      // const canvas = canvasStore.getSelectedCanvas;

      // if (canvasMode === "panning" && canvas) {
      //   canvas.defaultCursor = "grab";
      // }

      // if (canvasMode !== "panning" && canvas) {
      //   canvas.defaultCursor = "default";
      // }

      this.canvasMode = canvasMode;
    },
  },
});

export default useUIStore;
