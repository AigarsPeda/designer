import scalingObjAndPreservingCorners from "@/utils/fabricUtils/scalingObjAndPreservingCorners";
import getUniqueId from "@/utils/getUniqueId";

type CopyActiveObjectsArgs = {
  canvas: fabric.Canvas | null;
};

const copyActiveObjects = ({ canvas }: CopyActiveObjectsArgs) => {
  const clonedArray: fabric.Object[] = [];

  const active = canvas?.getActiveObjects();

  if (active) {
    for (let i in active) {
      const obj = active[i];

      // const top = obj?.top || 0;

      obj.clone(
        (clonedObj: fabric.Object) => {
          clonedObj.setOptions({
            cornerSize: 6,
            id: getUniqueId(),
            top: (obj?.top || 0) + 20,
            left: (obj?.left || 0) + 20,
          });

          clonedObj.on("scaling", (event) =>
            scalingObjAndPreservingCorners(event)
          );

          clonedArray.push(clonedObj);
        },
        ["noScaleCache", "cornerSize"]
      );
    }

    // updateValue(clonedArray);
  }

  return clonedArray;
};

export default copyActiveObjects;
