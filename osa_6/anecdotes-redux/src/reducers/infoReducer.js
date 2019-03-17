const startState = {
  message: '',
  reset: null
}

const setInfoAction = (message, reset) => {
  return {
    type: 'SET_INFO',
    message: message,
    reset: reset
  }
}

const resetInfoAction = () => {
  return {
    type: 'RESET_INFO',
  }
}

const reducer = (state = startState, action) => {
  switch(action.type) {
    case 'SET_INFO': {
      return {
        message: action.message,
        reset: action.reset
      }  
    }  
    case 'RESET_INFO': return startState
    default: return state
  }
}

export default reducer
export { setInfoAction, resetInfoAction }