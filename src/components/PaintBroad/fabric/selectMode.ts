// @ts-nocheck
import { fabric } from 'fabric'

export const selectMode = (canvas: fabric.Canvas) => {
  canvas.isDrawingMode = false
  canvas.__eventListeners["mouse:down"] = []
  canvas.__eventListeners["mouse:move"] = []
  canvas.__eventListeners["mouse:up"] = []
}