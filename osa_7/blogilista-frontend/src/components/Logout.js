import React from 'react'

import blogService from '../services/blogs'
import { resetUser } from '../reducers/userReducer'

const Logout = ({ store }) => {
  const listener = () => {
    window.localStorage.removeItem('loggedUser')
    store.dispatch(resetUser())
    blogService.setToken(null)
  }

  return (
    <button type='submit' onClick={listener}>kirjaudu ulos</button>
  )
}

export default Logout