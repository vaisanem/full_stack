import React, { useState } from 'react'
import PropTypes from 'prop-types'

import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser, resetUser } from '../reducers/userReducer'

const Login = ({ store, showInfo }) => {

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    const account = {
      username: username,
      password: password
    }
    try {
      const user = await loginService.login(account)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      store.dispatch(setUser(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch(error) {
      showInfo('käyttäjätunnus tai salasana virheellinen')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    store.dispatch(resetUser())
    blogService.setToken(null)
  }

  if (store.getState().user) {
    return (
      <div>
        <p>{store.getState().user.username} kirjautuneena</p>
        <button type='submit' onClick={handleLogout}>kirjaudu ulos</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Kirjaudu</h2>

      <form onSubmit={handleLogin}>
        <div>
          käyttäjätunnus
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          salasana
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>

    </div>
  )
}

Login.propTypes = {
  store: PropTypes.object.isRequired,
  showInfo: PropTypes.func.isRequired
}

export default Login