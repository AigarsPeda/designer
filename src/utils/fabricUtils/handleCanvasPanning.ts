import { fabric } from 'fabric'

type HandleCanvasPanningArgs = {
  canvas: fabric.Canvas | null
}

let touchStartX = 0
let touchStartY = 0
let isPanning = false

const handleCanvasPanning = ({ canvas }: HandleCanvasPanningArgs) => {
  if (!canvas) {
    return
  }

  // Reset the canvas to default
  canvas?.off('mouse:up')
  canvas?.off('mouse:move')
  canvas?.off('mouse:down')

  const test = canvas.on('mouse:down', (e) => {
    isPanning = true

    if (e && e.e && e.e.type === 'touchstart') {
      const event = e.e as unknown as TouchEvent
      touchStartX = event?.changedTouches[0]?.clientX
      touchStartY = event?.changedTouches[0]?.clientY
    }

    e.target?.setOptions({
      opacity: 0.5
    })
  })

  canvas.on('mouse:move', (e) => {
    if (!isPanning || !e || !e.e || e.target) {
      return
    }

    if (e.e.type === 'mousemove') {
      const delta = new fabric.Point(e.e.movementX, e.e.movementY)
      canvas.relativePan(delta)
    }

    if (e.e.type === 'touchmove') {
      const event = e.e as unknown as TouchEvent
      const touch = event?.touches[0]

      if (!touch) {
        return
      }

      const sensitivityFactor = 0.9 // Adjust this value as needed
      let deltaX = (touch.clientX - touchStartX) * sensitivityFactor
      let deltaY = (touch.clientY - touchStartY) * sensitivityFactor

      touchStartX = touch.clientX
      touchStartY = touch.clientY

      const delta = new fabric.Point(deltaX, deltaY)

      canvas.relativePan(delta)
    }
  })

  canvas.on('mouse:up', (e) => {
    isPanning = false

    e.target?.setOptions({
      opacity: 1
    })

    touchStartX = 0
    touchStartY = 0
  })
}

export default handleCanvasPanning
