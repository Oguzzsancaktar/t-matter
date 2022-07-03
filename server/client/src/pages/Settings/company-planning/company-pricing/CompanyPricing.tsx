import React, { useEffect, useState } from 'react'
import {
  Button,
  Checkbox,
  ClockPicker12,
  ClockPicker24,
  Column,
  H1,
  InputWithIcon,
  JustifyBetweenColumn,
  JustifyBetweenRow,
  Label,
  Row,
  SelectInput,
  SummaryCard
} from '@components/index'
import { Clock, DollarSign, Percent } from 'react-feather'
import { dayOfWeek } from '@/constants/dates'
import { EDays, EPayrollType, ICompanyPricing, IDailyWorkingHours, IOption } from '@/models'
import { CompanyPricingSummaryBody, CompanyPricingSummaryFooter } from '@/pages'
import {
  clockToSeconds,
  secondsToHourMin,
  secondsToTimeString,
  secondsToTimeWithDisplay,
  timeToSeconds
} from '@/utils/timeUtils'
import { toastSuccess, toastWarning } from '@/utils/toastUtil'
import { payrollDateOptions, payrollDayOptions, payrollTypeOptions } from '@/constants/payrollOptions'
import colors from '@/constants/colors'
import {
  useGetCompanyPricingQuery,
  usePatchCompanyPricingMutation
} from '@/services/settings/company-planning/companyPricingService'
import initialWorkingHours from '@/constants/workingHours'

const CompanyPricing = () => {
  const [totalMinutes, setTotalMinutes] = useState(0)

  const [payrollType, setPayrollType] = useState<number>(0)
  const [payrollDay, setPayrollDay] = useState(1)

  const [workDayInWeek, setWorkDayInWeek] = useState<number>(0)
  const [weeklyOffTrackingTime, setWeeklyOffTrackingTime] = useState<number>(0)

  const [dailyAvarageExpenceAmount, setDailyAvarageExpenceAmount] = useState<number>(0)
  const [companyPricingSummary, setCompanyPricingSummary] = useState<ICompanyPricing['summary']>({
    employerCount: 0,
    employerHourlyFee: 0,
    hourlyCompanyFee: 0
  })
  const [specifiedCompanyProfitPercentage, setSpecifiedCompanyProfitPercentage] = useState<number>(0)

  const [dailyWorkTimeData, setDailyWorkTimeData] = useState<IDailyWorkingHours>({
    ...initialWorkingHours
  })

  const { data: companyPricingData, isLoading, error } = useGetCompanyPricingQuery()

  const [patchCompanyPricing, {}] = usePatchCompanyPricingMutation()

  const handleCheckboxClick = (day: EDays) => {
    const selectedDay = EDays[day]
    const checkStatus = dailyWorkTimeData[selectedDay].isChecked
    setDailyWorkTimeData({
      ...dailyWorkTimeData,
      [selectedDay]: { ...dailyWorkTimeData[selectedDay], isChecked: !checkStatus }
    })
  }

  const onStartTimeChange = (day: EDays, value: string) => {
    const selectedDay = EDays[day]
    const seconds = clockToSeconds(value)

    setDailyWorkTimeData({
      ...dailyWorkTimeData,
      [selectedDay]: { ...dailyWorkTimeData[selectedDay], startTime: secondsToTimeString(seconds) }
    })
  }

  const onEndTimeChange = (day: EDays, value: string) => {
    const selectedDay = EDays[day]
    const seconds = clockToSeconds(value)

    setDailyWorkTimeData({
      ...dailyWorkTimeData,
      [selectedDay]: { ...dailyWorkTimeData[selectedDay], endTime: secondsToTimeString(seconds) }
    })
  }

  const onOffTrackingTimeChange = (day: EDays, value: string) => {
    const selectedDay = EDays[day]
    const seconds = clockToSeconds(value)

    setDailyWorkTimeData({
      ...dailyWorkTimeData,
      [selectedDay]: { ...dailyWorkTimeData[selectedDay], offTrackingTime: secondsToHourMin(seconds) }
    })
  }

  const handleDailyAvarageExpenceAmountInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDailyAvarageExpenceAmount(+event.target.value)
  }

  const handleSpecifiedCompanyProfitInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpecifiedCompanyProfitPercentage(+event.target.value)
  }

  const handlePayrollTypeChange = (option: IOption) => {
    setPayrollType(EPayrollType[option.label.toUpperCase()])
    setPayrollDay(0)
  }

  const handlePayrollDay = (option: IOption) => {
    console.log(+option.value)
    setPayrollDay(+option.value)
  }

  const validateTimes = (selectedDay: string) => {
    const startTime = clockToSeconds(dailyWorkTimeData[selectedDay].startTime)
    const endTime = clockToSeconds(dailyWorkTimeData[selectedDay].endTime)
    const offTrackingTime = timeToSeconds(dailyWorkTimeData[selectedDay].offTrackingTime.split(' ')[0])

    // start greater than "end"
    if (+startTime >= +endTime) {
      setDailyWorkTimeData({
        ...dailyWorkTimeData,
        [selectedDay]: {
          ...dailyWorkTimeData[selectedDay],
          endTime: secondsToTimeString(+startTime + 60)
        }
      })
      return toastWarning("End time can't be equal or less than start time !")
    }

    // offTrackingTime greater than total time
    if (endTime - startTime < offTrackingTime) {
      setDailyWorkTimeData({
        ...dailyWorkTimeData,
        [selectedDay]: {
          ...dailyWorkTimeData[selectedDay],
          offTrackingTime: secondsToHourMin(endTime - startTime - 60)
        }
      })

      return toastWarning("Off trackin time can't be greater than working time !")
    }
  }

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault()
    await patchCompanyPricing({
      dailyAverageExpenseAmount: dailyAvarageExpenceAmount as number,
      specifiedCompanyProfit: specifiedCompanyProfitPercentage as number,
      workingSchedule: {
        payrollType,
        payrollDay,
        workingSchedule: dailyWorkTimeData
      }
    })

    toastSuccess('Company pricing updated successfully')
  }

  useEffect(() => {
    let totalMinutes = 0
    let totalWorkDayInWeek = 0
    let totalOffTrackingTime = 0

    dayOfWeek.forEach(day => {
      const selectedDay = EDays[day]

      const startTime = clockToSeconds(dailyWorkTimeData[selectedDay].startTime)
      const endTime = clockToSeconds(dailyWorkTimeData[selectedDay].endTime)
      const offTrackingTime = timeToSeconds(dailyWorkTimeData[selectedDay].offTrackingTime.split(' ')[0])

      const isChecked = dailyWorkTimeData[selectedDay].isChecked

      if (isChecked) {
        totalWorkDayInWeek++
        totalMinutes += endTime - startTime
        totalOffTrackingTime += offTrackingTime
      }

      validateTimes(selectedDay)
    })
    setWeeklyOffTrackingTime(totalOffTrackingTime)
    setWorkDayInWeek(totalWorkDayInWeek)
    setTotalMinutes(totalMinutes)
  }, [dailyWorkTimeData])

  useEffect(() => {
    if (companyPricingData) {
      setDailyAvarageExpenceAmount(companyPricingData.dailyAverageExpenseAmount)
      setSpecifiedCompanyProfitPercentage(companyPricingData.specifiedCompanyProfit)
      setPayrollType(companyPricingData.workingSchedule.payrollType)
      setPayrollDay(companyPricingData.workingSchedule.payrollDay)
      setDailyWorkTimeData(companyPricingData.workingSchedule.workingSchedule)
      setCompanyPricingSummary(companyPricingData.summary)
      console.log('companyPricingData', companyPricingData)
    }
  }, [companyPricingData])

  return (
    <JustifyBetweenRow height="100%" width="auto">
      <Column height="100%" width="30%">
        <Row margin="0 0 1rem 0">
          <H1 fontSize="1.2rem" textAlign="center" color={colors.text.primary}>
            Default
          </H1>
        </Row>

        <JustifyBetweenColumn height="100%">
          <InputWithIcon
            placeholder="Daily Avarage Expence Amount"
            name="dailyAvarageExpenceAmount"
            labelText="Daily Avarage Expence Amount"
            onChange={handleDailyAvarageExpenceAmountInputChange}
            value={dailyAvarageExpenceAmount}
            type="number"
          >
            <DollarSign size="16px" />
          </InputWithIcon>
          <JustifyBetweenRow>
            <InputWithIcon
              placeholder="Select Daily Company Work Hours"
              name="dailyCompanyWorkHours"
              labelText="Daily Company Work Hours"
              value={secondsToTimeWithDisplay(totalMinutes / workDayInWeek)}
              disabled={true}
            >
              <Clock size="16px" />
            </InputWithIcon>
          </JustifyBetweenRow>

          <JustifyBetweenRow margin="0 0 0rem 0">
            <InputWithIcon
              placeholder="Specified Company Profit"
              name="specifiedCompanyProfit"
              labelText="Specified Company Profit"
              onChange={handleSpecifiedCompanyProfitInputChange}
              value={specifiedCompanyProfitPercentage}
              type="number"
            >
              <Percent size="16px" />
            </InputWithIcon>
          </JustifyBetweenRow>
        </JustifyBetweenColumn>
      </Column>

      <Column height="100%" margin="0px 2rem" width="40%">
        <Row margin="0 0 1rem 0">
          <H1 fontSize="1.2rem" textAlign="center" color={colors.text.primary}>
            Default
          </H1>
        </Row>
        <JustifyBetweenColumn height="100%">
          {dayOfWeek.map((day, index) => (
            <Row key={index}>
              <Column height="100%">
                {index === 0 && (
                  <Label fontSize="1rem" color={colors.text.primary}>
                    Day
                  </Label>
                )}
                <Row height="100%" onClick={() => handleCheckboxClick(day)}>
                  <Checkbox
                    isChecked={dailyWorkTimeData[EDays[day]].isChecked}
                    onChange={(e: any) => console.log('checkbox changed', e)}
                  />
                  <Label>{EDays[day]}</Label>
                </Row>
              </Column>

              <Column margin="0 0.25rem 0 0">
                {index === 0 && (
                  <Label fontSize="1rem" color={colors.text.primary}>
                    Start Time
                  </Label>
                )}
                <ClockPicker12
                  disabled={!dailyWorkTimeData[EDays[day]].isChecked}
                  value={dailyWorkTimeData[EDays[day]].startTime}
                  onChange={value => onStartTimeChange(day, value)}
                  name={day + 'Start'}
                />
              </Column>
              <Column margin="0 0.25rem">
                {index === 0 && (
                  <Label fontSize="1rem" color={colors.text.primary}>
                    End Time
                  </Label>
                )}
                <ClockPicker12
                  disabled={!dailyWorkTimeData[EDays[day]].isChecked}
                  value={dailyWorkTimeData[EDays[day]].endTime}
                  onChange={value => onEndTimeChange(day, value)}
                  name={day + 'End'}
                />
              </Column>

              <Column height="100%" margin="0 0 0 0.25rem">
                {index === 0 && (
                  <Label fontSize="1rem" color={colors.text.primary}>
                    Off tracking time
                  </Label>
                )}
                <ClockPicker24
                  disabled={!dailyWorkTimeData[EDays[day]].isChecked}
                  value={dailyWorkTimeData[EDays[day]].offTrackingTime}
                  onChange={value => onOffTrackingTimeChange(day, value)}
                  name={day + 'offTrackingTime'}
                />
              </Column>
            </Row>
          ))}
        </JustifyBetweenColumn>

        <JustifyBetweenRow margin="2rem 0 0 0">
          <Row margin="0 0.25rem 0 0">
            <SelectInput
              selectedOption={payrollTypeOptions.filter(option => +option.value === payrollType)}
              labelText="Payroll Type"
              onChange={handlePayrollTypeChange}
              name={'payrollType'}
              options={payrollTypeOptions}
            />
          </Row>
          <Row margin="0 0 0 0.25rem">
            {payrollType === 1 ? (
              <SelectInput
                selectedOption={payrollDayOptions.filter(
                  option => +option.value === +payrollDayOptions[payrollDay].value - 1
                )}
                labelText="Payroll Day"
                name={'payrollDay'}
                options={payrollDayOptions}
                onChange={handlePayrollDay}
              />
            ) : (
              <SelectInput
                selectedOption={payrollDateOptions.filter(
                  option => +option.value === +payrollDateOptions[payrollDay].value - 1
                )}
                labelText="Payroll Date"
                name={'payrollDate'}
                options={payrollDateOptions}
                onChange={handlePayrollDay}
              />
            )}
          </Row>
        </JustifyBetweenRow>
      </Column>

      <Column height="100%" width="30%">
        <Row margin="0 0 1rem 0">
          <H1 fontSize="1.2rem" textAlign="center" color={colors.text.primary}>
            Summary
          </H1>
        </Row>
        <JustifyBetweenColumn height="100%">
          <SummaryCard
            body={
              <CompanyPricingSummaryBody
                dailyAvarageExpenceAmount={dailyAvarageExpenceAmount}
                summary={companyPricingSummary}
                specifiedCompanyProfitPercentage={specifiedCompanyProfitPercentage}
                workDayInWeek={workDayInWeek}
                weeklyWorkTime={totalMinutes}
                weeklyOffTrackingTime={weeklyOffTrackingTime}
              />
            }
            footer={
              <CompanyPricingSummaryFooter
                dailyAvarageExpenceAmount={dailyAvarageExpenceAmount}
                summary={companyPricingSummary}
                specifiedCompanyProfitPercentage={specifiedCompanyProfitPercentage}
                workDayInWeek={workDayInWeek}
                weeklyWorkTime={totalMinutes}
              />
            }
          />
        </JustifyBetweenColumn>
        <Column margin="1rem 0 0 0" height="40px">
          <Button onClick={handleSave}>Save</Button>
        </Column>
      </Column>
    </JustifyBetweenRow>
  )
}

export default CompanyPricing
