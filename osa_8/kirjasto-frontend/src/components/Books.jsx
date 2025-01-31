import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ show, genreOptions }) => {

  const books = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState(null)

  if (!show) {
    return null
  }

  if (books.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>Books</h2>

      <div>{genre ? `in genre ${genre}` : ''}</div>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {[...genreOptions].map((g) => (
          <button key={g} onClick={() => {
            setGenre(g)
            books.refetch({ genre: g })
          }}>{g}</button>
        ))}
      </div>
    </div>
  )
}

export default Books