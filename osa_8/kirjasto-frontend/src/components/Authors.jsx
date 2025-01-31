import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR_BIRTHYEAR, ALL_AUTHORS } from '../queries'
import EditAuthor from './EditAuthor'

const Authors = (props) => {

  const [editBirthyear] = useMutation(EDIT_AUTHOR_BIRTHYEAR, { refetchQueries: [{ query: ALL_AUTHORS }] })

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {props.authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditAuthor authors={props.authors} editBirthyear={editBirthyear} token={props.token} />
    </div>
  )
}

export default Authors