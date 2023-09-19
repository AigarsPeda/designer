import type { DefaultDrawingMode, StateType } from '@/stores/types/CanvasStoreTypes'
import { fabric } from 'fabric'
import { defineStore } from 'pinia'

const useCanvasStore = defineStore('design', {
  state: (): StateType => ({
    canvas: [],
    defaultCanvasSate: {
      drawingMode: {
        size: 4,
        thinning: 0.3,
        smoothing: 0.99,
        streamline: 0.99,
        stroke: '#60a5fa'
      }
    }
  }),

  getters: {
    getDrawingMode(): DefaultDrawingMode {
      return this.defaultCanvasSate.drawingMode
    },
    getCanvasLength({ canvas }: StateType): number {
      return canvas.length
    },
    getCanvasIds({ canvas }: StateType): string[] {
      return canvas.map(({ id }) => id)
    }
  },
  actions: {
    setCanvas({ id, canva }: { id: string; canva: fabric.Canvas }) {
      this.canvas.push({ id, canva })
    },
    setDrawingMode({ drawingMode }: { drawingMode: DefaultDrawingMode }) {
      this.defaultCanvasSate.drawingMode = drawingMode
    }
  }
})

export default useCanvasStore
