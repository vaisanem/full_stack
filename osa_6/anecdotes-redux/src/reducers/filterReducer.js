const filterAction = (filter) => {
  return {
    type: 'FILTER',
    filter: filter
  }
}

const reducer = (state = '', action) => {
  switch(action.type) {
    case 'FILTER': return action.filter
    default: return state
  }
}

export default reducer
export { filterAction }