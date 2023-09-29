import { fabric } from "fabric";

export interface CustomObjI extends fabric.Object {
  _objects?: fabric.Object[];
  id: string;
}

export interface CustomRectI extends fabric.Rect {
  _objects?: fabric.Object[];
  id: string;
}

export interface CustomGroupOptionsI extends fabric.IGroupOptions {
  id: string;
}

export interface CustomGroupI extends fabric.Group {
  id: string;
}

export interface CustomITextI extends fabric.IText {
  id: string;
}
