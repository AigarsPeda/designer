import getStoredCanvasStateByName from "@/utils/getStoredCanvasStateByName";
import { fabric } from "fabric";

const loadCanvasFromJson = async (
  canvas: fabric.Canvas | null,
  name: string
) => {
  return new Promise<boolean>((resolve, _reject) => {
    const state = getStoredCanvasStateByName(name);

    // if (!canvas || !state) {
    //   console.error("Canvas or state is null", state);
    //   reject(false);
    // }

    canvas?.loadFromJSON(state, () => {
      canvas.forEachObject((obj) => {
        canvas.remove(obj);
        obj.setOptions({
          cornerSize: 6,
          noScaleCache: false,
        });

        obj.setCoords();
        canvas.add(obj);
      });

      canvas.renderAll();
      resolve(true);
    });
  });
};

export default loadCanvasFromJson;
