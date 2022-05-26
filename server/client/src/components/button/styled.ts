import colors from '@constants/colors'
import styled from 'styled-components'
import { IProps } from './types'

export const ButtonSC = styled.button<Pick<IProps, 'width' | 'height' | 'disabled' | 'color'>>`
  font-family: 'Chillax-Regular';
  cursor: ${({ disabled }) => (disabled ? 'disabled' : 'pointer')};
  padding: 0.4rem 0.6rem;
  border-radius: 0.3rem;
  transition: background 0.3s ease-in-out;
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : '100%')};
  color: ${colors.white.light};

  background-color: ${({ disabled, color }) =>
    disabled ? colors.gray.disabled : color ? color : colors.green.primary};
  border: 1px solid ${({ color }) => (color ? color : colors.green.primary)};

  &:hover {
    background-color: ${({ disabled, color }) =>
      disabled ? colors.gray.disabled : color ? color : colors.green.primary}50;
  }
`
