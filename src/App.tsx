import React, { Suspense, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import ChatRoom from '@/components/ChatRoom'
import PaintBoard from "@/components/PaintBroad";
import Room from '@/pages/Room'

export default function App() {

  useEffect(() => {
    const icon = document.createElement('link')
    icon.setAttribute('rel', 'icon')
    icon.setAttribute(
      'href',
      `${document.location.protocol}//${document.location.host}/favicon.ico`
    )
    document.head.appendChild(icon)
  }, [])

  return (
    <Suspense fallback={'loading...'}>
      <Switch>
        <Route path={['/']} render={() => <Room />} />
        <Route path={['/test1']} render={() => <ChatRoom />} />
        <Route path={['/test2']} render={() => <PaintBoard />} />
      </Switch>
    </Suspense>
  )
}
