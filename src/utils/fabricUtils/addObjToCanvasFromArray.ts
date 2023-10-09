import { fabric } from "fabric";

type CopyActiveObjectsArgs = {
  canvas: fabric.Canvas | null;
  objectsArray: fabric.Object[];
};

const addObjToCanvasFromArray = ({
  canvas,
  objectsArray,
}: CopyActiveObjectsArgs) => {
  if (!objectsArray || !canvas) {
    return;
  }

  canvas.discardActiveObject();

  if (objectsArray.length === 1) {
    canvas.add(...objectsArray);
  }

  if (objectsArray.length > 1) {
    const { bl, br, tl } = canvas.calcViewportBoundaries();

    const width = br.x - bl.x;
    const height = bl.y - tl.y;

    for (let i in objectsArray) {
      const obj = objectsArray[i];

      obj.setOptions({
        top: (obj?.top || 1) + height / 2,
        left: (obj?.left || 1) + width / 2,
      });

      canvas.add(obj);
    }
  }

  // make multiple objects active
  canvas.setActiveObject(
    new fabric.ActiveSelection(objectsArray, {
      canvas: canvas,
    })
  );

  canvas.renderAll();
};

export default addObjToCanvasFromArray;
