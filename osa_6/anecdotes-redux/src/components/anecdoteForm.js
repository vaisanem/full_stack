import React from 'react'

const anecdoteForm = ({ store }) => {

  const addAnecdote = (event) => {
    event.preventDefault()
    store.dispatch({
      type: 'ADD',
      anecdote: event.target.anecdote.value
    })
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <form onSubmit={addAnecdote}>
        your anecdote
        <input type='text' name='anecdote'/>
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default anecdoteForm