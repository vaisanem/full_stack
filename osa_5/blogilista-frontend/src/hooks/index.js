import { useState } from 'react'

const useField = (type) => {

  const [ field, setField ] = useState('')

  const onChange = (event) => setField(event.target.value)

  const reset = () => setField('')

  return {
    type: type,
    value: field,
    onChange: onChange,
    reset: reset
  }
}

export default useField