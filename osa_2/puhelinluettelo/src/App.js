import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Searchbar from './components/Searchbar'
import Contacts from './components/Contacts'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ query, setQuery ] = useState("")

  const getContacts = () => {
    axios
      .get("http://localhost:3001/persons")
      .then( response => setPersons(response.data))
  }

  const addContact = (event) => {
    event.preventDefault()
    if (!checkIfExists()) {
      const person = {
        name: newName,
        number: newNumber
      }
      axios
        .post("http://localhost:3001/persons", person)
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
    }
  }

  useEffect(getContacts, [])

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleQueryChange = (event) => setQuery(event.target.value.toLowerCase())

  const checkIfExists = () => {
    const present = persons.filter( one => one.number === newNumber )
    if (present.length === 1) {
      alert(`${newNumber} on jo luettelossa`)

      return true
    }

    return false
  } 

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Searchbar query = { query } listener = { handleQueryChange }/>
      <h4>Lisää uusi yhteystieto</h4>
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
      <ul> <Contacts persons = { persons } query = { query }/> </ul>
    </div>
  )

}

export default App