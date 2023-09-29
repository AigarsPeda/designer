import type { CanvaModeType } from "@/stores/types/UiStoreTypes";
import type { CustomITextI, CustomObjI } from "@/types/fabric.types";
import getUniqueId from "@/utils/getUniqueId";
import { fabric } from "fabric";

type HandleContextSelectDeselectArgs = {
  canvas: fabric.Canvas | null;
  // addListener: () => void;
  removeListener: () => void;
  action: (str: CanvaModeType, ids: string[]) => void;
};

let timer = 0;
const TIMER = 200;
let doubleClick = false;
// let textObject: CustomITextI | null = null;

const handleContextSelectDeselect = ({
  canvas,
  action,
  // addListener,
  removeListener,
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
        // addListener();
        action("ObjContextMenu", ids);
        return;
      }

      action("mainMenu", []);
    }, TIMER);
  });

  canvas?.on("mouse:dblclick", (e) => {
    const target = canvas.findTarget(e.e, true);
    console.log("double clicked type ---->", target?.type);

    if (doubleClick) {
      return;
    }

    // Entering text if double click on text
    if (target?.type === "i-text") {
      removeListener();
      const text = target as CustomITextI;

      if (text?.isEditing) {
        return;
      }

      text.enterEditing();
    }

    // Adding text if double click on rect
    if (target?.type === "rect" || !target) {
      // get target middle
      // const targetMiddle = {
      //   x: (target?.left || 0) + (target?.width || 0) / 2,
      //   y: (target?.top || 0) + (target?.height || 0) / 2,
      // };

      const targetMiddle = {
        x: e.pointer?.x || 0,
        y: e.pointer?.y || 0,
      };

      // text

      const textObject = new fabric.IText("Double click to edit text", {
        fontSize: 16,
        editable: true,
        selected: true,
        fontWeight: "bold",
        top: targetMiddle.y,
        left: targetMiddle.x,
        hasRotatingPoint: true,
        fontFamily: "Montserrat",
      }) as CustomITextI;

      textObject.id = getUniqueId();
      canvas.discardActiveObject();
      textObject.bringToFront();
      canvas?.add(textObject);
    }

    doubleClick = true;

    setTimeout(() => {
      doubleClick = false;
    }, TIMER + 100);
  });
};

export default handleContextSelectDeselect;
