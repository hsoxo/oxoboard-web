import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { StylesProvider } from '@material-ui/core/styles'
import { DialogServiceProvider } from '@/hooks/useDialog'

import App from './App'
import '@/assets/base.css'

ReactDOM.render(
  <StylesProvider injectFirst>
    <DialogServiceProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DialogServiceProvider>
  </StylesProvider>,
  document.getElementById('root')
)
