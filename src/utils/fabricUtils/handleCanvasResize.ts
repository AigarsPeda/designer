import { fabric } from "fabric";

type HandleCanvasResizeArgs = {
  canvas: fabric.Canvas | null;
  containerRef: HTMLDivElement | null;
};

const handleCanvasResize = ({
  canvas,
  containerRef,
}: HandleCanvasResizeArgs) => {
  const containerWidth = containerRef?.offsetWidth || 500;
  const containerHeight = containerRef?.offsetHeight || 500;

  canvas?.setDimensions({
    width: containerWidth,
    height: containerHeight,
  });

  canvas?.renderAll();
};

export default handleCanvasResize;
