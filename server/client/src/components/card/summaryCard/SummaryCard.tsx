import colors from '@constants/colors'
import React from 'react'
import styled from 'styled-components'

interface IProps {
  body: React.ReactNode | string
  footer: React.ReactNode | string
}

const SummaryContainer = styled.div`
  width: 100%;
  border: 1px solid ${colors.black.light};
  border-radius: 0.3rem;
  height: calc(100%);
`

const SummaryCardBody = styled.div`
  border-radius: 0.3rem;
  height: calc(100% - 50px - 2rem);
  background-color: ${colors.white.bg};
  margin: 1rem;
  padding: 1rem;
  color: ${colors.gray.light};
`

const SummaryCardFooter = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid ${colors.black.light};
  padding: 0 2rem;
  width: 100%;
  height: 50px;
  color: ${colors.gray.light};
`

const SummaryCard: React.FC<IProps> = ({ body, footer }) => {
  return (
    <SummaryContainer>
      <SummaryCardBody>{body} </SummaryCardBody>
      <SummaryCardFooter>{footer}</SummaryCardFooter>
    </SummaryContainer>
  )
}

export default SummaryCard
