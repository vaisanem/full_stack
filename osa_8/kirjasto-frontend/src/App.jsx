import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { gql, useQuery } from '@apollo/client'
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const ALL_AUTHORS = gql`
  query { 
    allAuthors {
      name, 
      born, 
      bookCount
    }
  }
 `

const App = () => {
  const [page, setPage] = useState("authors")
  const authors = useQuery(ALL_AUTHORS)

   /*
  client.query({ query })
    .then((response) => {
      console.log(response.data)
   })
   */

  return (
    <>
      <div>
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

        <Books show={page === "books"} />

        <NewBook show={page === "add"} />
      </div>
    </>
  )
}

export default App
