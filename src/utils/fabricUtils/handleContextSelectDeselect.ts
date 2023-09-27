import type { CanvaModeType } from "@/stores/types/UiStoreTypes";
import type { CustomObjI } from "@/types/fabric.types";
import { fabric } from "fabric";

type HandleContextSelectDeselectArgs = {
  canvas: fabric.Canvas | null;
  action: (str: CanvaModeType, ids: string[]) => void;
};

let timer = 0;
const TIMER = 200;
let doubleClick = false;

const handleContextSelectDeselect = ({
  canvas,
  action,
}: HandleContextSelectDeselectArgs) => {
  canvas?.off("mouse:up");
  canvas?.off("mouse:move");
  canvas?.off("mouse:down");

  canvas?.on("mouse:up", (e) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      if (doubleClick) {
        return;
      }

      const activeObj = canvas.getActiveObjects() as CustomObjI[];

      const ids = activeObj.map((obj) => {
        return obj?.id || "no id";
      });

      if (ids.length > 0) {
        action("ObjContextMenu", ids);
        return;
      }

      action("mainMenu", []);
    }, TIMER);
  });

  canvas?.on("mouse:dblclick", (e) => {
    const target = canvas.findTarget(e.e, true);

    if (doubleClick) {
      return;
    }

    console.log("target", target);

    // get target middle
    const targetMiddle = {
      x: (target?.left || 0) + (target?.width || 0) / 2,
      y: (target?.top || 0) + (target?.height || 0) / 2,
    };

    // text

    const textObject = new fabric.IText("Enter text here...", {
      fontSize: 16,
      left: targetMiddle.x,
      top: targetMiddle.y,
      // radius: 10,
      // borderRadius: "25px",
      hasRotatingPoint: true,
      editable: true,
      selected: true,
    });

    canvas?.add(textObject);
    textObject.enterEditing();
    textObject.bringToFront();
    canvas.discardActiveObject();

    doubleClick = true;
    console.log("dblclick", e);

    setTimeout(() => {
      doubleClick = false;
    }, TIMER + 100);
  });
};

export default handleContextSelectDeselect;
