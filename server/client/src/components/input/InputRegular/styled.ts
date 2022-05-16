// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import colors from '@/constants/colors'
import styled from 'styled-components'
import { IStyledProps } from './types'

export const Input = styled.input<IStyledProps>`
  width: 100%;
  height: 40px;
  border: 1px solid ${props => (props.validationError ? colors.red.primary : colors.text.normal)};
  background-color: transparent;
  transition: border 0.3s ease-in-out;
  outline: none;
  padding: 0.2rem 0.4rem;
  border-radius: 0.5rem;
  margin-bottom: 0.3rem;
  &:hover,
  &:focus {
    border-color: ${colors.yellow.primary};
  }
`
