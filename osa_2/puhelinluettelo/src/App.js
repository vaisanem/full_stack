import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addContact = (event) => {
    event.preventDefault()
    const person = {
      name: newName
    }
    setPersons(persons.concat(person))
    setNewName('')
  }

  const handleInputChange = (event) => setNewName(event.target.value)

  const renderContacts = () => persons.map( one => <p key={one.name} > {one.name} </p> )

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={ addContact }>
        <div>
          nimi: <input 
            value={ newName }
            onChange={ handleInputChange } 
          />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      <ul> { renderContacts() } </ul>
    </div>
  )

}

export default App