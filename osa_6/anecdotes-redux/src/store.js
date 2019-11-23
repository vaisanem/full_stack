import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import anecdoteReducer from './reducers/anecdoteReducer'
import infoReducer from './reducers/infoReducer'
import filterReducer from './reducers/filterReducer'
import { initAction } from './reducers/anecdoteReducer'

const reducer = combineReducers({
    info: infoReducer,
    anecdotes: anecdoteReducer,
    filter: filterReducer
  })
  
const store = createStore(reducer, applyMiddleware(thunk))
  
store.dispatch(initAction())

export default store