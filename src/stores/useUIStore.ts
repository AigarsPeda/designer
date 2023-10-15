import type {
  CanvaModeType,
  UiStoreStateType,
} from "@/stores/types/UiStoreTypes";
import { defineStore } from "pinia";

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
      this.canvasMode = canvasMode;
    },
  },
});

export default useUIStore;
