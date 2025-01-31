import { useState } from 'react'
import Select from 'react-select'

const EditAuthor = ({ authors, editBirthyear, token }) => {

  const [birthyear, setBirthyear] = useState('')

  const nameOptions = authors.data.allAuthors.map((a) => ({
    value: a.name,
    label: a.name
  }));

  const submit = async (event) => {
    event.preventDefault()

    editBirthyear({ variables: { name: event.target.name.value, birthyear: parseInt(birthyear) } })
    setBirthyear('')
  }

  if (token === null) return null

  return (
    <div>
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

export default EditAuthor