export type CanvaModeType =
  | "drawing"
  | "panning"
  | "mainMenu"
  | "square"
  | "group";

export interface UiStoreStateType {
  offsetWidthInVW: number;
  isDotBackground: boolean;
  canvasMode: CanvaModeType;
}
