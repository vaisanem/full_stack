import React from 'react'
import { votingAction } from '../reducers/anecdoteReducer'
import { setInfoAction, resetInfoAction } from '../reducers/infoReducer'

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState().filter.anecdotes

  const vote = (id) => {
    console.log('vote', id)
    store.dispatch(votingAction(id))
    const anecdote = anecdotes.find(one => one.id === id)
    clearTimeout(store.getState().info.reset)
    const reset = setTimeout(() => store.dispatch(resetInfoAction()), 5000)
    store.dispatch(setInfoAction(`you voted for '${anecdote.content}'`, reset))
  }

  return (
    <div>
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
    </div>
  )
}

export default AnecdoteList