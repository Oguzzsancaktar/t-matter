import React from 'react'

import {
  Button,
  Checkbox,
  Column,
  InputWithIcon,
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterColumn,
  Row,
  SalarySettingsSummaryBody,
  SalarySettingsSummaryFooter,
  SummaryCard
} from '@components/index'
import { ClockPicker } from '@components/input/ClockPicker'
import colors from '@constants/colors'
import { Clock, DollarSign, Percent } from 'react-feather'
import styled from '@emotion/styled/macro'

const HeaderLabel = styled.h3`
  width: 100%;
  color: ${colors.orange.primary};
  margin-bottom: 2rem;
  text-align: left;
`
const handleInputChange = (e: any) => {
  console.log(e)
}

const CompanyPricing = () => {
  return (
    <JustifyBetweenRow height="100%" margin="3rem" width="auto">
      <JustifyBetweenColumn height="100%">
        <Column>
          <HeaderLabel>Default</HeaderLabel>
          <InputWithIcon
            placeholder="Daily Avarage Expence Amount"
            name="dailyAvarageExpenceAmount"
            labelText="Daily Avarage Expence Amount"
            onChange={handleInputChange}
          >
            <DollarSign size="16px" />
          </InputWithIcon>
        </Column>
        <JustifyBetweenRow>
          <InputWithIcon
            placeholder="Daily Company Work Hours"
            name="dailyCompanyWorkHours"
            labelText="Daily Company Work Hours"
            onChange={handleInputChange}
          >
            <Clock size="16px" />
          </InputWithIcon>
        </JustifyBetweenRow>

        <JustifyBetweenRow margin="0 0 1rem 0">
          <InputWithIcon
            placeholder="Specified Company Profit"
            name="specifiedCompanyProfit"
            labelText="Specified Company Profit"
            onChange={handleInputChange}
          >
            <Percent size="16px" />
          </InputWithIcon>
        </JustifyBetweenRow>
      </JustifyBetweenColumn>

      <JustifyBetweenColumn margin="0px 3rem" height="100%">
        <Column>
          <HeaderLabel>Default</HeaderLabel>
          <Row>
            <Checkbox
              isChecked={false}
              onChange={function (event: any): void {
                throw new Error('Function not implemented.')
              }}
            />
            Monday
            <ClockPicker />
            <ClockPicker />
          </Row>
        </Column>
        <JustifyBetweenRow>
          <InputWithIcon
            placeholder="Daily Company Work Hours"
            name="dailyCompanyWorkHours"
            labelText="Daily Company Work Hours"
            onChange={handleInputChange}
          >
            <Clock size="16px" />
          </InputWithIcon>
        </JustifyBetweenRow>

        <JustifyBetweenRow margin="0 0 1rem 0">
          <InputWithIcon
            placeholder="Specified Company Profit"
            name="specifiedCompanyProfit"
            labelText="Specified Company Profit"
            onChange={handleInputChange}
          >
            <Percent size="16px" />
          </InputWithIcon>
        </JustifyBetweenRow>
      </JustifyBetweenColumn>

      <JustifyCenterColumn height="100%" margin="0 0 1rem 0">
        <JustifyBetweenColumn height="calc(100% - 1rem - 40px)">
          <HeaderLabel>Summary</HeaderLabel>
          <SummaryCard body={<SalarySettingsSummaryBody />} footer={<SalarySettingsSummaryFooter />} />
        </JustifyBetweenColumn>
        <Column margin="1rem 0 0 0" height="40px">
          <Button>Save</Button>
        </Column>
      </JustifyCenterColumn>
    </JustifyBetweenRow>
  )
}

export default CompanyPricing
