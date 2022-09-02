import { IComponentProps } from '@/models'
import React from 'react'
import styled from 'styled-components'

interface IProps extends IComponentProps {
  backgroundColor?: string
  borderRadius?: string
  overflow?: string
  maxWidth?: string
  minWidth?: string
  minHeight?: string
  borderTop?: string
  borderRight?: string
  borderBottom?: string
  borderLeft?: string
  position?: string
  zIndex?: string
  display?: string
  ref?: React.Ref<any>
  onClick?: (e: React.MouseEvent) => void
  onMouseOver?: (e: React.MouseEvent) => void
  onMouseOut?: (e: React.MouseEvent) => void
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
  min-width: ${({ minWidth }) => (minWidth ? minWidth : '')};
  border-top: ${({ borderTop }) => (borderTop ? borderTop : '')};
  border-right: ${({ borderRight }) => (borderRight ? borderRight : '')};
  border-bottom: ${({ borderBottom }) => (borderBottom ? borderBottom : '')};
  border-left: ${({ borderLeft }) => (borderLeft ? borderLeft : '')};
  position: ${({ position }) => (position ? position : '')};
  z-index: ${({ zIndex }) => (zIndex ? zIndex : '')};
  display: ${({ display }) => (display ? display : '')};
  transition: all 0.3s ease-in-out;
`

const ItemContainer: React.FC<IProps> = ({ children, ...rest }) => {
  return <Item {...rest}>{children}</Item>
}

export default ItemContainer
