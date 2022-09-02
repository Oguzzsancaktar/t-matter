import { IComponentProps } from '@/models'
import React from 'react'
import styled from 'styled-components'

interface IProps extends IComponentProps {
  children?: React.ReactNode
  color: string
}

const BadgeContainer = styled.div<IProps>`
  width: ${({ width }) => (width ? width : 'auto')};
  height: ${({ height }) => (height ? height : 'auto')};
  margin: ${({ margin }) => (margin ? margin : '0')};
  padding: ${({ padding }) => (padding ? padding : '0.25rem 0.5rem')};
  color: ${({ color }) => color && color};
  background-color: ${({ color }) => color && color}20;
  border-radius: 0.3rem;
`
const Badge = ({ children, color, ...rest }) => {
  return (
    <BadgeContainer color={color} {...rest}>
      {children}
    </BadgeContainer>
  )
}

export default Badge
