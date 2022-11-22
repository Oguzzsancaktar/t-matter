import React from 'react'
import { JustifyBetweenRow } from '@components/layout'
import styled from 'styled-components'
import colors from '@constants/colors'
import { ISalarySettings } from '@/models'

interface IProps {
  data: ISalarySettings
}

const Text = styled.h3`
  font-size: 14px;
`
const Value = styled.h3`
  font-size: 14px;
  width: 80px;
  text-align: center;
  border-left: 1px solid ${colors.gray.disabled};
`

const SalarySettingsSummaryFooter: React.FC<IProps> = ({ data }) => {
  const calculatedYear0 =
    +data.defaultPayrollRate + +data.defaultPayrollRate * (+data.payrollIncreases[0].increaseRate / 100)
  const calculatedYear1 = +calculatedYear0 + +calculatedYear0 * (+data.payrollIncreases[1].increaseRate / 100)
  const calculatedYear2 = +calculatedYear1 + +calculatedYear1 * (+data.payrollIncreases[2].increaseRate / 100)
  const calculatedYear3 = +calculatedYear2 + +calculatedYear2 * (+data.payrollIncreases[3].increaseRate / 100)
  const calculatedYear4 = +calculatedYear3 + +calculatedYear3 * (+data.payrollIncreases[4].increaseRate / 100)
  return (
    <JustifyBetweenRow>
      <Text>6.th year increased amount</Text>
      <Value>${calculatedYear4.toFixed(2)}</Value>
    </JustifyBetweenRow>
  )
}

export default SalarySettingsSummaryFooter
