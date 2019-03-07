const initialState = {
  good: 0,
  ok: 0,
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
    case 'OK':
      newState.ok = newState.ok + 1
      return newState
    case 'BAD':
      newState.bad = newState.bad + 1
      return newState
    case 'ZERO':
      newState.good = newState.ok = newState.bad = 0
      return newState
    default: return newState
  }
  
}

export default counterReducer