import React from 'react'
import PaintBoard from '@/components/PaintBroad'
import ChatRoom from '@/components/ChatRoom'
import styled from 'styled-components'
import { Box } from '@material-ui/core'

const Room = () => {
  return (
    <Box display={'flex'} alignItems={'center'} height={'100vh'}>
      <RoomWrapper>
        <PaintBoard />
        <ChatRoom />
      </RoomWrapper>
    </Box>
  )
}

const RoomWrapper = styled.div`
  display: flex;
  width: calc(1024px + 400px);
  height: 768px;
  margin: auto;
  box-shadow: 2px 2px 49px 20px rgba(204,204,204,1);
`
export default Room