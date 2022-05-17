import colors from '@/constants/colors'
import { RowStyled } from '@/shared'
import styled from 'styled-components'
import { IStyledProps } from './types'

export const Container = styled(RowStyled)<IStyledProps>`
  border: 1px solid ${({ validationError }) => (validationError ? colors.red.primary : colors.black.dark)};
  color: ${({ validationError }) => (validationError ? colors.red.primary : colors.black.dark)};
  margin-bottom: 0.5rem;
  transition: all 0.4s ease-in-out;
  border-radius: 0.3rem;
  font-weight: 300;

  &:hover {
    border: 1px solid ${colors.text.primary};
  }

  &:focus-within {
    border: 1px solid ${colors.text.primary};
    color: ${colors.text.primary};
  }
`
export const Input = styled.input<Pick<IStyledProps, 'validationError'>>`
  color: ${({ validationError }) => (validationError ? colors.red.primary : colors.black.dark)};
  width: 100%;
  height: 30px;
  background-color: transparent;
  outline: none;
  padding: 0.2rem 0.4rem;
  margin-bottom: 0.3rem;
  transition: all 0.4s ease-in-out;
  font-weight: 400;
  font-family: 'Satoshi-Variable';

  &:focus {
    color: ${colors.text.primary};
  }

  &::placeholder {
    color: ${colors.text.primary};
  }
`
export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin-bottom: 0.3rem;
`
