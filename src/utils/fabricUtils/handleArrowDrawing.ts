import type { DefaultSquareMode } from "@/stores/types/CanvasStoreTypes";
import type { CustomLineI } from "@/types/fabric.types";
import getUniqueId from "@/utils/getUniqueId";
import { fabric } from "fabric";

type HandleArrowDrawingArgs = {
  canvas: fabric.Canvas | null;
  squareModeSettings: DefaultSquareMode;
};

let id = "";
let isDown = false;

let fromX = 0;
let fromY = 0;
let tox = 0;
let toy = 0;
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
    // if(document.getElementById('linetype').value == "dashed") {
    //    line = new fabric.Line(points, {
    //     strokeWidth: 5,
    //     strokeDashArray: [15, 5],
    //     fill: 'gray',
    //     stroke: 'gray',
    //     originX: 'center',
    //     originY: 'center'
    //   });
    // }
    // else {
    // const triangle = new fabric.Triangle({
    //   width: 150,
    //   height: 200,
    //   fill: "#add8e6",
    //   left: 400,
    //   top: 175,
    //   angle: 190,
    // });

    const line = new fabric.Line(points, {
      cornerSize: 6,
      strokeWidth: 3,
      originX: "center",
      originY: "center",
      cornerStyle: "circle",
      fill: squareModeSettings.stroke,
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

    const pointer = canvas.getPointer(event.e);
    const obj = canvas.getObjects() as CustomLineI[];
    const objToSelect = obj.filter((o) => o?.id === id);

    for (let i = 0; i < objToSelect.length; i++) {
      const element = objToSelect[i];

      canvas.remove(element);
    }

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
      originY: "top",
      originX: "left",
      evented: false,
      selectable: false,
      hasControls: false,
      hasRotatingPoint: false,
      fill: squareModeSettings.stroke, //'white',
      stroke: squareModeSettings.stroke, //'black',
    });

    arrow.setCoords();

    isDown = false;
    canvas.add(arrow).renderAll();
  });
};

export default handleArrowDrawing;
