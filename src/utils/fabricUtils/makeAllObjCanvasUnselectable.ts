const makeAllObjCanvasUnselectable = (canvas: fabric.Canvas | null) => {
  if (!canvas) {
    console.error("makeAllObjCanvasUnselectable: canvas is null");
    return;
  }
  canvas.selection = false;
  canvas.discardActiveObject();
  canvas.forEachObject((obj) => {
    obj.setOptions({
      evented: false,
      selectable: false,
      hasControls: false,
      hasRotatingPoint: false,
    });
  });
};

export default makeAllObjCanvasUnselectable;
