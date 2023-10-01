const resetCanvasMouseMoveUpDown = (canvas: fabric.Canvas | null) => {
  canvas?.off("mouse:up");
  canvas?.off("mouse:down");
  canvas?.off("mouse:move");
};

export default resetCanvasMouseMoveUpDown;
