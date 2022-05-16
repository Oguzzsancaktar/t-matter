import React from 'react'
import { Input } from './styled'

interface Props {
  type: string
  placeholder: string
  name: string
  validationError?: boolean
  value?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputRegular: React.FC<Props> = ({ placeholder, value, name, type, validationError = false, onChange }) => {
  return (
    <Input
      validationError={validationError}
      onChange={onChange}
      value={value}
      name={name}
      type={type}
      placeholder={placeholder}
    />
  )
}

export default InputRegular
