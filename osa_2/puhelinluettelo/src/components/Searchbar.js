import React from 'react'

const Searchbar = ({ query, listener }) => {  

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