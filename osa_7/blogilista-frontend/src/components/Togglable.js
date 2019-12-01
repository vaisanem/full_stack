import React, { useState } from 'react'

const Togglable = ( props ) => {

  const [ visible, setVisible ] = useState(props.init)

  if (!visible) {

    return (
      <div>
        <button onClick={() => setVisible(true)}>{props.label}</button>
      </div>
    )
  }

  return (
    <div>
      {props.children}
      <button onClick={() => setVisible(false)}>peruuta</button>
    </div>
  )
}

export default Togglable