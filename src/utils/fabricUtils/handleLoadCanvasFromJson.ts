import { fabric } from "fabric";

type HandleLoadCanvasFromJsonArgs = {
  state: CanvasState;
  canvas: fabric.Canvas | null;
};

const handleLoadCanvasFromJson = ({
  state,
  canvas,
}: HandleLoadCanvasFromJsonArgs) => {
  canvas?.loadFromJSON(state, canvas.renderAll.bind(canvas));
};

export default handleLoadCanvasFromJson;
