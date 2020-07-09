import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import { fetchChatroomInfo } from '@/api/chatroom'
import { TextField } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import { sNickname } from '@/utils/storage'

const JoinRoom: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar()
  const history = useHistory()
  const [nn, setNn] = useState('')
  const [roomId, setRoomId] = useState('')

  const handleJoinRoom = () => {
    if (roomId) {
      fetchChatroomInfo(roomId)
        .then(r => {
          sNickname.set(nn)
          // @ts-ignore
          history.push(`/${r.chatroomId}`)
        })
        .catch(r => {
          enqueueSnackbar('没有此房间', { variant: 'error' })
        })
    }
  }

  return (
    <Form>
      <TextField
        label="您的昵称"
        margin="dense"
        variant="outlined"
        value={nn}
        onChange={e => setNn(e.target.value)}
      />
      <TextField
        label="房间号"
        margin="dense"
        variant="outlined"
        value={roomId}
        onChange={e => setRoomId(e.target.value)}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleJoinRoom}
      >
        加入房间
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

export default JoinRoom
