import React from 'react'
import { addingAction } from '../reducers/anecdoteReducer'
import { setInfoAction, resetInfoAction } from '../reducers/infoReducer'

const AnecdoteForm = ({ store }) => {

  const addAnecdote = (event) => {
    event.preventDefault()
    store.dispatch(addingAction(event.target.anecdote.value))
    clearTimeout(store.getState().info.reset)
    const reset = setTimeout(() => store.dispatch(resetInfoAction()), 5000)
    store.dispatch(setInfoAction(`you added '${event.target.anecdote.value}'`, reset))
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

export default AnecdoteForm