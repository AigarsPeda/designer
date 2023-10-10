import type { CustomObjI, CustomPathI } from "@/types/fabric.types";
import getSvgPathFromStroke from "@/utils/getSvgPathFromStroke";
import getUniqueId from "@/utils/getUniqueId";
import { fabric } from "fabric";
import getStroke from "perfect-freehand";
import makeAllObjCanvasUnselectable from "./makeAllObjCanvasUnselectable";

type DrawStrokeOnCanvasArgs = {
  canvas: fabric.Canvas | null;
  drawingSettings: {
    size: number;
    stroke: string;
    thinning: number;
    smoothing: number;
    streamline: number;
  };
};

let objId = "";
let isMouseDown = false;
let position: number[][] = [[0, 0]];

const drawStrokeOnCanvas = ({
  canvas,
  drawingSettings,
}: DrawStrokeOnCanvasArgs) => {
  if (!canvas) {
    console.error("drawStrokeOnCanvas: canvas is null");
    return;
  }

  canvas.on("mouse:down", (e) => {
    isMouseDown = true;
    objId = getUniqueId();

    const pointer = canvas.getPointer(e.e);
    position = [[pointer.x, pointer.y]];
  });

  canvas.on("mouse:move", (e) => {
    if (!isMouseDown) return;

    canvas.discardActiveObject();

    const pointer = canvas.getPointer(e.e);
    position.push([pointer.x, pointer.y]);

    const outlinePoints = getStroke(position, {
      size: drawingSettings.size,
      thinning: drawingSettings.thinning,
      smoothing: drawingSettings.smoothing,
      streamline: drawingSettings.streamline,
      easing(t) {
        // Cubic equation for linear easing
        t = Math.max(0, Math.min(1, t));
        return t * t * (3 - 2 * t);
      },
    });

    const pathData = getSvgPathFromStroke(outlinePoints);
    const activeObjects = canvas.getObjects() as CustomObjI[];
    const obj = activeObjects.filter((o) => o?.id === objId);

    if (obj.length > 0) {
      for (let i = 0; i < obj.length; i++) {
        canvas.remove(obj[i]);
      }
    }

    const path = new fabric.Path(pathData, {
      scaleX: 1,
      scaleY: 1,
      cornerSize: 6,
      evented: false,
      selectable: false,
      hasRotatingPoint: false,
      // fill: drawingSettings.stroke,
      fill: drawingSettings.stroke,
    }) as CustomPathI;

    path.id = objId;

    canvas.add(path);
  });

  canvas.on("mouse:up", (e) => {
    if (!isMouseDown) return;

    const obj = canvas.getObjects() as CustomObjI[];
    const objToSelect = obj.filter((o) => o?.id === objId);

    for (let i = 0; i < objToSelect.length; i++) {
      const element = objToSelect[i];

      canvas.remove(element);

      element.setCoords();
      canvas.add(element);
    }

    objId = "";
    isMouseDown = false;
    // makeAllObjCanvasUnselectable(canvas);
  });
};

export default drawStrokeOnCanvas;
