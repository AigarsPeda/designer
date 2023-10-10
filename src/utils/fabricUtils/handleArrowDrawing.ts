import type { DefaultSquareMode } from "@/stores/types/CanvasStoreTypes";
import type {
  CustomLineI,
  CustomObjI,
  CustomPolylineI,
} from "@/types/fabric.types";
import getUniqueId from "@/utils/getUniqueId";
import { fabric } from "fabric";

type HandleArrowDrawingArgs = {
  canvas: fabric.Canvas | null;
  squareModeSettings: DefaultSquareMode;
};

let id = "";
let tox = 0;
let toy = 0;
let fromX = 0;
let fromY = 0;
let isDown = false;

const headLength = 5; // arrow head size

const handleArrowDrawing = ({
  canvas,
  squareModeSettings,
}: HandleArrowDrawingArgs) => {
  if (!canvas) {
    return;
  }

  canvas.on("mouse:down", (o) => {
    isDown = true;
    id = getUniqueId();

    const pointer = canvas.getPointer(o.e);
    const points = [pointer.x, pointer.y, pointer.x, pointer.y];

    fromX = pointer.x;
    fromY = pointer.y;

    const line = new fabric.Line(points, {
      cornerSize: 6,
      strokeWidth: 3,
      originX: "center",
      originY: "center",
      cornerStyle: "circle",
      // fill: squareModeSettings.stroke,
      fill: squareModeSettings.stroke,
      // stroke: squareModeSettings.stroke,
      stroke: squareModeSettings.stroke,
      evented: false,
      selectable: false,
      hasControls: false,
      hasRotatingPoint: false,
    }) as CustomLineI;

    line.id = id;

    canvas.add(line);
  });

  canvas.on("mouse:move", (o) => {
    if (!isDown) return;

    const pointer = canvas.getPointer(o.e);
    const obj = canvas.getObjects() as CustomLineI[];
    const objToSelect = obj.filter((o) => o?.id === id);

    for (let i = 0; i < objToSelect.length; i++) {
      const element = objToSelect[i];

      element?.setOptions({ x2: pointer.x, y2: pointer.y });
    }

    canvas.renderAll();
  });

  canvas.on("mouse:up", (event) => {
    if (!isDown) return;
    isDown = false;

    const pointer = canvas.getPointer(event.e);

    tox = pointer.x;
    toy = pointer.y;

    if (fromX === tox && fromY === toy) {
      return;
    }

    const angle = Math.atan2(toy - fromY, tox - fromX);

    // bring the line end back some to account for arrow head.
    tox = tox - headLength * Math.cos(angle);
    toy = toy - headLength * Math.sin(angle);

    // calculate the points.
    const points = [
      {
        x: fromX, // start point
        y: fromY,
      },
      {
        x: fromX - (headLength / 4) * Math.cos(angle - Math.PI / 2),
        y: fromY - (headLength / 4) * Math.sin(angle - Math.PI / 2),
      },
      {
        x: tox - (headLength / 4) * Math.cos(angle - Math.PI / 2),
        y: toy - (headLength / 4) * Math.sin(angle - Math.PI / 2),
      },
      {
        x: tox - headLength * Math.cos(angle - Math.PI / 2),
        y: toy - headLength * Math.sin(angle - Math.PI / 2),
      },
      {
        x: tox + headLength * 2 * Math.cos(angle), // tip
        y: toy + headLength * 2 * Math.sin(angle),
      },
      {
        x: tox - headLength * Math.cos(angle + Math.PI / 2),
        y: toy - headLength * Math.sin(angle + Math.PI / 2),
      },
      {
        x: tox - (headLength / 4) * Math.cos(angle + Math.PI / 2),
        y: toy - (headLength / 4) * Math.sin(angle + Math.PI / 2),
      },
      {
        x: fromX - (headLength / 4) * Math.cos(angle + Math.PI / 2),
        y: fromY - (headLength / 4) * Math.sin(angle + Math.PI / 2),
      },
      {
        x: fromX,
        y: fromY,
      },
    ];

    const arrow = new fabric.Polyline(points, {
      opacity: 1,
      cornerSize: 6,
      evented: true,
      selectable: true,
      hasControls: true,
      objectCaching: false,
      hasRotatingPoint: true,
      // fill: squareModeSettings.stroke, //'white',
      fill: squareModeSettings.stroke,
      // stroke: squareModeSettings.stroke, //'black',
    }) as CustomPolylineI;

    const arrowId = getUniqueId();
    arrow.id = arrowId;

    canvas.add(arrow);

    canvas.forEachObject((o) => {
      const obj = o as CustomObjI;

      // Remove the line after drawing the arrow
      if (obj.id === id) {
        canvas.remove(obj);
      }

      // By doing this we can select the arrow after drawing it
      // There must be a better way to do this
      if (obj.id === arrowId) {
        canvas.remove(obj);
        obj.setCoords();
        canvas.add(obj);
        canvas.setActiveObject(obj);
      }
    });

    canvas.renderAll();
  });
};

export default handleArrowDrawing;
