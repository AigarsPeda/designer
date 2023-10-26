import { fabric } from "fabric";
import { SAFETY_MARGIN_FOR_CANVAS } from "@/hardcoded";

type DownloadCanvasAsSVGArgs = {
  // width: number;
  // height: number;
  selectedCanvasName: string;
  canvas: fabric.Canvas | null;
};

const downloadCanvasAsSvg = ({
  canvas,
  // width,
  // height,
  selectedCanvasName,
}: DownloadCanvasAsSVGArgs) => {
  if (!canvas) {
    return;
  }

  const objects = canvas.getObjects();
  const json = canvas.toJSON();

  const boundingBox = new fabric.Group(objects).getBoundingRect();

  const newWidth = boundingBox.width + SAFETY_MARGIN_FOR_CANVAS;
  const newHeight = boundingBox.height + SAFETY_MARGIN_FOR_CANVAS;

  const tempCanvas = new fabric.Canvas(null, {
    width: newWidth,
    height: newHeight,
  });
  tempCanvas.loadFromJSON(json, () => {
    tempCanvas.absolutePan({
      y: boundingBox.top - SAFETY_MARGIN_FOR_CANVAS / 2,
      x: boundingBox.left - SAFETY_MARGIN_FOR_CANVAS / 2,
    });

    const svg = tempCanvas.toSVG({
      width: newWidth,
      height: newHeight,
    });

    const encodedSvg = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

    // Create an anchor element to trigger the download
    const a = document.createElement("a");
    a.href = encodedSvg;
    a.download = `${selectedCanvasName}.svg`;

    a.click();
    a.remove();
  });
};

export default downloadCanvasAsSvg;
