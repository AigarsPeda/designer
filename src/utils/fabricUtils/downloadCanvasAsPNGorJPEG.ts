import { SAFETY_MARGIN_FOR_CANVAS } from "@/hardcoded";
import { fabric } from "fabric";

type DownloadCanvasAsPNGorJPEGArgs = {
  selectedCanvasName: string;
  canvas: fabric.Canvas | null;
  fileExtension: "png" | "jpeg";
};

const downloadCanvasAsPNGorJPEG = ({
  canvas,
  fileExtension,
  selectedCanvasName,
}: DownloadCanvasAsPNGorJPEGArgs) => {
  if (!canvas) {
    return;
  }

  const json = canvas.toJSON();
  const objects = canvas.getObjects();

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

    const dataURL = tempCanvas.toDataURL({
      quality: 1,
      format: fileExtension,
    });

    // Create an anchor element to trigger the download
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = `${selectedCanvasName}.${fileExtension}`;

    // Trigger a click event on the anchor element to initiate the download
    a.click();

    // remove the anchor element from the DOM
    a.remove();
  });
};

export default downloadCanvasAsPNGorJPEG;
