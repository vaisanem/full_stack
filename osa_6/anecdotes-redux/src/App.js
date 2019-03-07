import React from 'react'
import Form from './components/anecdoteForm'

const App = ({ store }) => {
  let anecdotes = store.getState()
  
  const vote = (id) => {
    console.log('vote', id)
    store.dispatch({
      type: 'VOTE',
      id: id
    })
  }
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <Form store = {store} />
    </div>
  )
}

export default App
