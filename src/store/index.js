import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync'
import { sessionReducer, sessionService } from 'redux-react-session'
import * as storage from 'redux-storage'
import todoApp from './reducers'

import createEngine from 'redux-storage-engine-localstorage'
const engine = createEngine('my-save-key')
console.log("TCL: engine", engine.load())
const middleware = storage.createMiddleware(engine)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose

const reducer = combineReducers({
  todoApp: todoApp,
  session: sessionReducer
})

let l = window.localStorage.getItem('my-save-key')

const store = createStore(
  storage.reducer(reducer),
  l ? JSON.parse(l) : void 0,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  composeEnhancers(applyMiddleware(createStateSyncMiddleware(), middleware))
)

initStateWithPrevTab(store)
sessionService.initSessionService(store, {
  driver: 'LOCALSTORAGE'
})
const load = storage.createLoader(engine)
load(store)

export default store
