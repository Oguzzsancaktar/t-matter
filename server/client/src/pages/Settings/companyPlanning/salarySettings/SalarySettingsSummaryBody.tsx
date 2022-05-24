import { JustifyBetweenColumn, JustifyBetweenRow } from '@components/layout'
import colors from '@constants/colors'
import React from 'react'
import styled from 'styled-components'

interface IProps {
  data: null | any
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
  border-left: 1px solid ${colors.blue.primary};
`
const SalarySettingsSummaryBody: React.FC<IProps> = ({ data }) => {
  const calculatedYear0 = +data.defaultPayrollRate + +data.defaultPayrollRate * (+data.increasedPercentage0 / 100)
  const calculatedYear1 = +calculatedYear0 + +calculatedYear0 * (+data.increasedPercentage1 / 100)
  const calculatedYear2 = +calculatedYear1 + +calculatedYear1 * (+data.increasedPercentage2 / 100)
  const calculatedYear3 = +calculatedYear2 + +calculatedYear2 * (+data.increasedPercentage3 / 100)

  return (
    <JustifyBetweenColumn>
      <JustifyBetweenRow>
        <Text>1st year increased rate</Text>
        <Value>${calculatedYear0.toFixed(2)}</Value>
      </JustifyBetweenRow>

      <JustifyBetweenRow>
        <Text>2nd year increased rate</Text>
        <Value>${calculatedYear1.toFixed(2)}</Value>
      </JustifyBetweenRow>

      <JustifyBetweenRow>
        <Text>3th year increased rate</Text>
        <Value>${calculatedYear2.toFixed(2)}</Value>
      </JustifyBetweenRow>

      <JustifyBetweenRow>
        <Text>4th year increased rate</Text>
        <Value>${calculatedYear3.toFixed(2)}</Value>
      </JustifyBetweenRow>
    </JustifyBetweenColumn>
  )
}

export default SalarySettingsSummaryBody
