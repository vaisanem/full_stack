const filterAction = (anecdotes, word) => {
  return {
    type: 'FILTER',
    anecdotes: anecdotes,
    word: word
  }
}

const reducer = (state = {}, action) => {
  switch(action.type) {
    case 'FILTER': {
      return {
        anecdotes: action.anecdotes.filter(one => one
          .content.toLowerCase()
          .includes(action.word.toLowerCase())
        ),
        word: action.word
      }
    } 
    default: return state
  }
}

export default reducer
export { filterAction }