const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const votingAction = (id) => {
  return {
    type: 'VOTE',
    id: id
  }
}

const addingAction = (anecdote) => {
  return {
    type: 'ADD',
    anecdote: anecdote
  }
}

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const votesDescending = (a, b) => {
  return b.votes - a.votes
}

const initialState = anecdotesAtStart.map(asObject)

const vote = (state, action) => {
  const anecdote = state.find(one => one.id === action.id)

  switch(anecdote) {
    case undefined:
      return state
    default:
      const anecdotes = [ ...state ]
      const i = anecdotes.indexOf(anecdote)
      anecdotes[i].votes++
      return anecdotes.sort(votesDescending)
  }
}

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'VOTE': 
      return vote(state, action)
    case 'ADD': 
      return state
        .concat(asObject(action.anecdote))
        .sort(votesDescending)
    default: 
      return state
  }
  
}

export default reducer
export { votingAction, addingAction }