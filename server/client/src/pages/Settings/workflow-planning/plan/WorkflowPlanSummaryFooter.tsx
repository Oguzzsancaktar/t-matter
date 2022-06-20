import React from 'react'
import { JustifyBetweenRow } from '@components/layout'
import styled from 'styled-components'
import colors from '@constants/colors'

interface IProps {}

const Text = styled.h3`
  font-size: 0.8rem;
`
const Value = styled.h3`
  font-size: 0.8rem;
  width: 80px;
  text-align: center;
  border-left: 1px solid ${colors.blue.primary};
`

const WorkflowPlanSummaryFooter: React.FC<IProps> = ({}) => {
  return (
    <JustifyBetweenRow>
      <Text>Hourly Commpany Fee</Text>
      <Value>${(100).toFixed(2)}</Value>
    </JustifyBetweenRow>
  )
}

export default WorkflowPlanSummaryFooter
