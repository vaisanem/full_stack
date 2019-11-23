import anecdoteService from '../services/anecdoteService'

const votingAction = (anecdote) => {
  return (dispatch, getState) => {
    anecdote.votes++
    anecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      anecdotes: getState()
        .anecdotes
        .filter(one => one.id !== anecdote.id)
        .concat(anecdote)
        .sort(votesDescending)
    })
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
    const anecdotes = await anecdoteService.getAll()
    dispatch({ 
      type: 'INIT',
      anecdotes: anecdotes.sort(votesDescending)
    })
  }
}

const votesDescending = (a, b) => {
  return b.votes - a.votes
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'INIT':
      return action.anecdotes
    case 'VOTE': 
      return action.anecdotes
    case 'ADD': 
      return state
        .concat(action.anecdote)
    default: 
      return state
  }
  
}

export default reducer
export { votingAction, addingAction, initAction }