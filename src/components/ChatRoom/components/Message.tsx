import React from 'react'
import { ChatMessage } from '@/components/ChatRoom/context/type-d'
import styled from 'styled-components'
import dateFormat from '@/utils/dateformat'

const Message: React.FC<ChatMessage> = ({ message, timestamp, nickname }) => {
  return (
    <Wrapper>
      <div>
        <Name>{nickname || '匿名'}</Name>
        <Time>{dateFormat(new Date(timestamp), 'yyyy-mm-dd HH:MM:ss')}</Time>
      </div>
      <Body>{message}</Body>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 5px;
`
const Name = styled.span`
  padding-right: 0.3rem;
`
const Time = styled.span`
  color: #8f8f8f;
  font-size: 0.8rem;
`
const Body = styled.div`
  background-color: #dff0ff;
  max-width: 70%;
  width: fit-content;
  border-radius: 15px;
  padding: 8px 12px;
  word-break: break-word;
  margin-top: 3px;
`

export default Message
