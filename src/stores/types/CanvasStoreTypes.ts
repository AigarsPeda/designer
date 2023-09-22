import { fabric } from "fabric";

export type DefaultDrawingMode = {
  size: number;
  stroke: string;
  thinning: number;
  smoothing: number;
  streamline: number;
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
  };
  selectedObjectIds: string[];
}
