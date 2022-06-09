import { IComponentProps } from '@/models'
import React from 'react'
import styled from 'styled-components'

interface IProps extends IComponentProps {
  backgroundColor?: string
  borderRadius?: string
  overflow?: string
  maxWidth?: string
  minHeight?: string
}

const Item = styled.div<IProps>`
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : 'transparent')};
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : 'auto')};
  margin: ${({ margin }) => (margin ? margin : '0')};
  padding: ${({ padding }) => (padding ? padding : '0')};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '0')};
  overflow: ${({ overflow }) => (overflow ? overflow : '')};
  cursor: ${({ cursorType }) => (cursorType ? cursorType : '')};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '')};
  min-height: ${({ minHeight }) => (minHeight ? minHeight : '')};
`

const ItemContainer: React.FC<IProps> = ({ children, ...rest }) => {
  return <Item {...rest}>{children}</Item>
}

export default ItemContainer
