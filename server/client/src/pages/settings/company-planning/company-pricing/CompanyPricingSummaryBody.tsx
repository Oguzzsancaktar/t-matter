import { ICompanyPricing, IDailyWorkingHours } from '@/models'
import { SummaryCardText, SummaryCardValue } from '@/shared'
import { secondsToTimeWithDisplay } from '@/utils/timeUtils'
import { Column, JustifyBetweenColumn, JustifyBetweenRow } from '@components/layout'
import React from 'react'

interface IProps {
  specifiedCompanyProfitPercentage: number | string
  workDayInWeek: number
  weeklyWorkTime: number
  weeklyOffTrackingTime: number
  summary: ICompanyPricing['summary']
  dailyAvarageExpenceAmount: number
}

const CompanyPricingSummaryBody: React.FC<IProps> = ({
  specifiedCompanyProfitPercentage,
  workDayInWeek,
  weeklyWorkTime,
  weeklyOffTrackingTime,
  summary,
  dailyAvarageExpenceAmount
}) => {
  const dailyWorkingHours = weeklyWorkTime / workDayInWeek / 60 / 60
  const companyExpenseHourlyFee = +dailyAvarageExpenceAmount / dailyWorkingHours
  const specifiedCompanyHourlyProfit =
    ((summary.employerHourlyFee + companyExpenseHourlyFee) * +specifiedCompanyProfitPercentage) / 100

  return (
    <JustifyBetweenColumn height="100%">
      <Column>
        <JustifyBetweenRow>
          <SummaryCardText>Total Employers</SummaryCardText>
          <SummaryCardValue>{summary.employerCount}</SummaryCardValue>
        </JustifyBetweenRow>
        {/* 
        <JustifyBetweenRow>
          <SummaryCardText>Monthly Employers Total Salary</SummaryCardText>
          <SummaryCardValue>${TEMPORARY_TOTAL_EMPLOYER_SALARY}</SummaryCardValue>
        </JustifyBetweenRow>

        <JustifyBetweenRow>
          <SummaryCardText>Monthly Employers Total Working Hours</SummaryCardText>
          <SummaryCardValue>{TEMPORARY_TOTAL_EMPLOYER_WORKING_HOURS} hours</SummaryCardValue>
        </JustifyBetweenRow> */}

        <JustifyBetweenRow>
          <SummaryCardText>Employers Hourly Fee</SummaryCardText>
          <SummaryCardValue>${summary.employerHourlyFee.toFixed(2)}</SummaryCardValue>
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
