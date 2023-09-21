export type CanvaModeType =
  | "drawing"
  | "panning"
  | "mainMenu"
  | "square"
  // | "group";
  | "ObjContextMenu";

export interface UiStoreStateType {
  offsetWidthInVW: number;
  isDotBackground: boolean;
  canvasMode: CanvaModeType;
}
