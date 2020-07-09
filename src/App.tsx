import React, { Suspense, useEffect, useState } from 'react'
import { Route, Switch, useLocation, useHistory } from 'react-router-dom'
import Room from '@/pages/Room'
import Welcome from '@/pages/Welcome'
import { sNickname, sToken } from '@/utils/storage'
import { getUserInfo } from '@/api/user'
import { reduxAction } from '@/store'
import { globalActions } from '@/store/global/slice'
import { LinearProgress } from '@material-ui/core'

export default function App() {
  const history = useHistory()
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   const icon = document.createElement('link')
  //   icon.setAttribute('rel', 'icon')
  //   icon.setAttribute(
  //     'href',
  //     `${document.location.protocol}//${document.location.host}/favicon.ico`
  //   )
  //   document.head.appendChild(icon)
  // }, [])

  useEffect(() => {
    if (location.pathname === '/') {
      history.replace('/login')
    }
  }, [])

  useEffect(() => {
    const token = sToken.get()
    if (token) {
      getUserInfo().then((r: any) => {
        sToken.set(r.accessToken)
        sNickname.set(r.userInfo.nickname)
        reduxAction(globalActions.setUserInfo(r.userInfo))
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [])

  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
        <Switch>
          <Route path={'/login'} render={() => <Welcome />} />
          <Route path={'/:roomId'} render={() => <Room />} />
        </Switch>
      )}
    </>
  )
}
