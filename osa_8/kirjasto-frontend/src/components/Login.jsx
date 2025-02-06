import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = ({ show, setPage, setToken }) => {

  const [login] = useMutation(LOGIN)

  if (!show) return null

  const submit = async (event) => {
    event.preventDefault()

    const { data } = await login({ variables: { username: event.target.username.value, password: event.target.password.value } })

    //!data.login ? setPage("login") : null

    if (data.login.value) {
      const token = data.login.value
      console.log(localStorage.getItem('kirjasto-user-token'))
      localStorage.setItem('kirjasto-user-token', token)
      setToken(token)
      console.log(token)
      setPage("books")
    }
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            type="text"
            name="username"
            autoComplete="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="password"
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  )

}

export default Login