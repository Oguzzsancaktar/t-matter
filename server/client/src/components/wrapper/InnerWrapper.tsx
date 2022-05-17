import React from 'react'
import styled from 'styled-components'

interface Props {}
const Wrapper = styled.div`
  height: 100%;
  width: calc(100% - 2rem);
  max-width: 1600px;
  margin: auto;
`
const InnerWrapper: React.FC<Props> = ({ children, ...rest }) => {
  return <Wrapper>{children}</Wrapper>
}

export default InnerWrapper
