export interface ChatMessage {
  userCode: string
  userName: string
  message: string
  timestamp: string
}

export interface ChatRoomState {
  userCode: string | null
  messages: ChatMessage[]
}
