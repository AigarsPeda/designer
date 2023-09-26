import { fabric } from "fabric";

export type DefaultDrawingMode = {
  size: number;
  stroke: string;
  thinning: number;
  smoothing: number;
  streamline: number;
};

export type BackGroundPatternTypes = "none" | "dots";

export type DefaultSquareMode = {
  rx: number;
  ry: number;
  stroke: string;
  background: string;
  strokeWidth: number;
  backgroundPattern: BackGroundPatternTypes;
  // background: BackGroundTypes;
};

//declare state
export interface StateType {
  selectedCanvas: fabric.Canvas | null;
  canvas: {
    id: string;
    canva: fabric.Canvas;
  }[];
  defaultCanvasSate: {
    drawingMode: DefaultDrawingMode;
    squareModeSettings: DefaultSquareMode;
  };
  selectedObjectIds: string[];
}
