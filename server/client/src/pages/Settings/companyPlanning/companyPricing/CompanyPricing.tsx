import React, { useEffect, useState } from 'react'
import {
  Button,
  Checkbox,
  Column,
  H1,
  InputWithIcon,
  JustifyBetweenColumn,
  JustifyBetweenRow,
  Label,
  Row,
  SummaryCard
} from '@components/index'
import { ClockPicker } from '@components/index'
import { Clock, DollarSign, Percent } from 'react-feather'
import { dayOfWeek } from '@/constants/dates'
import { EDays, ETimes } from '@/models'
import { CompanyPricingSummaryBody, CompanyPricingSummaryFooter } from '@/pages'
import moment from 'moment'
import { secondsToTime } from '@/utils/timeUtils'

interface IWorkDay {
  isChecked: boolean
  startTime: number
  endTime: number
}

interface IDailyWorkingHours {
  Monday: IWorkDay
  Tuesday: IWorkDay
  Wednesday: IWorkDay
  Thursday: IWorkDay
  Friday: IWorkDay
  Saturday: IWorkDay
  Sunday: IWorkDay
}

const CompanyPricing = () => {
  const [dailyWorkTime, setDailyWorkTime] = useState<IDailyWorkingHours>({
    Monday: {
      isChecked: true,
      startTime: ETimes.startTime,
      endTime: ETimes.endTime
    },
    Tuesday: {
      isChecked: true,
      startTime: ETimes.startTime,
      endTime: ETimes.endTime
    },
    Wednesday: {
      isChecked: true,
      startTime: ETimes.startTime,
      endTime: ETimes.endTime
    },
    Thursday: {
      isChecked: true,
      startTime: ETimes.startTime,
      endTime: ETimes.endTime
    },
    Friday: {
      isChecked: true,
      startTime: ETimes.startTime,
      endTime: ETimes.endTime
    },
    Saturday: {
      isChecked: false,
      startTime: ETimes.startTime,
      endTime: ETimes.endTime
    },
    Sunday: {
      isChecked: false,
      startTime: ETimes.startTime,
      endTime: ETimes.endTime
    }
  })

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e)
  }

  const handleCheckboxClick = (day: EDays) => {
    const selectedDay = EDays[day]
    const checkStatus = dailyWorkTime[selectedDay].isChecked
    setDailyWorkTime({ ...dailyWorkTime, [selectedDay]: { ...dailyWorkTime[selectedDay], isChecked: !checkStatus } })
  }

  const onStartTimeChange = (day: EDays, value: string) => {
    const selectedDay = EDays[day]
    const seconds = moment(value, 'HH:mm:ss: A').diff(moment().startOf('day'), 'minutes')
    console.log('start', seconds)

    setDailyWorkTime({ ...dailyWorkTime, [selectedDay]: { ...dailyWorkTime[selectedDay], startTime: seconds } })
  }

  const onEndTimeChange = (day: EDays, value: string) => {
    const selectedDay = EDays[day]
    const seconds = moment(value, 'HH:mm:ss: A').diff(moment().startOf('day'), 'minutes')
    console.log('end', seconds)
    setDailyWorkTime({ ...dailyWorkTime, [selectedDay]: { ...dailyWorkTime[selectedDay], endTime: seconds } })
  }

  const handleInputChange = (e: any) => {
    console.log(e)
  }

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    console.log(dailyWorkTime)
  }

  useEffect(() => {
    let totalMinutes = 0
    dayOfWeek.forEach(day => {
      const startTime = dailyWorkTime[EDays[day]].startTime
      const endTime = dailyWorkTime[EDays[day]].endTime
      const isChecked = dailyWorkTime[EDays[day]].isChecked

      if (isChecked) {
        totalMinutes += endTime - startTime
        console.log(111, endTime - startTime)
      }
    })

    console.log(totalMinutes)
  }, [dailyWorkTime])

  return (
    <JustifyBetweenRow height="100%" width="auto">
      <Column height="100%">
        <Row margin="0 0 2rem 0">
          <H1>Default</H1>
        </Row>

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
        <Row margin="0 0 2rem 0">
          <H1>Default</H1>
        </Row>
        <JustifyBetweenColumn height="100%">
          {dayOfWeek.map((day, index) => (
            <Row key={index}>
              <Row onClick={() => handleCheckboxClick(day)}>
                <Checkbox isChecked={dailyWorkTime[EDays[day]].isChecked} onChange={handleCheckboxChange} />
                <Label> {EDays[day]}</Label>
              </Row>
              <Row margin="0 0.25rem 0 0">
                <ClockPicker onChange={value => onStartTimeChange(day, value)} name={day + 'Start'} />
              </Row>
              <Row margin="0 0 0 0.25rem">
                <ClockPicker onChange={value => onEndTimeChange(day, value)} name={day + 'End'} />
              </Row>
            </Row>
          ))}
        </JustifyBetweenColumn>
      </Column>

      <Column height="100%">
        <Row margin="0 0 2rem 0">
          <H1>Summary</H1>
        </Row>
        <JustifyBetweenColumn height="calc(100% - 1rem - 40px - 2rem - 18px)">
          <SummaryCard body={<CompanyPricingSummaryBody />} footer={<CompanyPricingSummaryFooter />} />
        </JustifyBetweenColumn>
        <Column margin="1rem 0 0 0" height="40px">
          <Button onClick={handleSave}>Save</Button>
        </Column>
      </Column>
    </JustifyBetweenRow>
  )
}

export default CompanyPricing
