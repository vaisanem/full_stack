import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'

import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'

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

  return (
    <div>
      <h3>Kirjaudu</h3>
      <Form style={{ width: '25em' }} onSubmit={handleLogin}>
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
          <button type="submit" style={{ marginTop: '5px' }}>kirjaudu</button>
      </Form>
    </div>
  )
}

Login.propTypes = {
  store: PropTypes.object.isRequired,
  showInfo: PropTypes.func.isRequired
}

export default Login