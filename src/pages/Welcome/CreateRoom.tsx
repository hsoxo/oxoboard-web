import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import { createChatRoom, fetchChatroomInfo } from '@/api/chatroom'
import { TextField } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import { sNickname } from '@/utils/storage'
import { useSelector } from '@/store'
import selectors from '@/store/selectors'

const CreateRoom: React.FC = () => {
  const history = useHistory()
  const userInfo = useSelector(selectors.kvGlobal('userInfo'))

  const handleCreateRoom = () => {
    if (userInfo) {
      createChatRoom(userInfo.username)
        .then((r: any) => {
          history.push(`/${r.chatroomId}`)
        })
    }
  }

  return (
    <Form>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleCreateRoom}
      >
        创建房间
      </Button>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 220px;
  justify-content: space-around;
`

export default CreateRoom
