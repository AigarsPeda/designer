import { fabric } from 'fabric'

type Container = {
  width: number
  height: number
}

const resizeCanvas = (canvas: fabric.Canvas, container: Container) => {
  // const containerWidth = containerRef.value.offsetWidth
  // const containerHeight = containerRef.value.offsetHeight

  const canvasWidth = canvas.getWidth()
  const canvasHeight = canvas.getHeight()

  const scale = container.width / canvasWidth

  const zoom = canvas.getZoom() * scale

  canvas.setDimensions({
    width: canvasWidth * scale,
    height: canvasHeight
    // height: canvasHeight * scale
  })

  canvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0])
}

export default resizeCanvas
