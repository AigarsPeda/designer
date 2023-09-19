import { fabric } from 'fabric'

const canvasBgCallback = (canvas: fabric.Canvas | null, time: number) => {
  if (!canvas) {
    return
  }
  return setTimeout(() => canvas.requestRenderAll(), time)
}

export default canvasBgCallback
