import { IDailyWorkingHours } from '@/models'
import { SummaryCardText, SummaryCardValue } from '@/shared'
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

const TEMPORARY_TOTAL_EMPLOYER_ITEMS = 10
const TEMPORARY_TOTAL_EMPLOYER_SALARY = 10000
const TEMPORARY_TOTAL_EMPLOYER_WORKING_HOURS = 1600

const CompanyPricingSummaryBody: React.FC<IProps> = ({
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
          <SummaryCardText>Total Employers</SummaryCardText>
          <SummaryCardValue>{TEMPORARY_TOTAL_EMPLOYER_ITEMS}</SummaryCardValue>
        </JustifyBetweenRow>

        <JustifyBetweenRow>
          <SummaryCardText>Monthly Employers Total Salary</SummaryCardText>
          <SummaryCardValue>${TEMPORARY_TOTAL_EMPLOYER_SALARY}</SummaryCardValue>
        </JustifyBetweenRow>

        <JustifyBetweenRow>
          <SummaryCardText>Monthly Employers Total Working Hours</SummaryCardText>
          <SummaryCardValue>{TEMPORARY_TOTAL_EMPLOYER_WORKING_HOURS} hours</SummaryCardValue>
        </JustifyBetweenRow>

        <JustifyBetweenRow>
          <SummaryCardText>Employers Hourly Fee</SummaryCardText>
          <SummaryCardValue>${employerHourlyFee.toFixed(2)}</SummaryCardValue>
        </JustifyBetweenRow>

        <JustifyBetweenRow>
          <SummaryCardText>Company Expense Hourly Fee</SummaryCardText>
          <SummaryCardValue>${companyExpenseHourlyFee.toFixed(2)}</SummaryCardValue>
        </JustifyBetweenRow>

        <JustifyBetweenRow>
          <SummaryCardText>Specified Hourly Profit Amount</SummaryCardText>
          <SummaryCardValue>${specifiedCompanyHourlyProfit.toFixed(2)}</SummaryCardValue>
        </JustifyBetweenRow>
      </Column>

      <Column>
        <JustifyBetweenRow>
          <SummaryCardText>Work Day In Week</SummaryCardText>
          <SummaryCardValue>{workDayInWeek} days</SummaryCardValue>
        </JustifyBetweenRow>
        <JustifyBetweenRow>
          <SummaryCardText>Weekly Company Work Hours</SummaryCardText>
          <SummaryCardValue>{secondsToTimeWithDisplay(weeklyWorkTime)}</SummaryCardValue>
        </JustifyBetweenRow>

        <JustifyBetweenRow>
          <SummaryCardText>Weekly Company Off Time</SummaryCardText>
          <SummaryCardValue>{secondsToTimeWithDisplay(weeklyOffTrackingTime) || '-'}</SummaryCardValue>
        </JustifyBetweenRow>

        <JustifyBetweenRow>
          <SummaryCardText>Weekly Company Tracking Time</SummaryCardText>
          <SummaryCardValue>{secondsToTimeWithDisplay(weeklyWorkTime - weeklyOffTrackingTime)}</SummaryCardValue>
        </JustifyBetweenRow>
      </Column>
    </JustifyBetweenColumn>
  )
}

export default CompanyPricingSummaryBody
