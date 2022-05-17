import React from 'react'
import styled from 'styled-components'

interface IProps {
  width?: string
  margin?: string
  padding?: string
}
const JustifyCenterRowStyled = styled.div<IProps>`
  margin: ${({ margin }) => margin && margin};
  padding: ${({ padding }) => padding && padding};
  width: ${({ width }) => (width ? width : '100%')};
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
const JustifyCenterRow: React.FC<IProps> = ({ children, ...rest }) => {
  return <JustifyCenterRowStyled {...rest}>{children}</JustifyCenterRowStyled>
}

export default JustifyCenterRow
