// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import colors from '@/constants/colors'
import { RowStyled } from '@/shared'
import styled from 'styled-components'
import { IStyledProps } from './types'

export const Container = styled(RowStyled)<IStyledProps>`
  border-bottom: 1px solid ${props => (props.validationError ? colors.red.primary : colors.text.normal)};
  color: ${props => (props.validationError ? colors.red.primary : colors.text.normal)};
  margin-bottom: 0.5rem;
  transition: all 0.4s ease-in-out;

  &:hover {
    border-bottom: 1px solid ${colors.yellow.primary};
  }

  &:focus-within {
    border-bottom: 1px solid ${colors.yellow.primary};
    color: ${colors.yellow.primary};
  }
`
export const Input = styled.input<Pick<IStyledProps, 'validationError'>>`
  color: ${props => (props.validationError ? colors.red.primary : colors.text.normal)};
  width: 100%;
  height: 40px;
  background-color: transparent;
  outline: none;
  padding: 0.2rem 0.4rem;
  margin-bottom: 0.3rem;
  transition: all 0.4s ease-in-out;

  &:focus {
    color: ${colors.yellow.primary};
  }
`
export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-bottom: 0.3rem;
`
