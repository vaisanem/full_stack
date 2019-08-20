import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

const Shuffle = ({listener}) => {

  return (
    <button onClick={() => listener()}>
      next anecdote
    </button>
  )
}

const Vote = ({listener}) => {

  return (
    <button onClick={() => listener()}>
      vote
    </button>
  )
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([])
  const [top, setTop] = useState(0)

  useEffect(() => {
    const init = anecdotes.map(() => 0)
    setVotes(init)
  }, [])

  const shuffleListener = () => {
    const index = Math.floor(Math.random() * anecdotes.length)
    setSelected(index)
  }
  const voteListener = () => {
    const updated = [].concat(votes)
    updated[selected] = updated[selected] + 1
    let index = updated.indexOf(updated[top] + 1)
    index = (index >= 0) ? index : top
    setVotes(updated)
    setTop(index)
  }

  return (
    <>
      <div>
        <h2>Anecdote of the day</h2>
        {anecdotes[selected]}
        <br></br>
        has {votes[selected]} votes
        <br></br>
        <Vote listener = {voteListener}/>
        <Shuffle listener = {shuffleListener}/>
      </div>
      <div>
        <h2>Anecdote with the most votes</h2>
        {anecdotes[top]}
        <br></br>
        has {votes[top]} votes
      </div>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)