import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fabric } from 'fabric'
import { PaintBoardState } from "@/components/PaintBroad/context/type-d";


export const initPaintBoardState: () => PaintBoardState = () => ({
  cv: null,
  userCode: null,
  isHost: false,
  cvObjects: [],

  color: '#000000'
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
    },
    setColor(state, action: PayloadAction<string>) {
      state.color = action.payload
    }
  }
})

export const paintBoardActions = paintBoardSlice.actions

export const paintBoardReducer = paintBoardSlice.reducer