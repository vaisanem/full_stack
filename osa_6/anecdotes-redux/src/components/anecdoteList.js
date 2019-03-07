import React from 'react'

const anecdoteList = ({ store }) => {
  const anecdotes = store.getState()

  const vote = (id) => {
    console.log('vote', id)
    store.dispatch({
      type: 'VOTE',
      id: id
    })
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

export default anecdoteList