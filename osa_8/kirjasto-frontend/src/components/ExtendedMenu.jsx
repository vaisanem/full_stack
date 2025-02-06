const ExtendedMenu = ({ token, logOut, setPage }) => {

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