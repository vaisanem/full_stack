const setUser = (user) => {
  return {
    type: 'SET_USER',
    user: user
  }
}

const resetUser = () => {
  return {
    type: 'RESET_USER'
  }
}

const reducer = (state = null, action) => {
  switch(action.type) {
  case 'SET_USER':
    return action.user
  case 'RESET_USER':
    return null
  default:
    return state
  }
}

export default reducer
export { setUser, resetUser }