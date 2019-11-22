import React from 'react'

const Info = ({ info }) => {
  if (!info) return <></>

  return (
    <div className={info.type}>
      <p> {info.message} </p>
    </div>
  )

}

export default Info