import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
    }
  }

  useEffect(getContacts, [])

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

  const Searchbar = () => {
    const handleQueryChange = (event) => {
      const search = event.target.value.toLowerCase().trim()
      setQuery(search)
    }  

    return (
      <div>
        rajaa yhteystietoja: <input
          value={ query }
          onChange={ handleQueryChange }
          autoFocus
        />
      </div>
    )  
  }

  const Contacts = () => {
    const cropped = persons.filter( contact => 
      contact.name.toLowerCase().includes(query) 
      || contact.number.includes(query) 
    )

    return (
      cropped.map( 
        one => <p key={one.number}> {one.name} {one.number} </p> 
      )
    )  
  }  

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Searchbar/>
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
      <ul> <Contacts/> </ul>
    </div>
  )

}

export default App