import React from 'react'
import { JustifyBetweenRow } from '@components/layout'
import styled from 'styled-components'
import colors from '@constants/colors'

interface IProps {
  workDayInWeek: number
  weeklyWorkTime: number
  userDefaultPayrollRate: number
}

const Text = styled.h3`
  font-size: 0.8rem;
`
const Value = styled.h3`
  font-size: 0.8rem;
  width: 80px;
  text-align: center;
  border-left: 1px solid ${colors.gray.disabled};
`

const UserModalworkingScheduleSettingsSummaryFooter: React.FC<IProps> = ({ userDefaultPayrollRate }) => {
  return (
    <JustifyBetweenRow>
      <Text>Hourly Employer Fee</Text>
      <Value>${userDefaultPayrollRate.toFixed(2)}</Value>
    </JustifyBetweenRow>
  )
}

export default UserModalworkingScheduleSettingsSummaryFooter
