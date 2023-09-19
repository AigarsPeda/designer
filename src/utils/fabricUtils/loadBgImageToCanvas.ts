import { fabric } from 'fabric'

const loadBgImageToCanvas = (url: URL, canvas: fabric.Canvas) => {
  fabric.Image.fromURL(url.href, function (img) {
    if (!img || !img.width || !img.height) {
      console.error('Error loading image from url')
      return
    }

    const canvasWidth = canvas.width || 0
    const canvasHeight = canvas.height || 0

    const scale = {
      scaleX: canvasWidth / img.width,
      scaleY: canvasHeight / img.height
    }

    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), scale)
  })
}

export default loadBgImageToCanvas
