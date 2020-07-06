import { fabric } from 'fabric'

export interface PaintBoardState {
  cv: fabric.Canvas | null
  userCode: string | null
  isHost: boolean
  cvObjects: any[]

  color: string
}
