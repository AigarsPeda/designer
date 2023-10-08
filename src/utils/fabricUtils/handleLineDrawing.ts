import type { DefaultSquareMode } from "@/stores/types/CanvasStoreTypes";
import type { CustomLineI } from "@/types/fabric.types";
import getUniqueId from "@/utils/getUniqueId";
import { fabric } from "fabric";

type HandleLineDrawingArgs = {
  canvas: fabric.Canvas | null;
  squareModeSettings: DefaultSquareMode;
};

let id = "";
let isDown = false;

const handleLineDrawing = ({
  canvas,
  squareModeSettings,
}: HandleLineDrawingArgs) => {
  if (!canvas) {
    return;
  }

  canvas.on("mouse:down", (o) => {
    isDown = true;
    id = getUniqueId();

    const pointer = canvas.getPointer(o.e);
    const points = [pointer.x, pointer.y, pointer.x, pointer.y];
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
    const line = new fabric.Line(points, {
      cornerSize: 6,
      strokeWidth: 3,
      cornerStyle: "circle",
      fill: squareModeSettings.stroke,
      stroke: squareModeSettings.stroke,
      originX: "center",
      originY: "center",
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

  canvas.on("mouse:up", () => {
    if (!isDown) return;
    isDown = false; // Moving this to button makes it so you can't draw multiple lines

    const obj = canvas.getObjects() as CustomLineI[];
    const objToSelect = obj.filter((o) => o?.id === id);

    for (let i = 0; i < objToSelect.length; i++) {
      const element = objToSelect[i];

      canvas.remove(element);
      element.setCoords();
      canvas.add(element);
    }
  });

  // makeAllObjCanvasUnselectable(canvas);
};

export default handleLineDrawing;
