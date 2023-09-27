import { fabric } from "fabric";

export type DrawingSettingsType = {
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
  isTextToObject: boolean;
  selectedCanvas: fabric.Canvas | null;
  canvas: {
    id: string;
    canva: fabric.Canvas;
  }[];
  defaultCanvasSate: {
    drawingSettings: DrawingSettingsType;
    squareModeSettings: DefaultSquareMode;
  };
  selectedObjectIds: string[];
}