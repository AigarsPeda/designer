import type { CustomGroupOptionsI, CustomObjI } from "@/types/fabric.types";
import makeAllObjCanvasUnselectable from "@/utils/fabricUtils/makeAllObjCanvasUnselectable";
import resetCanvasMouseMoveUpDown from "@/utils/fabricUtils/resetCanvasMouseMoveUpDown";
import getSvgPathFromStroke from "@/utils/getSvgPathFromStroke";
import getUniqueId from "@/utils/getUniqueId";
import { fabric } from "fabric";
import getStroke from "perfect-freehand";

const DRAW_STROKE_ID = "drawnObjects";

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

let isMouseDown = false;
let position: number[][] = [[0, 0]];
let drawnObjects: CustomObjI | fabric.Group | null = null;

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
    drawnObjects = null;

    const pointer = canvas.getPointer(e.e);
    position = [[pointer.x, pointer.y]];
  });

  canvas.on("mouse:move", (e) => {
    // canvas.selection = false
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

    fabric.loadSVGFromString(
      `<svg>
         <path fill="${drawingSettings.stroke}" d="${pathData}" />
      </svg>`,
      (result) => {
        // const obj = fabric.util.groupSVGElements(result)
        const group = new fabric.Group(result, {
          id: DRAW_STROKE_ID,
          selectable: false,
          hasRotatingPoint: false,

          // selectable: false // Disable selection of the group while drawing
        } as CustomGroupOptionsI);

        drawnObjects = group;
        canvas.add(group);
      }
    );

    // canvas.selection = true
  });

  canvas.on("mouse:up", (e) => {
    if (!isMouseDown) return;

    const activeObjects = canvas.getObjects() as CustomObjI[];
    const obj = activeObjects.filter((o) => o?.id === DRAW_STROKE_ID);

    if (obj.length > 0 && drawnObjects) {
      for (let i = 0; i < obj.length; i++) {
        canvas.remove(obj[i]);
      }

      drawnObjects.setOptions({
        selectable: true,
        id: getUniqueId(),
        // bringForward: true,
        hasRotatingPoint: true,
        // hasControls: false
      });

      drawnObjects.bringForward(true);

      canvas.add(drawnObjects);
      canvas.renderAll();
    }
    makeAllObjCanvasUnselectable(canvas);
    isMouseDown = false;
  });
};

export default drawStrokeOnCanvas;
