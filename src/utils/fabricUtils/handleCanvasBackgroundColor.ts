import { fabric } from "fabric";
import dots from "../../assets/svg/dots.svg";
import canvasBgCallback from "@/utils/svgUtils/canvasBgCallback";

type HandleCanvasBackgroundColorArgs = {
  canvas: fabric.Canvas | null;
  backgroundColorType: "pattern" | "transparent";
};

const pattern = new fabric.Pattern({
  source: dots,
  repeat: "repeat",
});

const handleCanvasBackgroundColor = ({
  canvas,
  backgroundColorType,
}: HandleCanvasBackgroundColorArgs) => {
  if (!canvas) {
    return;
  }

  if (backgroundColorType === "pattern") {
    // canvas.backgroundColor = "rgba(209, 213, 219, 1.0)";

    canvas.setBackgroundColor(pattern, () => {
      canvasBgCallback(canvas, 0);
    });
  }

  if (backgroundColorType === "transparent") {
    canvas.backgroundColor = "transparent";
  }

  // Fire object:modified event to trigger canvas state update and saving it to local storage
  canvas.fire("object:modified");
  // canvas.renderAll();
};

export default handleCanvasBackgroundColor;
