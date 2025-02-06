import {useQuery } from '@apollo/client'
import BookTable from './BookTable'
import { CURRENT_USER } from '../queries'

const Recommend = ({ show, books }) => {
  const user = useQuery(CURRENT_USER, {
    skip: !show
  })

  if (!show) return null

  if (user.loading) return <div>loading...</div>

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        <span>Books in your favorite genre </span><strong>{user.data.me.favouriteGenre}</strong>
      </p>
      <BookTable books={books.filter(b => b.genres.includes(user.data.me.favouriteGenre))} />
    </div>
  )
}

export default Recommend