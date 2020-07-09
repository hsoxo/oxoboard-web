import React, { Suspense, useEffect } from 'react'
import { Route, Switch, useLocation, useHistory } from 'react-router-dom'
import Room from '@/pages/Room'
import Welcome from '@/pages/Welcome'

export default function App() {
  const history = useHistory()
  const location = useLocation()

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

  return (
    <Switch>
      <Route path={'/login'} render={() => <Welcome />} />
      <Route path={'/:roomId'} render={() => <Room />} />
    </Switch>
  )
}
