import { secondsToTimeWithDisplay } from '@/utils/timeUtils'
import { Column, JustifyBetweenColumn, JustifyBetweenRow } from '@components/layout'
import colors from '@constants/colors'
import React from 'react'
import styled from 'styled-components'

interface IProps {
  workDayInWeek: number
  weeklyWorkTime: number
  weeklyOffTrackingTime: number
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
  border-left: 1px solid ${colors.blue.primary};
`

const TEMPORARY_HOURLY_FEE = 10

const UserModalworkingScheduleSummaryBody: React.FC<IProps> = ({
  workDayInWeek,
  weeklyWorkTime,
  weeklyOffTrackingTime
}) => {
  const monthlyEmployerWorkHours = weeklyWorkTime * 4
  const monthlyEmployerSalary = TEMPORARY_HOURLY_FEE * monthlyEmployerWorkHours

  console.log('  weeklyWorkTime', weeklyWorkTime)
  return (
    <JustifyBetweenColumn height="100%">
      <Column>
        <JustifyBetweenRow>
          <Text>Monthly Employer Total Salary</Text>
          <Value>${monthlyEmployerSalary}</Value>
        </JustifyBetweenRow>

        <JustifyBetweenRow>
          <Text>Monthly Employer Total Working Hours</Text>
          <Value>{secondsToTimeWithDisplay(monthlyEmployerWorkHours)}</Value>
        </JustifyBetweenRow>

        <JustifyBetweenRow>
          <Text>Employer Hourly Fee</Text>
          <Value>${TEMPORARY_HOURLY_FEE.toFixed(2)}</Value>
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
