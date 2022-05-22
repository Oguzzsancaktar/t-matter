import React, { useState } from 'react'
import {
  Button,
  Checkbox,
  Column,
  CompanyPricingSummaryBody,
  CompanyPricingSummaryFooter,
  H1,
  InputWithIcon,
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterColumn,
  Label,
  Row,
  SalarySettingsSummaryBody,
  SalarySettingsSummaryFooter,
  SummaryCard
} from '@components/index'
import { ClockPicker } from '@components/index'
import { Clock, DollarSign, Percent } from 'react-feather'
import { dayOfWeek } from '@/constants/dates'
import { ETime } from '@/models'

interface IDaysIsChecked {
  Monday: boolean
  Tuesday: boolean
  Wednesday: boolean
  Thursday: boolean
  Friday: boolean
  Saturday: boolean
  Sunday: boolean
}

const CompanyPricing = () => {
  const [dayIsChecked, setDayIsChecked] = useState<IDaysIsChecked>({
    Monday: true,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false
  })

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e)
    // setDayIsChecked({ ...dayIsChecked, Monday: !dayIsChecked[ETime[day]] })
  }

  const handleCheckboxClick = (day: ETime) => {
    const selectedDay = ETime[day]
    const newState = {
      ...dayIsChecked,
      [selectedDay]: !dayIsChecked[selectedDay]
    }

    setDayIsChecked(newState)
    console.log(dayIsChecked, selectedDay)
  }

  const handleInputChange = (e: any) => {
    console.log(e)
  }

  return (
    <JustifyBetweenRow height="100%" margin="3rem 1rem" width="auto">
      <Column height="100%">
        <H1>Default</H1>

        <JustifyBetweenColumn height="100%">
          <InputWithIcon
            placeholder="Daily Avarage Expence Amount"
            name="dailyAvarageExpenceAmount"
            labelText="Daily Avarage Expence Amount"
            onChange={handleInputChange}
          >
            <DollarSign size="16px" />
          </InputWithIcon>
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

          <JustifyBetweenRow margin="0 0 0rem 0">
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
      </Column>

      <Column height="100%" margin="0px 3rem">
        <H1>Default</H1>
        <JustifyBetweenColumn height="100%">
          {dayOfWeek.map((day, index) => (
            <Row key={index}>
              <Row onClick={() => handleCheckboxClick(day)}>
                <Checkbox isChecked={dayIsChecked[ETime[day]]} onChange={handleCheckboxChange} />
                <Label> {ETime[day]}</Label>
              </Row>

              <ClockPicker name={day + 'Start'} />
              <ClockPicker name={day + 'End'} />
            </Row>
          ))}
        </JustifyBetweenColumn>
      </Column>

      <Column height="100%">
        <H1>Summary</H1>
        <JustifyBetweenColumn height="calc(100% - 1rem - 40px - 2rem - 18px)">
          <SummaryCard body={<CompanyPricingSummaryBody />} footer={<CompanyPricingSummaryFooter />} />
        </JustifyBetweenColumn>
        <Column margin="1rem 0 0 0" height="40px">
          <Button>Save</Button>
        </Column>
      </Column>
    </JustifyBetweenRow>
  )
}

export default CompanyPricing
