import { fabric } from 'fabric'

export interface CustomObjI extends fabric.Object {
  id: string
}

export interface CustomGroupOptionsI extends fabric.IGroupOptions {
  id: string
}

export interface CustomGroupI extends fabric.Group {
  id: string
}
