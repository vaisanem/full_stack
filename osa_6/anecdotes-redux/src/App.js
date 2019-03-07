import React from 'react'
import Form from './components/anecdoteForm'
import List from './components/anecdoteList'

const App = ({ store }) => {
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <List store = {store} />
      <Form store = {store} />
    </div>
  )
}

export default App
