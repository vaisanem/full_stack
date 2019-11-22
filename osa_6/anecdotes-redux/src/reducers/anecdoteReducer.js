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

const initAction = (anecdotes) => {
  return {
    type: 'INIT',
    anecdotes: anecdotes
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

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'INIT':
      return action.anecdotes.map(asObject)
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
export { votingAction, addingAction, initAction }