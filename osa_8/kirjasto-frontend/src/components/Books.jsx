import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import BookTable from './BookTable'

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

      <span>{genre ? `in genre ${genre}` : ''}</span>
      <BookTable books={books.data.allBooks} />
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