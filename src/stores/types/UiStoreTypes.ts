export type CanvaModeType = 'drawing' | 'panning' | 'mainMenu' | 'square'

export interface UiStoreStateType {
  offsetWidthInVW: number
  isDotBackground: boolean
  canvasMode: CanvaModeType
}
