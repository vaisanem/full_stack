import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useQuery } from '@apollo/client'
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";

const App = () => {
  const [page, setPage] = useState("books")
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

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
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          <button onClick={() => setPage("add")}>add book</button>
        </div>

        <Authors show={page === "authors"} authors={authors} />

        <Books show={page === "books"} books={books} />

        <NewBook show={page === "add"} />
      </div>
    </>
  )
}

export default App
