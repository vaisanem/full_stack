import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import infoReducer from './reducers/infoReducer'
import filterReducer from './reducers/filterReducer'
import { initialAnecdotes } from './reducers/anecdoteReducer'

const reducer = combineReducers({
  info: infoReducer,
  anecdotes: anecdoteReducer,
  filter: filterReducer
})

const initialState = {
  anecdotes: initialAnecdotes
}

const store = createStore(reducer, initialState)

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)