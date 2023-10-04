import { fabric } from "fabric";

const handleDeleteSelectedCanvasObj = (canvas: fabric.Canvas | null) => {
  const selectedObj = canvas?.getActiveObjects();

  if (!selectedObj) {
    return;
  }

  for (let i = 0; i < selectedObj.length; i++) {
    canvas?.remove(selectedObj[i]);
  }

  canvas?.discardActiveObject();
  canvas?.renderAll();
};

export default handleDeleteSelectedCanvasObj;
