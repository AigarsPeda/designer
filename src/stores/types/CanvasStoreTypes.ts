import type { CustomObjI } from "@/types/fabric.types";
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
};

export interface StateType {
  selectedObjects: CustomObjI[];
  selectedCanvas: fabric.Canvas | null;
  canvas: {
    id: string;
    canva: fabric.Canvas;
  }[];
  defaultCanvasSate: {
    squareSettings: DefaultSquareMode;
    drawingSettings: DrawingSettingsType;
  };
}
