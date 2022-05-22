import { JustifyBetweenColumn, JustifyBetweenRow } from '@components/layout'
import colors from '@constants/colors'
import React from 'react'
import styled from 'styled-components'

const Text = styled.h3`
  font-size: 0.8rem;
`
const Value = styled.h3`
  font-size: 0.8rem;
  width: 80px;
  text-align: center;
  border-left: 1px solid ${colors.blue.primary};
`
const CompanyPricingSummaryBody = () => {
  return (
    <JustifyBetweenColumn>
      <JustifyBetweenRow>
        <Text>Total Employer Items</Text>
        <Value>10 </Value>
      </JustifyBetweenRow>

      <JustifyBetweenRow>
        <Text>Weekly Company Work Hours</Text>
        <Value>40 Hours</Value>
      </JustifyBetweenRow>

      <JustifyBetweenRow>
        <Text>Employer Hourly Fee</Text>
        <Value>$180</Value>
      </JustifyBetweenRow>

      <JustifyBetweenRow>
        <Text>Specified Profit Amount</Text>
        <Value>$88</Value>
      </JustifyBetweenRow>
    </JustifyBetweenColumn>
  )
}

export default CompanyPricingSummaryBody
