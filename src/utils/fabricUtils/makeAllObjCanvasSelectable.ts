const makeAllObjCanvasSelectable = (canvas: fabric.Canvas | null) => {
  if (!canvas) {
    console.error('makeAllObjCanvasSelectable: canvas is null')
    return
  }

  canvas.selection = true
  canvas?.forEachObject((obj) => {
    obj.setOptions({
      evented: true,
      selectable: true,
      hasControls: true,
      hasRotatingPoint: true
    })
  })
}

export default makeAllObjCanvasSelectable
