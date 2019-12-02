import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'

import App from './App'
import infoReducer from './reducers/infoReducer'
import blogReducer from './reducers/blogReducer'

const reducer = combineReducers({
    info: infoReducer,
    blogs: blogReducer
})

const store = createStore(reducer)

const renderApp = () => ReactDOM.render(<App store={store} />, document.getElementById('root'))

renderApp()
store.subscribe(renderApp)
