import { fabric } from 'fabric'

export const selectMode = (canvas: fabric.Canvas) => {
  canvas.isDrawingMode = false
  // @ts-ignore
  canvas.__eventListeners["mouse:down"] = []
}