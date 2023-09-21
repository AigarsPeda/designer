type HandleContextMenuArgs = {
  canvas: fabric.Canvas | null;
};

const handleContextMenu = ({ canvas }: HandleContextMenuArgs) => {
  canvas?.off("mouse:up");
  canvas?.off("mouse:move");
  canvas?.off("mouse:down");

  canvas?.on("mouse:down", (e) => {
    console.log("mouse:down", e);
    console.log("has target", canvas?.findTarget(e.e, true));
    // return target type
    // console.log("target", canvas?.findTarget(e.e, true)?.type);
    const targetType = canvas?.findTarget(e.e, true)?.type || "";
    console.log("targetType", targetType);
  });
};

export default handleContextMenu;
