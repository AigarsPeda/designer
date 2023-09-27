import { fabric } from "fabric";

const backSpaceEventListener = (canvas: fabric.Canvas | null) => {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Backspace") {
      const activeObj = canvas?.getActiveObject();

      if (!activeObj) {
        return;
      }

      canvas?.remove(activeObj);
    }
  });
};

export default backSpaceEventListener;
