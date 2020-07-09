// @ts-nocheck
import { fabric } from 'fabric'

export const freeDrawMode = (canvas: fabric.Canvas) => {
  canvas.isDrawingMode = true
  canvas.__eventListeners["mouse:down"] = []
  canvas.__eventListeners["mouse:move"] = []
  canvas.__eventListeners["mouse:up"] = []
}