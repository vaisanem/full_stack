import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR_BIRTHYEAR, ALL_AUTHORS } from '../queries'
import Select from 'react-select';

const Authors = (props) => {

  const [birthyear, setBirthyear] = useState('')
  const [editBirthyear] = useMutation(EDIT_AUTHOR_BIRTHYEAR, { refetchQueries: [{ query: ALL_AUTHORS }] })

  if (!props.show) {
    return null
  }

  const nameOptions = props.authors.data.allAuthors.map((a) => ({
    value: a.name,
    label: a.name
  }));

  const submit = async (event) => {
    event.preventDefault()

    editBirthyear({ variables: { name: event.target.name.value, birthyear: parseInt(birthyear)} })
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
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div style={{ width: "100%", textAlign: "center" }}>
          name
          <br></br>
          <Select
            defaultValue={nameOptions[0]}
            options={nameOptions}
            name="name"
            className="react-select"
          />
        </div>
        <div>
          birthyear
          <br></br>
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