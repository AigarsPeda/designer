import { fabric } from "fabric";

const svgContent = `<svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white" />
  <circle cx="2.5" cy="2.5" r="0.5" fill="blue" />
</svg>`;

const pattern = new fabric.Pattern({
  source: `data:image/svg+xml,${encodeURIComponent(svgContent)}`,
  repeat: "repeat",
});

type HandleCanvasBackgroundColorArgs = {
  canvas: fabric.Canvas | null;
  backgroundColorType: "pattern" | "transparent";
};

const handleCanvasBackgroundColor = async ({
  canvas,
  backgroundColorType,
}: HandleCanvasBackgroundColorArgs) => {
  if (!canvas) {
    return;
  }

  if (backgroundColorType === "pattern") {
    // canvas.backgroundColor = "rgba(209, 213, 219, 1.0)";
    canvas.backgroundColor = pattern;
  }

  if (backgroundColorType === "transparent") {
    canvas.backgroundColor = "transparent";
  }

  // Fire object:modified event to trigger canvas state update and saving it to local storage
  canvas.fire("object:modified");
};

export default handleCanvasBackgroundColor;
