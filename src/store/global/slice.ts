import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GlobalState, UserInfo } from './types'

const initialState: GlobalState = {
  userInfo: null
}

const globalStateSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<null | UserInfo>) {
      state.userInfo = action.payload
    }
  }
})

export const globalActions = globalStateSlice.actions

export default globalStateSlice.reducer
