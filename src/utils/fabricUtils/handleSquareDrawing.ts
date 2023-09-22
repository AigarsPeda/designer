import type { DefaultSquareMode } from "@/stores/types/CanvasStoreTypes";
import type { CustomRectI } from "@/types/fabric.types";
import getUniqueId from "@/utils/getUniqueId";
import { fabric } from "fabric";

type SquareDrawingArgs = {
  endAction: () => void;
  canvas: fabric.Canvas | null;
  squareModeSettings: DefaultSquareMode;
};

let id = "";
let origX = 0;
let origY = 0;
let isDown = false;

const handleSquareDrawing = ({
  canvas,
  endAction,
  squareModeSettings,
}: SquareDrawingArgs) => {
  if (!canvas) {
    return;
  }

  canvas?.off("mouse:up");
  canvas?.off("mouse:move");
  canvas?.off("mouse:down");

  if (id) {
    const canvasObj = canvas.getObjects() as CustomRectI[];
    const myRect = canvasObj.find((obj) => obj.id === id);

    if (!myRect) return;

    myRect.set({
      stroke: squareModeSettings.stroke,
      fill: squareModeSettings.background,
      strokeWidth: squareModeSettings.strokeWidth,
    });

    canvas.renderAll();
  }

  canvas.on("mouse:down", (e) => {
    if (id !== "") {
      id = "";

      endAction();
      return;
    }

    isDown = true;

    const pointer = canvas.getPointer(e.e);

    origX = pointer.x;
    origY = pointer.y;

    const rect = new fabric.Rect({
      angle: 0,
      top: origY,
      left: origX,
      evented: true,
      originY: "top",
      originX: "left",
      selectable: true,
      hasRotatingPoint: true,
      width: pointer.x - origX,
      height: pointer.y - origY,
      stroke: squareModeSettings.stroke,
      fill: squareModeSettings.background,
      strokeWidth: squareModeSettings.strokeWidth,
    }) as CustomRectI;

    rect.id = getUniqueId();
    id = rect.id;

    canvas.add(rect);
  });

  canvas.on("mouse:move", (o) => {
    if (!isDown || !id) return;
    const pointer = canvas.getPointer(o.e);
    const canvasObj = canvas.getObjects() as CustomRectI[];
    const myRect = canvasObj.find((obj) => obj.id === id);

    if (!myRect) return;

    if (origX > pointer.x) {
      myRect.set({ left: Math.abs(pointer.x) });
    }
    if (origY > pointer.y) {
      myRect.set({ top: Math.abs(pointer.y) });
    }

    myRect.setOptions({
      width: Math.abs(origX - pointer.x),
      height: Math.abs(origY - pointer.y),
    });

    canvas.renderAll();
  });

  canvas.on("mouse:up", (o) => {
    const canvasObj = canvas.getObjects() as CustomRectI[];
    const myRect = canvasObj.find((obj) => obj.id === id);

    if (!myRect) return;

    isDown = false;
  });
};

export default handleSquareDrawing;
