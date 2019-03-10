import React from 'react'
import { addingAction } from '../reducers/anecdoteReducer'

const anecdoteForm = ({ store }) => {

  const addAnecdote = (event) => {
    event.preventDefault()
    store.dispatch(addingAction(event.target.anecdote.value))
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        your anecdote
        <input type='text' name='anecdote'/>
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default anecdoteForm