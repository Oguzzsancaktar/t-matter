import React from 'react'
import { JustifyBetweenRow } from '@components/layout'
import styled from 'styled-components'
import colors from '@constants/colors'
import { ICompanyPricing } from '@/models'

interface IProps {
  specifiedCompanyProfitPercentage: number | string
  summary: ICompanyPricing['summary']
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

const CompanyPricingSummaryFooter: React.FC<IProps> = ({ specifiedCompanyProfitPercentage, summary }) => {
  const specifiedCompanyHourlyProfit =
    ((summary.employerHourlyFee + summary.hourlyCompanyFee) * +specifiedCompanyProfitPercentage) / 100

  return (
    <JustifyBetweenRow>
      <Text>Hourly Commpany Fee</Text>
      <Value>${(summary.employerHourlyFee + summary.hourlyCompanyFee + specifiedCompanyHourlyProfit).toFixed(2)}</Value>
    </JustifyBetweenRow>
  )
}

export default CompanyPricingSummaryFooter
