import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'

import App from './App'
import blogService from './services/blogs'
import infoReducer from './reducers/infoReducer'
import blogReducer, { initBlogs } from './reducers/blogReducer'
import userReducer, { setUser } from './reducers/userReducer'

const reducer = combineReducers({
  info: infoReducer,
  blogs: blogReducer,
  user: userReducer
})

const store = createStore(reducer)

blogService.getAll().then(blogs =>
  store.dispatch(initBlogs(blogs))
)
store.dispatch(setUser(JSON.parse(window.localStorage.getItem('loggedUser'))))

const renderApp = () => ReactDOM.render(<App store={store} />, document.getElementById('root'))

renderApp()
store.subscribe(renderApp)
