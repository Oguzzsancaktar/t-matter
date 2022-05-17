import React from 'react'
import styled from 'styled-components'

interface IProps {
  margin?: string
  padding?: string
}
const ColumnSC = styled.div<IProps>`
  margin: ${({ margin }) => margin && margin};
  padding: ${({ padding }) => padding && padding};

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Column: React.FC<IProps> = ({ children, ...rest }) => {
  return <ColumnSC {...rest}>{children}</ColumnSC>
}

export default Column
