export type CanvaModeType =
  | "drawing"
  | "panning"
  | "mainMenu"
  | "square"
  | "line"
  | "ObjContextMenu";

export interface UiStoreStateType {
  offsetWidthInVW: number;
  isDotBackground: boolean;
  canvasMode: CanvaModeType;
}
