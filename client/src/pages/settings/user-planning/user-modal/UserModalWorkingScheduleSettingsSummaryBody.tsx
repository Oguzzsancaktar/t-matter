import { secondsToTimeWithDisplay } from '@/utils/timeUtils'
import { Column, JustifyBetweenColumn, JustifyBetweenRow } from '@components/layout'
import colors from '@constants/colors'
import React from 'react'
import styled from 'styled-components'

interface IProps {
  workDayInWeek: number
  weeklyWorkTime: number
  weeklyOffTrackingTime: number
  userDefaultPayrollRate: number
}

const Text = styled.h3`
  font-size: 0.7rem;
  padding: 0.5rem 0;
`
const Value = styled.h3`
  padding: 0.5rem 0;
  font-size: 0.7rem;
  width: 80px;
  text-align: center;
  border-left: 1px solid ${colors.gray.disabled};
`

const UserModalworkingScheduleSummaryBody: React.FC<IProps> = ({
  workDayInWeek,
  weeklyWorkTime,
  weeklyOffTrackingTime,
  userDefaultPayrollRate
}) => {
  const monthlyEmployerWorkHours = (weeklyWorkTime * 4) / 3600
  const monthlyEmployerSalary = userDefaultPayrollRate * monthlyEmployerWorkHours

  return (
    <JustifyBetweenColumn height="100%">
      <Column>
        <JustifyBetweenRow>
          <Text>Monthly Employer Total Salary</Text>
          <Value>${monthlyEmployerSalary}</Value>
        </JustifyBetweenRow>

        <JustifyBetweenRow>
          <Text>Monthly Employer Total Working Hours</Text>
          <Value>{secondsToTimeWithDisplay(weeklyWorkTime * 4)}</Value>
        </JustifyBetweenRow>
      </Column>

      <Column>
        <JustifyBetweenRow>
          <Text>Work Day In Week</Text>
          <Value>{workDayInWeek} days</Value>
        </JustifyBetweenRow>

        <JustifyBetweenRow>
          <Text>Weekly Employer Work Hours</Text>
          <Value>{secondsToTimeWithDisplay(weeklyWorkTime)}</Value>
        </JustifyBetweenRow>

        <JustifyBetweenRow>
          <Text>Weekly Employer Off Time</Text>
          <Value>{secondsToTimeWithDisplay(weeklyOffTrackingTime) || '-'}</Value>
        </JustifyBetweenRow>

        <JustifyBetweenRow>
          <Text>Weekly Employer Tracking Time</Text>
          <Value>{secondsToTimeWithDisplay(weeklyWorkTime - weeklyOffTrackingTime)}</Value>
        </JustifyBetweenRow>
      </Column>
    </JustifyBetweenColumn>
  )
}

export default UserModalworkingScheduleSummaryBody
