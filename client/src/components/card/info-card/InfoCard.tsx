import colors from '@/constants/colors'
import React from 'react'
import styled from 'styled-components'

interface IProps {
  children: React.ReactNode
}

const CardContainer = styled.div`
  width: 100%;
  border: 1px solid ${colors.black.light};
  border-radius: 0.3rem;
  height: calc(100%);
`

const CardCardBody = styled.div`
  border-radius: 0.3rem;
  height: 100%;
  background-color: ${colors.white.bg};
  margin: 1rem;
  padding: 1rem;
`

const InfoCard: React.FC<IProps> = ({ children }) => {
  return (
    <CardContainer>
      <CardCardBody>{children} </CardCardBody>
    </CardContainer>
  )
}

export default InfoCard
