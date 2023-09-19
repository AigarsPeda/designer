<template>
  <div class="design-canvas-container" ref="elRef">
    <FabricCanvas @canvas-created="handleCanvasCreated" :id="'1'" />
  </div>
</template>

<script setup lang="ts">
import FabricCanvas from '@/components/FabricCanvas.vue'
import useCanvasStore from '@/stores/useCanvasStore'
import useUIStore from '@/stores/useUIStore'
import drawStrokeOnCanvas from '@/utils/fabricUtils/drawStrokeOnCanvas'
import handleCanvasBackgroundColor from '@/utils/fabricUtils/handleCanvasBackgroundColor'
import handleCanvasPanning from '@/utils/fabricUtils/handleCanvasPanning'
import makeAllObjCanvasSelectable from '@/utils/fabricUtils/makeAllObjCanvasSelectable'
import makeAllObjCanvasUnselectable from '@/utils/fabricUtils/makeAllObjCanvasUnselectable'
import resetCanvasMouseMoveUpDown from '@/utils/fabricUtils/resetCanvasMouseMoveUpDown'
import dotPattern from '@/utils/svgUtils/patterns/dotPattern'
import { fabric } from 'fabric'
import { ref, watch } from 'vue'

const uiStore = useUIStore()
const canvasStore = useCanvasStore()

const imgUrl = (str: string) => {
  return new URL(str, import.meta.url)
}

const elRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<fabric.Canvas | null>(null)

const handleCanvasCreated = (fabricCanvas: fabric.Canvas) => {
  canvasRef.value = fabricCanvas
  const center = fabricCanvas.getCenter()

  // loadBgImageToCanvas(imgUrl(`../../src/assets/images/front.jpg`), fabricCanvas)

  const circle = new fabric.Circle({
    radius: 20,
    fill: '#4f46e5',
    top: center.top + 100,
    left: center.left + 100
  })
  const triangle = new fabric.Triangle({
    width: 60,
    height: 70,
    fill: '#c026d3',
    top: center.top + 50,
    left: center.left + 50
  })

  const textObj = new fabric.IText('Test text', {
    fontSize: 22,
    top: center.top,
    left: center.left,
    hasControls: true,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: 'Helvetica'
  })

  // start
  // left = 80 top = 10,

  // end
  // left = 200, top = 150
  const line = new fabric.Line([80, 10, 200, 150], {
    stroke: '#374151'
  })

  const test = new fabric.Polyline(
    [
      { x: 80, y: 10 },
      { x: 200, y: 150 },
      { x: 500, y: 250 }
    ],
    {
      stroke: '#ea580c',
      fill: 'transparent',
      strokeWidth: 5,
      strokeLineCap: 'round',
      strokeLineJoin: 'round'
    }
  )

  fabricCanvas.add(circle, triangle, line, test, textObj)

  console.log('handleCreated --->', fabricCanvas)
}

watch([uiStore, canvasStore], (newSate) => {
  const { getDrawingMode } = newSate[1]
  const { getIsDotBackground, getCanvasMode } = newSate[0]

  if (getCanvasMode === 'drawing') {
    makeAllObjCanvasUnselectable(canvasRef.value)
  }

  if (getCanvasMode !== 'drawing') {
    makeAllObjCanvasSelectable(canvasRef.value)
  }

  switch (getCanvasMode) {
    case 'drawing':
      drawStrokeOnCanvas({
        canvas: canvasRef.value,
        drawingMode: getDrawingMode
      })

      break
    case 'panning':
      handleCanvasPanning({ canvas: canvasRef.value })
      break

    default:
      resetCanvasMouseMoveUpDown(canvasRef.value)
      break
  }

  handleCanvasBackgroundColor({
    canvas: canvasRef.value,
    backgroundColor: getIsDotBackground ? dotPattern() : 'transparent'
  })
})
</script>

<style scoped>
span {
  font-weight: bold;
  color: #000;
}

.design-canvas-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
}
</style>
@/stores/useCanvasStore
