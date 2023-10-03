import type { CustomITextI } from "@/types/fabric.types";
import getUniqueId from "@/utils/getUniqueId";
import { fabric } from "fabric";

type ITextDrawingArgs = {
  text: string;
  canvas: fabric.Canvas | null;
  position: { x: number; y: number };
};

const handleAddITextToCanvas = ({
  text,
  canvas,
  position,
}: ITextDrawingArgs) => {
  const textObject = new fabric.IText(text, {
    fontSize: 16,
    evented: true,
    editable: true,
    selected: true,
    top: position.y,
    left: position.x,
    hasControls: true,
    fill: "#0f172a",
    fontWeight: "bold",
    hasRotatingPoint: true,
    fontFamily: "Montserrat",
  }) as CustomITextI;

  textObject.id = getUniqueId();
  textObject.bringToFront();

  canvas?.add(textObject);
  canvas?.renderAll();
  canvas?.setActiveObject(textObject);
};

export default handleAddITextToCanvas;
