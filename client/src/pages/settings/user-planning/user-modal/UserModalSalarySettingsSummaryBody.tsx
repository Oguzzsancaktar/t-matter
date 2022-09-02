import { ISalarySettings } from '@/models'
import { JustifyBetweenColumn, JustifyBetweenRow } from '@components/layout'
import colors from '@constants/colors'
import React from 'react'
import styled from 'styled-components'

interface IProps {
  data: ISalarySettings
}

const Text = styled.h3`
  font-size: 0.8rem;
  padding: 1rem 0;
`
const Value = styled.h3`
  padding: 1rem 0;

  font-size: 0.8rem;
  width: 80px;
  text-align: center;
  border-left: 1px solid ${colors.gray.disabled};
`
const UserModalSalarySettingsSummaryBody: React.FC<IProps> = ({ data }) => {
  const calculatedYear0 =
    +data.defaultPayrollRate + +data.defaultPayrollRate * (+data.payrollIncreases[0].increaseRate / 100)
  const calculatedYear1 = +calculatedYear0 + +calculatedYear0 * (+data.payrollIncreases[1].increaseRate / 100)
  const calculatedYear2 = +calculatedYear1 + +calculatedYear1 * (+data.payrollIncreases[2].increaseRate / 100)
  const calculatedYear3 = +calculatedYear2 + +calculatedYear2 * (+data.payrollIncreases[3].increaseRate / 100)

  return (
    <JustifyBetweenColumn>
      <JustifyBetweenRow>
        <Text>2st year increased rate</Text>
        <Value>${calculatedYear0.toFixed(2)}</Value>
      </JustifyBetweenRow>

      <JustifyBetweenRow>
        <Text>3nd year increased rate</Text>
        <Value>${calculatedYear1.toFixed(2)}</Value>
      </JustifyBetweenRow>

      <JustifyBetweenRow>
        <Text>4th year increased rate</Text>
        <Value>${calculatedYear2.toFixed(2)}</Value>
      </JustifyBetweenRow>

      <JustifyBetweenRow>
        <Text>5th year increased rate</Text>
        <Value>${calculatedYear3.toFixed(2)}</Value>
      </JustifyBetweenRow>
    </JustifyBetweenColumn>
  )
}

export default UserModalSalarySettingsSummaryBody
