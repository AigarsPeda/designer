const makeAllObjCanvasUnselectable = (canvas: fabric.Canvas | null) => {
  if (!canvas) {
    console.error("makeAllObjCanvasUnselectable: canvas is null");
    return;
  }

  canvas.discardActiveObject();
  canvas.selection = false;

  canvas.forEachObject((obj) => {
    obj.setOptions({
      evented: false,
      selectable: false,
      hasControls: false,
      hasRotatingPoint: false,
    });
  });

  // canvas.renderAll();
};

export default makeAllObjCanvasUnselectable;
