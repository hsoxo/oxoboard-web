import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { StylesProvider } from '@material-ui/core/styles'
import { DialogServiceProvider } from '@/hooks/useDialog'
import { SnackbarProvider } from 'notistack'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router/immutable'

import App from './App'
import { history, store } from '@/store'

import '@/assets/base.css'

ReactDOM.render(
  <StylesProvider injectFirst>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      autoHideDuration={4000}
    >
      <DialogServiceProvider>
          <Provider store={store}>
            <ConnectedRouter history={history} noInitialPop>
              <App />
            </ConnectedRouter>
          </Provider>
      </DialogServiceProvider>
    </SnackbarProvider>
  </StylesProvider>,
  document.getElementById('root')
)
