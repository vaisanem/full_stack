import React from 'react'

const Info = ({ message} ) => {
  if (message === null) return <></>

  return (
    <div className='info'>
      <p> {message} </p>
    </div>
  )

}

export default Info