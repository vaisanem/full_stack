import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useQuery } from '@apollo/client'
import Menu from './components/Menu'
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Login from "./components/Login"
import Recommend from './components/Recommend'
import { ALL_BOOKS } from "./queries"

const App = () => {
  const [page, setPage] = useState("books")
  const [token, setToken] = useState(() => localStorage.getItem('kirjasto-user-token'))
  const books = useQuery(ALL_BOOKS)

  if (books.loading) return <div>loading...</div>

  const genreOptions = new Set(books.data.allBooks.flatMap(b => b.genres))

  return (
    <>
      <div style={{ padding: "30px" }}>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div>
        <Menu token={token} setToken={setToken} setPage={setPage} />

        <Authors show={page === "authors"} token={token} />

        <Books show={page === "books"} genreOptions={genreOptions} />

        <NewBook show={page === "add"} setPage={setPage} />

        <Login show={page === "login"} setPage={setPage} setToken={setToken} />

        <Recommend show={page === "recommend"} />
      </div>
    </>
  )
}

export default App
