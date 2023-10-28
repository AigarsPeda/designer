import type { CustomObjI } from "@/types/fabric.types";
import { fabric } from "fabric";

const findCanvasObjById = (objectId: string, canvas: fabric.Canvas) => {
  const canvasObjects = canvas.getObjects() as CustomObjI[];
  return canvasObjects.find((o) => o?.id === objectId);
};

export default findCanvasObjById;
