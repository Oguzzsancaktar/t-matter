import React from 'react'
import styled from 'styled-components'

const Logo = styled.img`
  width: 100%;
  height: 100%;
`

interface IProps {
  url: string
}
const CompanyLogo: React.FC<IProps> = ({ url }) => {
  return <Logo src={url} />
}

export default CompanyLogo
