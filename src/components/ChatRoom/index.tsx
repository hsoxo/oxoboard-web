import React, { useEffect, useReducer } from 'react'
import { socketCR } from './socket'
import InputArea from '@/components/ChatRoom/components/InputArea'
import { chatRoomActions, chatRoomReducer, initChatRoomState } from "@/components/ChatRoom/context/slice";
import { ChatRoomContext } from "@/components/ChatRoom/context";
import Message from "@/components/ChatRoom/components/Message";
import styled from 'styled-components'

const ChatRoom = () => {
  const [state, dispatch] = useReducer(chatRoomReducer, initChatRoomState())

  useEffect(() => {
    socketCR.on('userCode', (userCode: string) => {
      dispatch(chatRoomActions.setUserCode(userCode))
    })

    socketCR.on('broadcast',(msg: any) => {
      console.log(msg)
      dispatch(chatRoomActions.appendMessage(msg))
    })
  }, [])

  return (
    <ChatRoomContext.Provider value={{ state, dispatch }}>
      <div>
        <MessagesWrapper>
          {state.messages.map(x => <Message key={`${x.userCode}${x.timestamp}`} {...x} />)}
        </MessagesWrapper>
        <InputArea />
      </div>
    </ChatRoomContext.Provider>
  )
}
const MessagesWrapper = styled.div`
  height: 600px;
  
`

export default ChatRoom
