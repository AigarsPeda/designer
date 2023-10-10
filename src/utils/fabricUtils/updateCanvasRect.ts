import { fabric } from "fabric";
import type { DefaultSquareMode } from "@/stores/types/CanvasStoreTypes";

type UpdateCanvasRectArgs = {
  rect: fabric.Rect;
  pattern: fabric.Pattern | string;
  squareSettings: DefaultSquareMode;
};

const updateCanvasRect = ({
  rect,
  pattern,
  squareSettings,
}: UpdateCanvasRectArgs) => {
  rect.setOptions({
    fill: pattern,
    rx: squareSettings.rx,
    ry: squareSettings.ry,
    stroke: squareSettings.stroke,
    strokeWidth: squareSettings.strokeWidth,
  });

  // rect.fire("modified");

  return rect;
};

export default updateCanvasRect;
