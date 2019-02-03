import React from 'react'

const Contact = ({ one }) => 
  <p key={ one.number }>
    { one.name } { one.number }
  </p>

export default Contact