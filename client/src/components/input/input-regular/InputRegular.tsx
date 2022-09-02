import React from 'react'
import colors from '@/constants/colors'
import { Column, ItemContainer, Label, Row } from '@components/index'
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
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

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
      {labelText && (
        <ItemContainer margin="0 0 0.4rem 0">
          <Label color={colors.text.primary}>{labelText}</Label>
        </ItemContainer>
      )}
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
