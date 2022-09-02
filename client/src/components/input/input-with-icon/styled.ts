import colors from '@constants/colors'
import { RowStyled } from '@shared/index'
import styled from 'styled-components'
import { IStyledProps } from './types'

export const Container = styled(RowStyled)<IStyledProps>`
  border: 1px solid ${({ validationError }) => (validationError ? colors.red.primary : colors.gray.disabled)};
  color: ${({ validationError }) => (validationError ? colors.red.primary : colors.gray.dark)};
  transition: all 0.4s ease-in-out;
  border-radius: 0.3rem;
  font-weight: 300;
  overflow: hidden;
  &:hover {
    border: 1px solid ${colors.text.primary};
  }

  &:focus-within {
    border: 1px solid ${colors.text.primary};
    color: ${colors.text.primary};
  }
`
export const Input = styled.input<Pick<IStyledProps, 'validationError' | 'disabled'>>`
  color: ${({ validationError }) => (validationError ? colors.red.primary : colors.gray.dark)};
  width: 100%;
  height: 35px;
  background-color: transparent;
  outline: none;
  padding: 0.2rem 0.4rem;
  transition: all 0.4s ease-in-out;
  font-weight: 400;
  font-family: 'Satoshi-Variable';

  &:focus {
    color: ${colors.text.primary};
  }

  &:disabled {
    background-color: ${colors.gray.disabled};
  }

  &::placeholder {
    color: ${colors.text.primary};
  }
`
export const IconContainer = styled.div<Pick<IStyledProps, 'validationError' | 'disabled'>>`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-right: 1px solid ${({ validationError }) => (validationError ? colors.red.primary : colors.gray.disabled)};
  background-color: ${({ disabled }) => disabled && colors.gray.disabled};
  transition: all 0.4s ease-in-out;
`
