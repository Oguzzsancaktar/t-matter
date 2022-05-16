import React from 'react'
import styled from 'styled-components'

interface Props {}
const JustifyBetweenRowStyled = styled.div`
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const JustifyBetweenRow: React.FC<Props> = ({ children, ...rest }) => {
  return <JustifyBetweenRowStyled>{children}</JustifyBetweenRowStyled>
}

export default JustifyBetweenRow
