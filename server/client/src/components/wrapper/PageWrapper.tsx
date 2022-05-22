import React from 'react'
import styled from 'styled-components'
import { IComponentProps } from '@models/index'

interface IProps extends IComponentProps {}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  margin: auto;
`

const PageWrapper: React.FC<IProps> = ({ children, ...rest }) => {
  return <Wrapper>{children}</Wrapper>
}

export default PageWrapper
