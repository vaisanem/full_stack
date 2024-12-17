import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR_BIRTHYEAR, ALL_AUTHORS } from '../queries'
import Select from 'react-select';

const Authors = (props) => {

  const [nameOption, setNameOption] = useState(null)
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

    editBirthyear({ variables: { name: nameOption.value, birthyear: parseInt(birthyear)} })
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
          <Select
            defaultValue={nameOptions[0]}
            onChange={setNameOption}
            options={nameOptions}
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