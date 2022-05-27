import React from 'react'
import styled from 'styled-components'
import { IComponentProps } from '@models/index'
import colors from '@/constants/colors'

interface IProps extends IComponentProps {}

const Wrapper = styled.div`
  height: 100%;
  min-height: 100vh;
  padding: 2rem 1rem;
  background-color: ${colors.white.primary};
  width: 100%;
  margin: auto;
`

const PageWrapper: React.FC<IProps> = ({ children, ...rest }) => {
  return <Wrapper>{children}</Wrapper>
}

export default PageWrapper
