import colors from '@constants/colors'
import styled from 'styled-components'
import { IProps } from './types'

export const ButtonSC = styled.button<Pick<IProps, 'width' | 'height'>>`
  font-family: 'Chillax-Regular';
  cursor: pointer;
  padding: 0.4rem 0.6rem;
  border-radius: 0.3rem;
  border: 1px solid ${colors.green.primary};
  background-color: ${colors.green.primary};
  color: ${colors.white.light};
  transition: background 0.3s ease-in-out;

  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : '100%')};
  &:hover {
    background-color: ${colors.blue.primary};
  }
`
