const ExtendedMenu = ({ token, setToken, setPage }) => {

  const logOut = () => {
    setToken(null)
    setPage("books")
  }

  if (token) {
    return (
      <div>
        <button onClick={() => setPage("add")}>Add book</button>
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