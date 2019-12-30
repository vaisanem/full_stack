import React from 'react'
import { connect } from 'react-redux'

import { addingAction } from '../reducers/anecdoteReducer'
import { setInfoAction, resetInfoAction } from '../reducers/infoReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.addingAction(anecdote)
    props.setInfoAction(`you added '${anecdote}'`, 5)
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

const mapDispatchToProps = {
  addingAction,
  setInfoAction,
  resetInfoAction
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)