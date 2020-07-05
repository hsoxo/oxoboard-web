import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fabric } from 'fabric'
import { PaintBoardState } from "@/pages/PaintBroad/context/type-d";


export const initPaintBoardState: () => PaintBoardState = () => ({
  cv: null,
  userCode: null,
  isHost: false,
  cvObjects: []
})

const paintBoardSlice = createSlice({
  name: 'paintBoardSlice',
  initialState: initPaintBoardState(),
  reducers: {
    setCV(state, action: PayloadAction<fabric.Canvas>) {
      console.log(123)
      // @ts-ignore
      state.cv = action.payload
    },
    setUserCode(state, action: PayloadAction<string>) {
      state.userCode = action.payload
    },
    setHost(state, action: PayloadAction<boolean>) {
      state.isHost = action.payload
    }
  }
})

export const paintBoardActions = paintBoardSlice.actions

export const paintBoardReducer = paintBoardSlice.reducer