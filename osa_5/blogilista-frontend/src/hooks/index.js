import { useState } from 'react'

const useField = (type) => {

  const [ field, setField ] = useState('')

  const onChange = (event) => setField(event.target.value)

  return {
    type: type,
    value: field,
    onChange: onChange
  }
}

export default useField