import React from 'react'
import styled from 'styled-components'

type IProps = {
  margin?: string
  padding?: string
  height?: string
}
const JustifyBetweenColumnStyled = styled.div<IProps>`
  margin: ${({ margin }) => margin && margin};
  padding: ${({ padding }) => padding && padding};
  height: ${({ height }) => (height ? height : 'auto')};
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`
const JustifyBetweenColumn: React.FC<IProps> = ({ children, ...rest }) => {
  return <JustifyBetweenColumnStyled {...rest}>{children}</JustifyBetweenColumnStyled>
}

export default JustifyBetweenColumn
