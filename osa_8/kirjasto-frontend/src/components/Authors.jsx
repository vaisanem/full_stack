import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR_BIRTHYEAR, ALL_AUTHORS } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [birthyear, setBirthyear] = useState('')
  const [editBirthyear] = useMutation(EDIT_AUTHOR_BIRTHYEAR, { refetchQueries: [{ query: ALL_AUTHORS }] })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    editBirthyear({ variables: { name, birthyear: parseInt(birthyear)} })
    setName('')
    setBirthyear('')
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
      <h4>Set birthyear</h4>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          birthyear
          <input
            type="number"
            value={birthyear}
            onChange={({ target }) => setBirthyear(target.value)}
          />
        </div>
        <button type="submit">Edit author</button>
      </form>
    </div>
  )
}

export default Authors