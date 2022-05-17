import React from 'react'
import styled from 'styled-components'

interface Props {}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  margin: auto;
`

const PageWrapper: React.FC<Props> = ({ children, ...rest }) => {
  return <Wrapper>{children}</Wrapper>
}

export default PageWrapper
