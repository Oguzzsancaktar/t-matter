import colors from '@constants/colors'
import styled from 'styled-components'
import { IProps } from './types'

export const ButtonSC = styled.button<Pick<IProps, 'width' | 'height' | 'disabled' | 'color' | 'padding'>>`
  cursor: ${({ disabled }) => (disabled ? 'disabled' : 'pointer')};
  border-radius: 0.3rem;
  transition: background 0.3s ease-in-out;
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : '100%')};
  padding: ${({ padding }) => (padding ? padding : '0.2rem 0.6rem')};
  cursor: pointer;
  color: ${colors.white.light};
  font-size: 16px;

  background-color: ${({ disabled, color }) =>
    disabled ? colors.gray.disabled : color ? color : colors.green.primary};
  border: 1px solid ${({ color }) => (color ? color : colors.green.primary)};

  &:hover {
    background-color: ${({ disabled, color }) =>
      disabled ? colors.gray.disabled : color ? color : colors.green.primary}BB;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ disabled }) => disabled && colors.gray.disabled};
  }
`
