import React from 'react'
import { connect } from 'react-redux'
import { addingAction } from '../reducers/anecdoteReducer'
import { setInfoAction, resetInfoAction } from '../reducers/infoReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = (event) => {
    event.preventDefault()
    props.addingAction(event.target.anecdote.value)
    clearTimeout(props.info.reset)
    const reset = setTimeout(() => props.resetInfoAction(), 5000)
    props.setInfoAction(`you added '${event.target.anecdote.value}'`, reset)
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

const mapStateToProps = (state) => {
  return {
    info: state.info
  }
}

const mapDispatchToProps = {
  addingAction,
  setInfoAction,
  resetInfoAction
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)