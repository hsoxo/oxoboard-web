import React, { useEffect, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import io from 'socket.io-client'

import InputArea from '@/components/ChatRoom/components/InputArea'
import { chatRoomActions, chatRoomReducer, initChatRoomState } from "@/components/ChatRoom/context/slice";
import { ChatRoomContext } from "@/components/ChatRoom/context";
import Message from "@/components/ChatRoom/components/Message";
import styled from 'styled-components'
import PaintBoard from '@/components/PaintBroad'
import { sNickname } from '@/utils/storage'



const ChatRoom: React.FC<{ roomId: string }> = ({ roomId }) => {
  const history = useHistory()
  const [state, dispatch] = useReducer(chatRoomReducer, initChatRoomState())

  useEffect(() => {
    const socket = io(`${process.env.WS_BASE}/chat`, {
      query: {
        room: roomId,
        nickname: sNickname.get()
      }
    })
    dispatch(chatRoomActions.setSocket(socket))

    socket.on('userCode', (userCode: string) => {
      dispatch(chatRoomActions.setUserCode(userCode))
    })

    socket.on('roomInfo', (r: any) => {
      dispatch(chatRoomActions.setCurrentBoardId(r.boards[0].paintboardId))
      // @ts-ignore
      dispatch(chatRoomActions.appendManyMessage(r.messages.map(x => ({
        roomId: x.chatroomId,
        userCode: x.createdUser,
        userName: x.nickname,
        message: x.message,
        nickname: x.nickname,
        timestamp: new Date(`${x.createdTime}`),
      }))))
    })


    socket.on('crError', (r: string) => {
      console.error(r)
      history.push('/login')
    })

    socket.on('broadcast',(msg: any) => {
      console.log(msg)
      dispatch(chatRoomActions.appendMessage(msg))
    })

  }, [roomId])
  console.log(state.messages)
  return (
    <ChatRoomContext.Provider value={{ state, dispatch }}>
      <RoomWrapper>
        {state.currentBoardId && state.userCode && <PaintBoard boardId={state.currentBoardId} userCode={state.userCode}/>}
        <div>
          <MessagesWrapper>
            {state.messages.map(x => <Message key={`${x.userCode}${x.timestamp}`} {...x} />)}
          </MessagesWrapper>
          <InputArea />
        </div>
      </RoomWrapper>
    </ChatRoomContext.Provider>
  )
}
const MessagesWrapper = styled.div`
  height: 600px;
  
`

const RoomWrapper = styled.div`
  display: flex;
  width: calc(1024px + 400px);
  height: 768px;
  margin: auto;
  box-shadow: 2px 2px 49px 20px rgba(204,204,204,1);
`
export default ChatRoom
