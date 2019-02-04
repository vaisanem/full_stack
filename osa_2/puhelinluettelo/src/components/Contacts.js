import React from 'react'
import Contact from './Contact'

const Contacts = ({ contacts, query }) => {
  const filtered = contacts.filter( contact => 
    contact.name.toLowerCase().includes(query) 
    || contact.number.includes(query) 
  )

  return (
    filtered.map( 
      one => <Contact key = { one.id } one = { one }/>
    )
  )  
}

export default Contacts