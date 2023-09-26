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
    fill: pattern,
    rx: squareSettings.rx,
    ry: squareSettings.ry,
    stroke: squareSettings.stroke,
    strokeWidth: squareSettings.strokeWidth,
  });

  return rect;
};

export default updateCanvasRect;
