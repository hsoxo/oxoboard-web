import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMessage, ChatRoomState } from "@/components/ChatRoom/context/type-d";


export const initChatRoomState: () => ChatRoomState = () => ({
  userCode: null,
  messages: [],
  currentBoardId: '',
  socket: null,
})

const chatRoomSlice = createSlice({
  name: 'chatRoomSlice',
  initialState: initChatRoomState(),
  reducers: {
    setUserCode(state, action: PayloadAction<string>) {
      state.userCode = action.payload
    },
    appendMessage(state, action: PayloadAction<ChatMessage>) {
      state.messages = [...state.messages, action.payload]
    },
    appendManyMessage(state, action: PayloadAction<ChatMessage[]>) {
      state.messages = [...state.messages, ...action.payload]
    },
    setSocket(state, action: PayloadAction<SocketIOClient.Socket>) {
      state.socket = action.payload
    },
    setCurrentBoardId(state, action: PayloadAction<string>) {
      state.currentBoardId = action.payload
    }
  }
})

export const chatRoomActions = chatRoomSlice.actions

export const chatRoomReducer = chatRoomSlice.reducer