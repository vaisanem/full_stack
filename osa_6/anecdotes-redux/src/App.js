import React from 'react'
import Form from './components/AnecdoteForm'
import List from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = ({ store }) => {
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification store = {store} />
      <Filter store = {store} />
      <List store = {store} />
      <Form store = {store} />
    </div>
  )
}

export default App