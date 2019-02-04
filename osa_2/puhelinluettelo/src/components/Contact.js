import React from 'react'

const Contact = ({ one, action }) => {

  const Button = ( {action} ) => {

    return (
      <button onClick={ action }> poista </button>
    )
  }

  return (
    <p>
      { one.name } { one.number } <Button action = {action} />
    </p>
  )
}  

export default Contact