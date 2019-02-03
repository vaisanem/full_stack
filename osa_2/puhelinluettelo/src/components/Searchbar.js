import React from 'react'

const Searchbar = ({ text, query, listener }) => {  

  return (
    <div>
      rajaa: <input
        value={ query }
        onChange={ listener }
        autoFocus
      />
    </div>
  )  
}

export default Searchbar