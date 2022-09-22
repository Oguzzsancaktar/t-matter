import React from 'react'
import colors from '@constants/colors'
import styled from 'styled-components'
import { IStyledProps } from '../input-regular/types'
import { Column, ItemContainer, Label } from '@/components'

interface IProps {
  placeholder?: string
  name: string
  validationError?: boolean
  value?: string
  labelText?: string | null
  disabled?: boolean
  margin?: string
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined
  rows?: number
}

const TextAreaStyled = styled.textarea<IStyledProps>`
  width: 100%;
  border: 1px solid ${({ validationError }) => (validationError ? colors.red.primary : colors.gray.disabled)};
  background-color: transparent;
  transition: border 0.3s ease-in-out;
  outline: none;
  padding: 0.4rem;
  border-radius: 0.3rem;
  font-weight: 400;
  &:hover,
  &:focus {
    border-color: ${colors.text.primary};
  }

  &:disabled {
    background-color: ${colors.gray.disabled};
  }

  &::placeholder {
    color: ${colors.text.primary};
  }
`

const TextArea: React.FC<IProps> = ({
  placeholder,
  value,
  name,
  labelText,
  disabled = false,
  validationError = false,
  margin,
  onChange,
  rows = 3
}) => {
  return (
    <Column margin={margin}>
      {labelText && (
        <ItemContainer margin="0 0 0.4rem 0">
          <Label color={colors.text.primary}>{labelText}</Label>
        </ItemContainer>
      )}
      <TextAreaStyled
        validationError={validationError}
        onChange={onChange}
        value={value}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
      />
    </Column>
  )
}

export default TextArea
