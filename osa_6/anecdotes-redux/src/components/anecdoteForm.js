import React from 'react'

const anecdoteForm = ({ listener }) => {

  return (
    <div>
      <form onSubmit={listener}>
        your anecdote
        <input type='text' name='anecdote'/>
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default anecdoteForm