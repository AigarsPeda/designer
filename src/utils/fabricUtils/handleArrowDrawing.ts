// import type { DefaultSquareMode } from "@/stores/types/CanvasStoreTypes";
// import type {
//   CustomLineI,
//   CustomObjI,
//   CustomPolylineI,
// } from "@/types/fabric.types";
// import getUniqueId from "@/utils/getUniqueId";
// import { fabric } from "fabric";

// type HandleArrowDrawingArgs = {
//   canvas: fabric.Canvas | null;
//   squareSettings: DefaultSquareMode;
// };

// let id = "";
// let tox = 0;
// let toy = 0;
// let fromX = 0;
// let fromY = 0;
// let isDown = false;

// const headLength = 5; // arrow head size

// const handleArrowDrawing = ({
//   canvas,
//   squareSettings,
// }: HandleArrowDrawingArgs) => {
//   if (!canvas) {
//     return;
//   }

//   canvas.on("mouse:down", (o) => {
//     isDown = true;
//     id = getUniqueId();

//     const pointer = canvas.getPointer(o.e);
//     const points = [pointer.x, pointer.y, pointer.x, pointer.y];

//     fromX = pointer.x;
//     fromY = pointer.y;

//     const line = new fabric.Line(points, {
//       cornerSize: 6,
//       strokeWidth: 3,
//       originX: "center",
//       originY: "center",
//       cornerStyle: "circle",
//       // fill: squareSettings.stroke,
//       fill: squareSettings.stroke,
//       // stroke: squareSettings.stroke,
//       stroke: squareSettings.stroke,
//       evented: false,
//       selectable: false,
//       hasControls: false,
//       hasRotatingPoint: false,
//     }) as CustomLineI;

//     line.id = id;

//     canvas.add(line);
//   });

//   canvas.on("mouse:move", (o) => {
//     if (!isDown) return;

//     const pointer = canvas.getPointer(o.e);
//     const obj = canvas.getObjects() as CustomLineI[];
//     const objToSelect = obj.filter((o) => o?.id === id);

//     for (let i = 0; i < objToSelect.length; i++) {
//       const element = objToSelect[i];

//       element?.setOptions({ x2: pointer.x, y2: pointer.y });
//     }

//     canvas.renderAll();
//   });

//   canvas.on("mouse:up", (event) => {
//     if (!isDown) return;
//     isDown = false;

//     const pointer = canvas.getPointer(event.e);

//     tox = pointer.x;
//     toy = pointer.y;

//     if (fromX === tox && fromY === toy) {
//       return;
//     }

//     const angle = Math.atan2(toy - fromY, tox - fromX);

//     // bring the line end back some to account for arrow head.
//     tox = tox - headLength * Math.cos(angle);
//     toy = toy - headLength * Math.sin(angle);

//     // calculate the points.
//     const points = [
//       {
//         x: fromX, // start point
//         y: fromY,
//       },
//       {
//         x: fromX - (headLength / 4) * Math.cos(angle - Math.PI / 2),
//         y: fromY - (headLength / 4) * Math.sin(angle - Math.PI / 2),
//       },
//       {
//         x: tox - (headLength / 4) * Math.cos(angle - Math.PI / 2),
//         y: toy - (headLength / 4) * Math.sin(angle - Math.PI / 2),
//       },
//       {
//         x: tox - headLength * Math.cos(angle - Math.PI / 2),
//         y: toy - headLength * Math.sin(angle - Math.PI / 2),
//       },
//       {
//         x: tox + headLength * 2 * Math.cos(angle), // tip
//         y: toy + headLength * 2 * Math.sin(angle),
//       },
//       {
//         x: tox - headLength * Math.cos(angle + Math.PI / 2),
//         y: toy - headLength * Math.sin(angle + Math.PI / 2),
//       },
//       {
//         x: tox - (headLength / 4) * Math.cos(angle + Math.PI / 2),
//         y: toy - (headLength / 4) * Math.sin(angle + Math.PI / 2),
//       },
//       {
//         x: fromX - (headLength / 4) * Math.cos(angle + Math.PI / 2),
//         y: fromY - (headLength / 4) * Math.sin(angle + Math.PI / 2),
//       },
//       {
//         x: fromX,
//         y: fromY,
//       },
//     ];

//     const arrow = new fabric.Polyline(points, {
//       opacity: 1,
//       cornerSize: 6,
//       evented: true,
//       selectable: true,
//       hasControls: true,
//       objectCaching: false,
//       hasRotatingPoint: true,
//       // fill: squareSettings.stroke, //'white',
//       fill: squareSettings.stroke,
//       // stroke: squareSettings.stroke, //'black',
//     }) as CustomPolylineI;

//     const arrowId = getUniqueId();
//     arrow.id = arrowId;

//     canvas.add(arrow);

//     canvas.forEachObject((o) => {
//       const obj = o as CustomObjI;

//       // Remove the line after drawing the arrow
//       if (obj.id === id) {
//         canvas.remove(obj);
//       }

//       // By doing this we can select the arrow after drawing it
//       // There must be a better way to do this
//       if (obj.id === arrowId) {
//         canvas.remove(obj);
//         obj.setCoords();
//         canvas.add(obj);
//         canvas.setActiveObject(obj);
//       }
//     });

//     canvas.renderAll();
//   });
// };

// export default handleArrowDrawing;

import type { DefaultSquareMode } from "@/stores/types/CanvasStoreTypes";
import type { CustomPathI } from "@/types/fabric.types";
import addArrowEnd from "@/utils/fabricUtils/addArrowEnd";
import findCanvasObjById from "@/utils/fabricUtils/findCanvasObjById";
import getSvgPathFromStroke from "@/utils/getSvgPathFromStroke";
import getUniqueId from "@/utils/getUniqueId";
import { fabric } from "fabric";
import getStroke from "perfect-freehand";

type HandleArrowDrawingArgs = {
  canvas: fabric.Canvas | null;
  squareSettings: DefaultSquareMode;
  drawingSettings: {
    size: number;
    stroke: string;
    thinning: number;
    smoothing: number;
    streamline: number;
  };
  callback: () => void;
};

let objId = "";
let isMouseDown = false;
let position: number[][] = [[0, 0]];

const handleArrowDrawing = ({
  canvas,
  callback,
  squareSettings,
  drawingSettings,
}: HandleArrowDrawingArgs) => {
  if (!canvas) {
    console.error("Draw stroke on canvas: canvas is null");
    return;
  }

  canvas.on("mouse:down", (e) => {
    isMouseDown = true;
    objId = getUniqueId();
    canvas.off("object:added");
    canvas.off("object:removed");
    canvas.off("object:modified");

    const pointer = canvas.getPointer(e.e);

    position = [[pointer.x, pointer.y]];
  });

  canvas.on("mouse:move", (e) => {
    if (!isMouseDown) return;

    const pointer = canvas.getPointer(e.e);
    position.push([pointer.x, pointer.y]);

    const outlinePoints = getStroke(position, {
      ...drawingSettings,
      easing(t) {
        // Cubic equation for linear easing
        t = Math.max(0, Math.min(1, t));
        return t * t * (3 - 2 * t);
      },
    });

    const objFound = findCanvasObjById(objId, canvas);

    if (objFound) {
      canvas.remove(objFound);
    }

    const pathData = getSvgPathFromStroke(outlinePoints);

    const path = new fabric.Path(pathData, {
      scaleX: 1,
      scaleY: 1,
      cornerSize: 6,
      evented: false,
      selectable: false,
      objectCaching: false,
      hasRotatingPoint: false,
      fill: squareSettings.stroke,
    }) as CustomPathI;

    path.id = objId;

    canvas.add(path);
  });

  canvas.on("mouse:up", (e) => {
    if (!isMouseDown) return;

    canvas.on("object:added", callback);
    canvas.on("object:removed", callback);
    canvas.on("object:modified", callback);

    const lastPosition = position[position.length - 2];
    const startPosition = position[Math.floor(position.length * 0.8)]; // get start from last 30% of the stroke

    const objFound = findCanvasObjById(objId, canvas);

    if (!objFound) {
      return;
    }

    canvas.remove(objFound);

    const group = addArrowEnd({
      lastPosition,
      startPosition,
      squareSettings,
      canvasObjects: objFound,
    });

    objId = "";
    isMouseDown = false;
    position = [[0, 0]];

    canvas.add(group);
    group.setCoords();
    canvas.setActiveObject(group);
  });
};

export default handleArrowDrawing;
