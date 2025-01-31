import {useApolloClient} from '@apollo/client'

const ExtendedMenu = ({ token, setToken, setPage }) => {

  const client = useApolloClient()

  const logOut = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage("books")
  }

  if (token) {
    return (
      <div>
        <button onClick={() => setPage("add")}>Add book</button>
        <button onClick={() => setPage("recommend")}>Recommendations</button>
        <button onClick={() => logOut()}>Log out</button>
      </div>
    )
  }

  return (
    <div>
      <button onClick={() => setPage("login")}>Log in</button>
    </div>
  )
}

export default ExtendedMenu