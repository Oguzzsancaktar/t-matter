import { ISalarySettings } from '@/models'
import { SummaryCardText, SummaryCardValue } from '@/shared'
import { JustifyBetweenColumn, JustifyBetweenRow } from '@components/layout'
import React from 'react'

interface IProps {
  data: ISalarySettings
}

const SalarySettingsSummaryBody: React.FC<IProps> = ({ data }) => {
  const calculatedYear0 =
    +data.defaultPayrollRate + +data.defaultPayrollRate * (+data.payrollIncreases[0].increaseRate / 100)
  const calculatedYear1 = +calculatedYear0 + +calculatedYear0 * (+data.payrollIncreases[1].increaseRate / 100)
  const calculatedYear2 = +calculatedYear1 + +calculatedYear1 * (+data.payrollIncreases[2].increaseRate / 100)
  const calculatedYear3 = +calculatedYear2 + +calculatedYear2 * (+data.payrollIncreases[3].increaseRate / 100)

  return (
    <JustifyBetweenColumn>
      <JustifyBetweenRow>
        <SummaryCardText>2st year increased rate</SummaryCardText>
        <SummaryCardValue>${calculatedYear0.toFixed(2)}</SummaryCardValue>
      </JustifyBetweenRow>

      <JustifyBetweenRow>
        <SummaryCardText>3nd year increased rate</SummaryCardText>
        <SummaryCardValue>${calculatedYear1.toFixed(2)}</SummaryCardValue>
      </JustifyBetweenRow>

      <JustifyBetweenRow>
        <SummaryCardText>4th year increased rate</SummaryCardText>
        <SummaryCardValue>${calculatedYear2.toFixed(2)}</SummaryCardValue>
      </JustifyBetweenRow>

      <JustifyBetweenRow>
        <SummaryCardText>5th year increased rate</SummaryCardText>
        <SummaryCardValue>${calculatedYear3.toFixed(2)}</SummaryCardValue>
      </JustifyBetweenRow>
    </JustifyBetweenColumn>
  )
}

export default SalarySettingsSummaryBody
