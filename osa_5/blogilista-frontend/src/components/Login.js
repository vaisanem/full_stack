import React, { useState } from 'react'
import loginService from '../services/login'
import PropTypes from 'prop-types'

const Login = ({ setUser, showInfo }) => {

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
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(error) {
      showInfo('käyttäjätunnus tai salasana virheellinen')
    }
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
  setUser: PropTypes.func.isRequired,
  showInfo: PropTypes.func.isRequired
}

export default Login