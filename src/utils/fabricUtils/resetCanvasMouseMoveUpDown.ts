const resetCanvasMouseMoveUpDown = (canvas: fabric.Canvas | null) => {
  canvas?.off('mouse:up')
  canvas?.off('mouse:move')
  canvas?.off('mouse:down')
}

export default resetCanvasMouseMoveUpDown
