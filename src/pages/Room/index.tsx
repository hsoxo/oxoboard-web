import React, { useEffect, useReducer } from 'react'
import { useHistory, useParams } from "react-router";

import PaintBoard from '@/components/PaintBroad'
import ChatRoom from '@/components/ChatRoom'
import styled from 'styled-components'
import { Box } from '@material-ui/core'
import useQuery from '@/hooks/useQuery'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RoomStateType {
  roomId: string | null
  boardId: string | null
}
const initRoomState: () => RoomStateType = () => ({
  roomId: null,
  boardId: null,
})

const roomSlice = createSlice({
  name: 'room',
  initialState: initRoomState(),
  reducers: {
    setRoomId(state, action: PayloadAction<string>) {
      state.roomId = action.payload
    },
    setBoardId(state, action: PayloadAction<string>) {
      state.boardId = action.payload
    }
  }
})

const roomActions = roomSlice.actions

const Room: React.FC = () => {
  const board = useQuery('board')
  const { roomId } = useParams()
  const history = useHistory()

  const [state, dispatch] = useReducer(roomSlice.reducer, initRoomState())

  console.log(board, roomId)

  useEffect(() => {
    if (!roomId) {
      history.push('/login')
    } else {
      dispatch(roomActions.setRoomId(roomId))
      if (board) {
        dispatch(roomActions.setBoardId(board))
        history.replace(`/${roomId}`)
      } else {
      }
    }
  }, [roomId])

  console.log(state)

  return (
    <Box display={'flex'} alignItems={'center'} height={'100vh'}>
      {state.roomId && <ChatRoom roomId={roomId}/>}
    </Box>
  )
}


export default Room