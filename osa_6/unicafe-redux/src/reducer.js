const initialState = {
  good: 0,
  neutral: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  const newState = {
    ...state
  }
  switch (action.type) {
    case 'GOOD':
      newState.good = newState.good + 1
      return newState
    case 'NEUTRAL':
      newState.neutral = newState.neutral + 1
      return newState
    case 'BAD':
      newState.bad = newState.bad + 1
      return newState
    case 'RESET':
      newState.good = newState.neutral = newState.bad = 0
      return newState
    default: return newState
  }
  
}

export default counterReducer