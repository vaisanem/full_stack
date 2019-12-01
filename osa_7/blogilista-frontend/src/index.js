import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

import App from './App'
import infoReducer from './reducers/infoReducer'

const store = createStore(infoReducer)

const renderApp = () => ReactDOM.render(<App store={store} />, document.getElementById('root'))

renderApp()
store.subscribe(renderApp)
