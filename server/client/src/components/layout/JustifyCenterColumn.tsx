import React from 'react'
import styled from 'styled-components'

interface IProps {}
const JustifyCenterColumnStyled = styled.div`
  width: 100%;
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const JustifyCenterColumn: React.FC<IProps> = ({ children, ...rest }) => {
  return <JustifyCenterColumnStyled>{children}</JustifyCenterColumnStyled>
}

export default JustifyCenterColumn
