import type { CanvaModeType } from "@/stores/types/UiStoreTypes";

const isCanvasObjSelectable = (getCanvasMode: CanvaModeType) => {
  return (
    getCanvasMode === "drawing" ||
    getCanvasMode === "panning" ||
    getCanvasMode === "line" ||
    getCanvasMode === "arrow"
  );
};

export default isCanvasObjSelectable;
