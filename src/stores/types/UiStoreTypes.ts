export type CanvaModeType =
  | "line"
  | "arrow"
  | "square"
  | "drawing"
  | "panning"
  | "mainMenu"
  | "ObjContextMenu";

export interface UiStoreStateType {
  offsetWidthInVW: number;
  isDotBackground: boolean;
  canvasMode: CanvaModeType;
  // selectedCanvasName: string;
}
