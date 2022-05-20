import React from 'react'
import styled from '@emotion/styled'
import { IComponentProps } from '@models/index'

interface IProps extends IComponentProps {}

const ColumnSC = styled.div<IProps>`
  margin: ${({ margin }) => margin && margin};
  padding: ${({ padding }) => padding && padding};
  height: ${({ height }) => (height ? height : 'auto')};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Column: React.FC<IProps> = ({ children, ...rest }) => {
  return <ColumnSC {...rest}>{children}</ColumnSC>
}

export default Column
