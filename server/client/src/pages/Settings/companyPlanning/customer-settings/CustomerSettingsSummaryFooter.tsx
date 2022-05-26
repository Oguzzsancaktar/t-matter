import React from 'react'
import { JustifyBetweenRow } from '@components/layout'
import styled from 'styled-components'
import colors from '@constants/colors'
import { IDailyWorkingHours } from '@/models'

interface IProps {
  dailyAvarageExpenceAmount: number | string
  specifiedCompanyProfitPercentage: number | string
  workDayInWeek: number
  weeklyWorkTime: number
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

const TEMPORARY_TOTAL_EMPLOYER_ITEMS = 10
const TEMPORARY_TOTAL_EMPLOYER_SALARY = 10000
const TEMPORARY_TOTAL_EMPLOYER_WORKING_HOURS = 1600

const CustomerSettingsSummaryFooter: React.FC<IProps> = ({
  dailyAvarageExpenceAmount,
  specifiedCompanyProfitPercentage,
  workDayInWeek,
  weeklyWorkTime
}) => {
  const dailyWorkingHours = weeklyWorkTime / workDayInWeek / 60 / 60
  const employerHourlyFee = TEMPORARY_TOTAL_EMPLOYER_SALARY / TEMPORARY_TOTAL_EMPLOYER_WORKING_HOURS
  const companyExpenseHourlyFee = +dailyAvarageExpenceAmount / dailyWorkingHours
  const specifiedCompanyHourlyProfit =
    ((employerHourlyFee + companyExpenseHourlyFee) * +specifiedCompanyProfitPercentage) / 100

  return (
    <JustifyBetweenRow>
      <Text>Hourly Commpany Fee</Text>
      <Value>${(employerHourlyFee + companyExpenseHourlyFee + specifiedCompanyHourlyProfit).toFixed(2)}</Value>
    </JustifyBetweenRow>
  )
}

export default CustomerSettingsSummaryFooter
