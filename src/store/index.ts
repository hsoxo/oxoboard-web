import { createBrowserHistory, History } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import { combineReducers } from 'redux-immutable'
import createSagaMiddleware from 'redux-saga'
import { Map } from 'immutable'

import rootSaga from './rootSaga'
import globalReducer, { globalActions } from './global/slice'
import { GlobalActionTypes } from './global/actions'
import { GlobalState } from "./global/types";

export type RootState = {
  global: GlobalState,
}
interface StateMap<T> extends Map<keyof T, any> {
  get<K extends keyof T>(key: keyof T): T[K]
}
export type RootStateMap = StateMap<RootState>

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    global: globalReducer,
  })

export const history = createBrowserHistory()

const rootReducer = createRootReducer(history)

const saga = createSagaMiddleware()
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose

let enhancer = composeEnhancers(
  applyMiddleware(
    routerMiddleware(history),
    saga
  ),
)

// @ts-ignore
export const store = createStore(rootReducer, enhancer)
console.log(store.getState())
saga.run(rootSaga)

export const useSelector: TypedUseSelectorHook<RootStateMap> = useReduxSelector

export const action = (
  x:
    | GlobalActionTypes
) => store.dispatch(x)

export const reduxAction = (
  x: any
) => store.dispatch(x)

