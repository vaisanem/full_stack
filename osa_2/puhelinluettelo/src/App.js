import React, { useState, useEffect } from 'react'
import Searchbar from './components/Searchbar'
import Contacts from './components/Contacts'
import contactService from './services/contacts'
import Info from './components/Info'

const App = () => {
  const [ contacts, setContacts] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ query, setQuery ] = useState("")
  const [ info, setInfo ] = useState(null)

  const getContacts = () => {
    contactService
      .getAll()
      .then( response => setContacts(response.data))
  }

  const addContact = (event) => {
    event.preventDefault()
    const found = checkIfExists()
    const contact = {
      name: newName,
      number: newNumber
    }
    if (!found) {
      contactService
        .create(contact)
        .then(response => {
            setContacts(contacts.concat(response.data))
            setNewName('')
            setNewNumber('')
            displayInfo("Yhteystieto lisätty.")
          },
          error => {
            displayInfo(error.response.data.error)
          }
        )
    } else replaceContact(found.id, contact)  
  }

  const replaceContact = (id, contact) => {
    const confirm = window.confirm(
      `${contact.number} on jo luettelossa, korvataanko nimitiedoksi ${contact.name}?`
    )
    if (confirm) {
      contactService
        .update(id, contact)
        .then(response => {
          const filtered = contacts.filter(
            one => one.id !== id
          )
          setContacts(filtered.concat(response.data))
          displayInfo("Yhteystieto päivitetty.")
        })
    }
  }

  const deleteContact = (contact) => {
    const confirm = window.confirm(
      `Poistetaanko ${contact.name} yhteystiedoista?`
    )
    if (confirm) {
      contactService.remove(contact.id)
      const filtered = contacts.filter(
        one => one.id !== contact.id
      )
      setContacts(filtered)
      displayInfo("Yhteystieto poistettu.")
    }
  }

  useEffect(getContacts, [])

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleQueryChange = (event) => setQuery(event.target.value.toLowerCase())

  const checkIfExists = () => {
    return contacts.find( one => one.number === newNumber )
  }
  
  const displayInfo = (message) => {
    setInfo(message)
    setTimeout(() => {
      setInfo(null)
    }, 5000)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Info message={ info }/>
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
      <ul>
        <Contacts contacts = {contacts} query = {query} action = {deleteContact}/>
      </ul>
    </div>
  )

}

export default App
