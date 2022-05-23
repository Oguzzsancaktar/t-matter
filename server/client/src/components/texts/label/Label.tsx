import colors from '@/constants/colors'
import React from 'react'
import styled from 'styled-components'

interface IProps {
  color?: string
  children?: React.ReactNode
  cursorType?: string
  onClick?: (a?: any) => void
}
const LabelStyled = styled.label<IProps>`
  cursor: ${({ cursorType }) => cursorType && cursorType};
  color: ${({ color }) => (color ? color : colors.orange.primary)};
  width: 100%;
  text-align: left;
`
const Label: React.FC<IProps> = ({ children, ...rest }) => {
  return <LabelStyled {...rest}>{children}</LabelStyled>
}

export default Label
