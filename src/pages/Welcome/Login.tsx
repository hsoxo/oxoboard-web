import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { useSnackbar } from 'notistack'
import styled from 'styled-components'
import { login } from '@/api/user'
import { sToken } from '@/utils/storage'
import { reduxAction } from '@/store'
import { globalActions } from '@/store/global/slice'

const Login: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    if (!!username && !!password) {
      login(username, password)
        .then((r: any) => {
          sToken.set(r.accessToken)
          reduxAction(globalActions.setUserInfo(r.userInfo))
        })
        .catch(e => {
          console.trace(e)
          enqueueSnackbar('用户名/密码错误', {variant: 'error'})
        })
    }
  }

  return (
    <Form>
      <TextField
        label="用户名"
        margin="dense"
        variant="outlined"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <TextField
        label="密码"
        margin="dense"
        variant="outlined"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogin}
      >
        登陆
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
export default Login
