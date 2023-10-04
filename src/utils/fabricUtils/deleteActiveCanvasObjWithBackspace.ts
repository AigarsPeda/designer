import { fabric } from "fabric";
import handleDeleteSelectedCanvasObj from "@/utils/fabricUtils/handleDeleteSelectedCanvasObj";

const deleteActiveCanvasObjWithBackspace = (
  e: KeyboardEvent,
  canvas: fabric.Canvas
) => {
  if (e.key === "Backspace") {
    handleDeleteSelectedCanvasObj(canvas);
  }
};

export default deleteActiveCanvasObjWithBackspace;
