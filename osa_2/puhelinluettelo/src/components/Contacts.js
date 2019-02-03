import React from 'react'
import Contact from './Contact'

const Contacts = ({ persons, query }) => {
  const cropped = persons.filter( contact => 
    contact.name.toLowerCase().includes(query) 
    || contact.number.includes(query) 
  )

  return (
    cropped.map( 
      one => <Contact one = { one }/>
    )
  )  
}

export default Contacts