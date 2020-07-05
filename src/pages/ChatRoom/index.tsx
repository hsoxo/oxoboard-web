import React, { useEffect, useReducer } from 'react'
import { socketCR } from './socket'
import InputArea from '@/pages/ChatRoom/components/InputArea'
import { chatRoomActions, chatRoomReducer, initChatRoomState } from "@/pages/ChatRoom/context/slice";
import { ChatRoomContext } from "@/pages/ChatRoom/context";
import Message from "@/pages/ChatRoom/components/Message";

const ChatRoom = () => {
  const [state, dispatch] = useReducer(chatRoomReducer, initChatRoomState())

  useEffect(() => {
    socketCR.on('userCode', (userCode: string) => {
      dispatch(chatRoomActions.setUserCode(userCode))
    })

    socketCR.on('broadcast',(msg: any) => {
      dispatch(chatRoomActions.appendMessage(msg))
    })
  }, [])

  return (
    <ChatRoomContext.Provider value={{
      state, dispatch
    }}>
      <InputArea />
      {state.messages.map(x => <Message key={`${x.userCode}${x.timestamp}`} {...x} />)}
    </ChatRoomContext.Provider>
  )
}

export default ChatRoom
