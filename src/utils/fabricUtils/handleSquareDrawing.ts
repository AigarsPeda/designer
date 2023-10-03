import type { DefaultSquareMode } from "@/stores/types/CanvasStoreTypes";
import type { CustomRectI } from "@/types/fabric.types";
import createAllPatterns from "@/utils/fabricUtils/createAllPatterns";
import findPattern from "@/utils/fabricUtils/findPattern";
import getUniqueId from "@/utils/getUniqueId";
import { fabric } from "fabric";

type SquareDrawingArgs = {
  canvas: fabric.Canvas | null;
  squareModeSettings: DefaultSquareMode;
};

const pasterns = createAllPatterns();

let id = "";
let origX = 0;
let origY = 0;
let isDown = false;

const handleSquareDrawing = ({
  canvas,
  squareModeSettings,
}: SquareDrawingArgs) => {
  if (!canvas) {
    return;
  }

  canvas.on("mouse:down", (e) => {
    isDown = true;

    const pointer = canvas.getPointer(e.e);

    origX = pointer.x;
    origY = pointer.y;

    const rect = new fabric.Rect({
      angle: 0,
      top: origY,
      left: origX,
      evented: false,
      originY: "top",
      originX: "left",
      selectable: false,
      hasRotatingPoint: false,
      width: pointer.x - origX,
      height: pointer.y - origY,
      rx: squareModeSettings.rx,
      ry: squareModeSettings.ry,
      stroke: squareModeSettings.stroke,
      strokeWidth: squareModeSettings.strokeWidth,
      fill: findPattern({
        pasterns,
        stroke: squareModeSettings.stroke,
        background: squareModeSettings.background,
      }),
    }) as CustomRectI;

    rect.id = getUniqueId();
    id = rect.id;

    canvas.add(rect);
    canvas.renderAll();
    // canvas.setActiveObject(rect);
  });

  canvas.on("mouse:move", (o) => {
    if (!isDown || !id) return;
    const pointer = canvas.getPointer(o.e);
    const allObj = canvas.getObjects() as CustomRectI[];
    const square = allObj.find((obj) => obj.id === id);
    // const square = canvas.getActiveObject();

    if (!square) return;

    if (origX > pointer.x) {
      square.set({ left: Math.abs(pointer.x) });
    }
    if (origY > pointer.y) {
      square.set({ top: Math.abs(pointer.y) });
    }

    square.setOptions({
      width: Math.abs(origX - pointer.x),
      height: Math.abs(origY - pointer.y),
    });

    // square.setCoords();
    canvas.renderAll();
  });

  canvas.on("mouse:up", (o) => {
    isDown = false;

    const allObj = canvas.getObjects() as CustomRectI[];
    const square = allObj.find((obj) => obj.id === id);

    if (!square) {
      return;
    }

    canvas.remove(square);
    square.setOptions({
      evented: true,
      selectable: true,
      hasRotatingPoint: true,
    });

    square.setCoords();
    canvas.add(square);
    canvas.setActiveObject(square);
  });
};

export default handleSquareDrawing;
