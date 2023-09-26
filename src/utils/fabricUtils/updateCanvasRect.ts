import { fabric } from "fabric";
import type { DefaultSquareMode } from "@/stores/types/CanvasStoreTypes";

type UpdateCanvasRectArgs = {
  rect: fabric.Rect;
  pattern: fabric.Pattern;
  squareSettings: DefaultSquareMode;
};

const updateCanvasRect = ({
  rect,
  pattern,
  squareSettings,
}: UpdateCanvasRectArgs) => {
  rect.set({
    rx: squareSettings.rx,
    ry: squareSettings.ry,
    stroke: squareSettings.stroke,
    strokeWidth: squareSettings.strokeWidth,
    fill:
      squareSettings.backgroundPattern === "none"
        ? squareSettings.background
        : pattern,
  });

  return rect;
};

export default updateCanvasRect;
