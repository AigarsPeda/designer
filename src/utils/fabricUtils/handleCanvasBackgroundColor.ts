import canvasBgCallback from '@/utils/svgUtils/canvasBgCallback'

type HandleCanvasBackgroundColorArgs = {
  canvas: fabric.Canvas | null
  backgroundColor: string | fabric.Pattern
}

const handleCanvasBackgroundColor = ({
  canvas,
  backgroundColor
}: HandleCanvasBackgroundColorArgs) => {
  if (!canvas) {
    return
  }

  canvas.setBackgroundColor(backgroundColor, () => canvasBgCallback(canvas, 0))
}

export default handleCanvasBackgroundColor
