import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "0123456789" }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addContact = (event) => {
    event.preventDefault()
    if (!checkIfExists()) {
      const person = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const checkIfExists = () => {
    const present = persons.filter( one => one.number === newNumber )
    if (present.length === 1) {
      alert(`${newNumber} on jo luettelossa`)

      return true
    }

    return false
  }

  const renderContacts = () => persons.map( 
    one => <p key={one.number}> {one.name} {one.number} </p> 
  )

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={ addContact }>
        <div>
          nimi: <input 
            value={ newName }
            onChange={ handleNameChange } 
          />
        </div>
        <div>
          numero: <input 
            value={ newNumber }
            onChange={ handleNumberChange } 
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