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
    cornerSize: 6,
    top: position.y,
    left: position.x,
    // fontWeight: "bold",
    fontFamily: "Kalam",
    fill: fabric.Color.fromHex("#111827").toRgba(),
  }) as CustomITextI;

  textObject.id = getUniqueId();

  canvas?.add(textObject);

  // Not sure why but this is needed to make the text scalable and rotatable
  const allObj = canvas?.getObjects() as CustomITextI[];
  const findObj = allObj.find((obj) => obj.id === textObject.id);

  if (!findObj) return;

  findObj.bringToFront();
  canvas?.remove(findObj);
  canvas?.add(findObj);
  canvas?.setActiveObject(findObj).renderAll();
};

export default handleAddITextToCanvas;
