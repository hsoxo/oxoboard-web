import React, { useContext } from 'react'
import { Button, Divider, Grid, IconButton, InputBase, Paper, TextField } from '@material-ui/core'
import { socketCR } from '../socket'
import { ChatRoomContext } from "@/components/ChatRoom/context";
import SendIcon from '@material-ui/icons/Send';
import styled from 'styled-components'

const InputArea = () => {
  const [value, setValue] = React.useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)

  const handleSend = () => {
    if (value) {
      socketCR.emit('sendMsg', value)
      setValue('')
    }
  }

  return (
    <Wrapper>
      <StyledInputBase
        value={value}
        placeholder="加入讨论"
        name="text"
        onChange={handleChange}
        multiline
      />
      <IconButton
        color="primary"
        onClick={handleSend}
      >
        <SendIcon/>
      </IconButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  border: 2px solid #f0f0f0;
  border-radius: 5px;
  padding: 0 0 0 10px;
  margin: 10px;
  height: 145px;
  align-items: flex-start;
`
const StyledInputBase = styled(InputBase)`
  max-height: 145px;
  overflow-y: scroll;
  padding: 10px 0;
  width: 274px;
`
export default InputArea
