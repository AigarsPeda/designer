import { fabric } from "fabric";

const deleteActiveCanvasObjWithBackspace = (
  e: KeyboardEvent,
  canvas: fabric.Canvas
) => {
  if (e.key === "Backspace") {
    const activeObj = canvas.getActiveObject();

    if (!activeObj) {
      return;
    }

    canvas.remove(activeObj);
  }
};

export default deleteActiveCanvasObjWithBackspace;
