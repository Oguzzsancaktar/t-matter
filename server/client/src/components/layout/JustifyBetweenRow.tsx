import React from 'react'
import styled from 'styled-components'

interface IProps {
  width?: string
  margin?: string
  padding?: string
  height?: string
}

const JustifyBetweenRowStyled = styled.div<IProps>`
  margin: ${({ margin }) => margin && margin};
  padding: ${({ padding }) => padding && padding};
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : 'auto')};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const JustifyBetweenRow: React.FC<IProps> = ({ children, ...rest }) => {
  return <JustifyBetweenRowStyled {...rest}>{children}</JustifyBetweenRowStyled>
}

export default JustifyBetweenRow
