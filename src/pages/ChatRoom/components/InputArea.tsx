import React, { useContext } from 'react'
import { Button, TextField } from '@material-ui/core'
import { socketCR } from '../socket'
import { ChatRoomContext } from "@/pages/ChatRoom/context";

const InputArea = () => {
  const [value, setValue] = React.useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleSend = () => {
    socketCR.emit('sendMsg', value)
    setValue('')
  }

  return (
    <>
      <TextField
        id="outlined-multiline-flexible"
        label="Multiline"
        multiline
        rowsMax={4}
        value={value}
        onChange={handleChange}
        variant="outlined"
      />
      <Button onClick={handleSend}>发送</Button>
    </>
  )
}

export default InputArea
