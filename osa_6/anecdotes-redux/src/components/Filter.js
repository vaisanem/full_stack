import React from 'react'
import { filterAction } from '../reducers/filterReducer'

const Filter = ({ store }) => {
  const handleChange = (event) => {
    store.dispatch(filterAction(store.getState().anecdotes, event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter