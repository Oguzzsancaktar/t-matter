import colors from '@/constants/colors'
import { IComponentProps } from '@/models'
import React from 'react'
import styled from 'styled-components'

interface ButtonProps extends IComponentProps {
  bgColor?: string
  onClick?: (a?: any, b?: any) => void
}

const ButtonContainer = styled.div<ButtonProps>`
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : 'auto')};
  margin: ${({ margin }) => (margin ? margin : '0')};
  padding: ${({ padding }) => (padding ? padding : '0')};
  background-color: ${({ bgColor }) => (bgColor ? bgColor : colors.black.middle)};
  cursor: pointer;
  border-radius: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const IconButton: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return <ButtonContainer {...rest}>{children}</ButtonContainer>
}

export default IconButton
