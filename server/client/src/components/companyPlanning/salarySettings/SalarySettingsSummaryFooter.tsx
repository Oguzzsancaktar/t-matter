import React from 'react'
import { JustifyBetweenRow } from '@components/layout'
import styled from '@emotion/styled'
import colors from '@constants/colors'

const Text = styled.h3`
  font-size: 0.8rem;
`
const Value = styled.h3`
  font-size: 0.8rem;
  width: 80px;
  text-align: center;
  border-left: 1px solid ${colors.blue.primary};
`

const SalarySettingsSummaryFooter = () => {
  return (
    <JustifyBetweenRow>
      <Text>Total</Text>
      <Value>$308</Value>
    </JustifyBetweenRow>
  )
}

export default SalarySettingsSummaryFooter
