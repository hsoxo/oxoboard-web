import { put, take } from 'redux-saga/effects'
import * as sagaActions from './actions'
import { globalActions } from './slice'

function* globalSagaWatcher() {
  while (true) {
    const action = yield take(Object.values(sagaActions))
    switch (action.type) {
      case sagaActions.SET_TITLE: {
        yield put(globalActions.setUserInfo(action.payload))
        break
      }
    }
  }
}

export default globalSagaWatcher
