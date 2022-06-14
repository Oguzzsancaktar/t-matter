import React from 'react'
import styled from 'styled-components'
import { IComponentProps } from '@models/index'

interface IProps extends IComponentProps {}

const Wrapper = styled.div`
  height: 100%;
  width: calc(100% - 2rem);
  max-width: 2000px;
  margin: auto;
`
const InnerWrapper: React.FC<IProps> = ({ children, ...rest }) => {
  return <Wrapper>{children}</Wrapper>
}

export default InnerWrapper
