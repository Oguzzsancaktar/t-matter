import React from 'react'
import { JustifyBetweenRow } from '@components/layout'
import styled from 'styled-components'
import colors from '@constants/colors'

interface IProps {
  data: null | any
}

const Text = styled.h3`
  font-size: 0.8rem;
`
const Value = styled.h3`
  font-size: 0.8rem;
  width: 80px;
  text-align: center;
  border-left: 1px solid ${colors.blue.primary};
`

const SalarySettingsSummaryFooter: React.FC<IProps> = ({ data }) => {
  const calculatedYear0 = +data.defaultPayrollRate + +data.defaultPayrollRate * (+data.increasedPercentage0 / 100)
  const calculatedYear1 = +calculatedYear0 + +calculatedYear0 * (+data.increasedPercentage1 / 100)
  const calculatedYear2 = +calculatedYear1 + +calculatedYear1 * (+data.increasedPercentage2 / 100)
  const calculatedYear3 = +calculatedYear2 + +calculatedYear2 * (+data.increasedPercentage3 / 100)
  const calculatedYear4 = +calculatedYear3 + +calculatedYear3 * (+data.increasedPercentage4 / 100)
  return (
    <JustifyBetweenRow>
      <Text>5.th year increased amount</Text>
      <Value>${calculatedYear4.toFixed(2)}</Value>
    </JustifyBetweenRow>
  )
}

export default SalarySettingsSummaryFooter
