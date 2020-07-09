export interface ChatMessage {
  roomId: string
  userCode: string
  userName: string
  message: string
  nickname: string
  timestamp: string
}

export interface ChatRoomState {
  userCode: string | null
  messages: ChatMessage[]
  currentBoardId: string
  socket: SocketIOClient.Socket | null
}
