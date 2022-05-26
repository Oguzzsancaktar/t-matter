import { IDailyWorkingHours } from '@/models'
import { secondsToTimeWithDisplay } from '@/utils/timeUtils'
import { Column, JustifyBetweenColumn, JustifyBetweenRow } from '@components/layout'
import colors from '@constants/colors'
import React from 'react'
import styled from 'styled-components'

interface IProps {
  dailyAvarageExpenceAmount: number | string
  specifiedCompanyProfitPercentage: number | string
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

const TEMPORARY_TOTAL_EMPLOYER_ITEMS = 10
const TEMPORARY_TOTAL_EMPLOYER_SALARY = 10000
const TEMPORARY_TOTAL_EMPLOYER_WORKING_HOURS = 1600

const CustomerSettingsSummaryBody: React.FC<IProps> = ({
  dailyAvarageExpenceAmount,
  specifiedCompanyProfitPercentage,
  workDayInWeek,
  weeklyWorkTime,
  weeklyOffTrackingTime
}) => {
  const dailyWorkingHours = weeklyWorkTime / workDayInWeek / 60 / 60
  const employerHourlyFee = TEMPORARY_TOTAL_EMPLOYER_SALARY / TEMPORARY_TOTAL_EMPLOYER_WORKING_HOURS
  const companyExpenseHourlyFee = +dailyAvarageExpenceAmount / dailyWorkingHours
  const specifiedCompanyHourlyProfit =
    ((employerHourlyFee + companyExpenseHourlyFee) * +specifiedCompanyProfitPercentage) / 100

  return (
    <JustifyBetweenColumn height="100%">
      <Column>
        <JustifyBetweenRow>
          <Text>Total Employer Items</Text>
          <Value>{TEMPORARY_TOTAL_EMPLOYER_ITEMS}</Value>
        </JustifyBetweenRow>

        <JustifyBetweenRow>
          <Text>Monthly Employer Total Salary</Text>
          <Value>${TEMPORARY_TOTAL_EMPLOYER_SALARY}</Value>
        </JustifyBetweenRow>

        <JustifyBetweenRow>
          <Text>Monthly Employer Total Working Hours</Text>
          <Value>{TEMPORARY_TOTAL_EMPLOYER_WORKING_HOURS} hours</Value>
        </JustifyBetweenRow>

        <JustifyBetweenRow>
          <Text>Employer Hourly Fee</Text>
          <Value>${employerHourlyFee.toFixed(2)}</Value>
        </JustifyBetweenRow>

        <JustifyBetweenRow>
          <Text>Company Expense Hourly Fee</Text>
          <Value>${companyExpenseHourlyFee.toFixed(2)}</Value>
        </JustifyBetweenRow>

        <JustifyBetweenRow>
          <Text>Specified Hourly Profit Amount</Text>
          <Value>${specifiedCompanyHourlyProfit.toFixed(2)}</Value>
        </JustifyBetweenRow>
      </Column>

      <Column>
        <JustifyBetweenRow>
          <Text>Work Day In Week</Text>
          <Value>{workDayInWeek} days</Value>
        </JustifyBetweenRow>
        <JustifyBetweenRow>
          <Text>Weekly Company Work Hours</Text>
          <Value>{secondsToTimeWithDisplay(weeklyWorkTime)}</Value>
        </JustifyBetweenRow>

        <JustifyBetweenRow>
          <Text>Weekly Company Off Time</Text>
          <Value>{secondsToTimeWithDisplay(weeklyOffTrackingTime) || '-'}</Value>
        </JustifyBetweenRow>

        <JustifyBetweenRow>
          <Text>Weekly Company Tracking Time</Text>
          <Value>{secondsToTimeWithDisplay(weeklyWorkTime - weeklyOffTrackingTime)}</Value>
        </JustifyBetweenRow>
      </Column>
    </JustifyBetweenColumn>
  )
}

export default CustomerSettingsSummaryBody
