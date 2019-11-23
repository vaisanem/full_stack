import anecdoteService from '../services/anecdoteService'

const votingAction = (id) => {
  return {
    type: 'VOTE',
    id: id
  }
}

const addingAction = (anecdote) => {
  return async (dispatch) => {
    dispatch({ 
      type: 'ADD',
      anecdote: await anecdoteService.add(anecdote)
    })
  }
}

const initAction = () => {
  return async (dispatch) => {
    dispatch({ 
      type: 'INIT',
      anecdotes: await anecdoteService.getAll()
    })
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
      return action.anecdotes
    case 'VOTE': 
      return vote(state, action)
    case 'ADD': 
      return state
        .concat(action.anecdote)
    default: 
      return state
  }
  
}

export default reducer
export { votingAction, addingAction, initAction }