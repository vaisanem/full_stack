import React from 'react'
import { connect } from 'react-redux'

import { votingAction } from '../reducers/anecdoteReducer'
import { setInfoAction, resetInfoAction } from '../reducers/infoReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes.filter(one => one
    .content.toLowerCase()
    .includes(props.filter.toLowerCase())
  )  

  const vote = (anecdote) => {
    props.votingAction({ ...anecdote })
    props.setInfoAction(`you voted for '${anecdote.content}'`, 5)
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    info: state.info
  }
}

const mapDispatchToProps = {
  votingAction,
  setInfoAction,
  resetInfoAction
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)