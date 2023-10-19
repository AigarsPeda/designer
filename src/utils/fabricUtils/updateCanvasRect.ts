import { fabric } from "fabric";
import type { DefaultSquareMode } from "@/stores/types/CanvasStoreTypes";

type UpdateCanvasRectArgs = {
  rect: fabric.Rect;
  squareSettings: DefaultSquareMode;
};

const updateCanvasRect = ({ rect, squareSettings }: UpdateCanvasRectArgs) => {
  rect.setOptions({
    rx: squareSettings.rx,
    ry: squareSettings.ry,
    stroke: squareSettings.stroke,
    fill: squareSettings.background,
    strokeWidth: squareSettings.strokeWidth,
  });

  // rect.fire("modified");

  return rect;
};

export default updateCanvasRect;
