import { Column, Row } from '@/components'
import React from 'react'
import styled from 'styled-components'
import { Input } from './styled'

interface IProps {
  type: string
  placeholder?: string
  name: string
  validationError?: boolean
  value?: string
  labelText?: string | null
  disabled?: boolean
  margin?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Label = styled.label`
  width: 100%;
  text-align: start;
  margin-bottom: 0.4rem;
`

const InputRegular: React.FC<IProps> = ({
  placeholder,
  value,
  name,
  type,
  labelText,
  disabled = false,
  validationError = false,
  margin,
  onChange
}) => {
  return (
    <Column margin={margin}>
      {labelText && <Label>{labelText}</Label>}
      <Input
        validationError={validationError}
        onChange={onChange}
        value={value}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
      />
    </Column>
  )
}

export default InputRegular
