import React, { Suspense, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Loading } from '@/components/Loading'
import ChatRoom from '@/pages/ChatRoom'
import PaintBoard from "@/pages/PaintBroad";

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
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path={['/test1']} render={() => <ChatRoom />} />
        <Route path={['/test2']} render={() => <PaintBoard />} />
      </Switch>
    </Suspense>
  )
}
