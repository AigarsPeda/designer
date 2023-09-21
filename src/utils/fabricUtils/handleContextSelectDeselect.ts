import type { CanvaModeType } from "@/stores/types/UiStoreTypes";
import type { CustomObjI } from "@/types/fabric.types";

type HandleContextSelectDeselectArgs = {
  canvas: fabric.Canvas | null;
  action: (str: CanvaModeType, ids: string[]) => void;
};

const handleContextSelectDeselect = ({
  canvas,
  action,
}: HandleContextSelectDeselectArgs) => {
  canvas?.off("mouse:up");
  canvas?.off("mouse:move");
  canvas?.off("mouse:down");

  canvas?.on("mouse:up", (e) => {
    const activeObj = canvas.getActiveObjects() as CustomObjI[];

    const ids = activeObj.map((obj) => {
      return obj?.id || "no id";
    });

    // const targetType = canvas?.findTarget(e.e, true)?.type || "";
    // console.log("targetType", targetType);

    if (ids.length > 0) {
      action("ObjContextMenu", ids);
      return;
    }

    action("mainMenu", []);
  });
};

export default handleContextSelectDeselect;
