import React from 'react'
import { JustifyBetweenRow } from '@components/layout'
import styled from 'styled-components'
import colors from '@constants/colors'
import { ICompanyPricing } from '@/models'

interface IProps {
  specifiedCompanyProfitPercentage: number
  summary: ICompanyPricing['summary']
  dailyAvarageExpenceAmount: number
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

const CompanyPricingSummaryFooter: React.FC<IProps> = ({
  specifiedCompanyProfitPercentage,
  summary,
  dailyAvarageExpenceAmount,
  workDayInWeek,
  weeklyWorkTime
}) => {
  const dailyWorkingHours = weeklyWorkTime / workDayInWeek / 60 / 60
  const companyExpenseHourlyFee = +dailyAvarageExpenceAmount / dailyWorkingHours

  const specifiedCompanyHourlyProfit =
    ((summary.employerHourlyFee + companyExpenseHourlyFee) * +specifiedCompanyProfitPercentage) / 100

  return (
    <JustifyBetweenRow>
      <Text>Hourly Commpany Fee</Text>
      <Value>${(summary.employerHourlyFee + companyExpenseHourlyFee + specifiedCompanyHourlyProfit).toFixed(2)}</Value>
    </JustifyBetweenRow>
  )
}

export default CompanyPricingSummaryFooter
