import { IComponentProps } from '@/models'
import React from 'react'
import styled from 'styled-components'

interface IProps extends IComponentProps {}

const Item = styled.div<IProps>`
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : 'auto')};
  margin: ${({ margin }) => (margin ? margin : '0')};
  padding: ${({ padding }) => (padding ? padding : '0')};
`

const ItemContainer: React.FC<IProps> = ({ children, ...rest }) => {
  return <Item {...rest}>{children}</Item>
}

export default ItemContainer
