import React, { createContext } from 'react'
import { initPaintBoardState } from './slice'
import { PaintBoardState } from './type-d'

export const PaintBoardContext = createContext<{
  state: PaintBoardState
  dispatch: React.Dispatch<any>
}>({
  state: initPaintBoardState(),
  dispatch: () => null
})
