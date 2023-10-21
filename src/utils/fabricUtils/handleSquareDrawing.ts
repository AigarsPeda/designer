import type { DefaultSquareMode } from "@/stores/types/CanvasStoreTypes";
import type { CustomRectI } from "@/types/fabric.types";
import scalingObjAndPreservingCorners from "@/utils/fabricUtils/scalingObjAndPreservingCorners";
import getUniqueId from "@/utils/getUniqueId";
import { fabric } from "fabric";

type SquareDrawingArgs = {
  canvas: fabric.Canvas | null;
  squareModeSettings: DefaultSquareMode;
};

let id = "";
let origX = 0;
let origY = 0;
let isDown = false;

// const debouncedScalingHandler = debounce(scalingObjAndPreservingCorners, 50);

const handleSquareDrawing = ({
  canvas,
  squareModeSettings,
}: SquareDrawingArgs) => {
  if (!canvas) {
    return;
  }

  canvas.on("mouse:down", (e) => {
    isDown = true;
    id = getUniqueId();

    const pointer = canvas.getPointer(e.e);

    origX = pointer.x;
    origY = pointer.y;

    const rect = new fabric.Rect({
      angle: 0,
      top: origY,
      left: origX,
      cornerSize: 6,
      evented: false,
      originY: "top",
      originX: "left",
      selectable: false,
      noScaleCache: false, // for scaling preserving corners
      hasRotatingPoint: false,
      width: pointer.x - origX,
      height: pointer.y - origY,
      rx: squareModeSettings.rx,
      ry: squareModeSettings.ry,
      stroke: squareModeSettings.stroke,
      strokeWidth: squareModeSettings.strokeWidth,
      fill: squareModeSettings.background,
    }) as CustomRectI;

    // Adding additional properties to the object
    rect.id = id;
    // rect.myStroke = squareModeSettings.stroke;
    // rect.myFill = squareModeSettings.background;
    // rect.isBackgroundPattern = squareModeSettings.backgroundPattern !== "none";

    // When scaling, preserving corners
    // rect.on("scaling", (event) => scalingObjAndPreservingCorners(event));

    canvas.add(rect).renderAll();
  });

  canvas.on("mouse:move", (o) => {
    if (!isDown || !id) return;
    const pointer = canvas.getPointer(o.e);
    const allObj = canvas.getObjects() as CustomRectI[];
    const square = allObj.find((obj) => obj.id === id);

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

    canvas.renderAll();
  });

  canvas.on("mouse:up", () => {
    const allObj = canvas.getObjects() as CustomRectI[];
    const square = allObj.find((obj) => obj.id === id);

    if (!square) {
      return;
    }

    id = "";
    isDown = false;

    canvas.remove(square);
    square.setOptions({
      evented: true,
      selectable: true,
      hasRotatingPoint: true,
    });

    square.setCoords();
    canvas.add(square);
    canvas.setActiveObject(square);
    canvas.renderAll();
  });
};

export default handleSquareDrawing;
