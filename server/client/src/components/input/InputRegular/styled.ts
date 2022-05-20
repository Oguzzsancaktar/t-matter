import colors from '@constants/colors'
import styled from '@emotion/styled'
import { IStyledProps } from './types'

export const Input = styled.input<IStyledProps>`
  width: 100%;
  height: 35px;
  border: 1px solid ${({ validationError }) => (validationError ? colors.red.primary : colors.black.light)};
  background-color: transparent;
  transition: border 0.3s ease-in-out;
  outline: none;
  padding: 0rem 0.4rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  font-weight: 400;
  font-family: 'Satoshi-Variable';
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
