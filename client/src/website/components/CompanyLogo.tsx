import React from 'react'
import styled from 'styled-components'

const Logo = styled.img<{ borderRadius?: number }>`
  width: 100%;
  height: 100%;
  border-radius: ${props => props?.borderRadius}px;
  overflow: hidden;
`

interface IProps {
  url: string
  borderRadius?: number
}
const CompanyLogo: React.FC<IProps> = ({ url, borderRadius }) => {
  return <Logo src={url} borderRadius={borderRadius} />
}

export default CompanyLogo
