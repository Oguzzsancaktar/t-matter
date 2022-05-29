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
import { EDays, ETimes, IDailyWorkingHours, IOption } from '@/models'
import { CompanyPricingSummaryBody, CompanyPricingSummaryFooter } from '@/pages'
import { clockToSeconds, secondsToTimeString, secondsToTimeWithDisplay, timeToSeconds } from '@/utils/timeUtils'
import { toastWarning } from '@/utils/toastUtil'
import { payrollDateOptions, payrollDayOptions, payrollPeriodOptions } from '@/constants/payrollOptions'
import colors from '@/constants/colors'
import {
  useGetCompanyPricingQuery,
  usePatchCompanyPricingMutation
} from '@services/settings/company-panning/companyPricing'

const CompanyPricing = () => {
  const [totalMinutes, setTotalMinutes] = useState(0)
  const [payrollPeriod, setPayrollPeriod] = useState<string>('monthly')
  const [weeklyOffTrackingTime, setWeeklyOffTrackingTime] = useState<number>(0)

  const [workDayInWeek, setWorkDayInWeek] = useState<number>(0)
  const [payrollDay, setPayrollDay] = useState(1)

  const [dailyAvarageExpenceAmount, setDailyAvarageExpenceAmount] = useState<number | string>('')
  const [specifiedCompanyProfitPercentage, setSpecifiedCompanyProfitPercentage] = useState<number | string>('')

  const [dailyWorkTimeData, setDailyWorkTimeData] = useState<IDailyWorkingHours>({
    Monday: {
      isChecked: true,
      startTime: ETimes.startTime,
      endTime: ETimes.endTime,
      offTrackingTime: '00:00'
    },
    Tuesday: {
      isChecked: true,
      startTime: ETimes.startTime,
      endTime: ETimes.endTime,
      offTrackingTime: '00:00'
    },
    Wednesday: {
      isChecked: true,
      startTime: ETimes.startTime,
      endTime: ETimes.endTime,
      offTrackingTime: '00:00'
    },
    Thursday: {
      isChecked: true,
      startTime: ETimes.startTime,
      endTime: ETimes.endTime,
      offTrackingTime: '00:00'
    },
    Friday: {
      isChecked: true,
      startTime: ETimes.startTime,
      endTime: ETimes.endTime,
      offTrackingTime: '00:00'
    },
    Saturday: {
      isChecked: false,
      startTime: ETimes.startTime,
      endTime: ETimes.endTime,
      offTrackingTime: '00:00'
    },
    Sunday: {
      isChecked: false,
      startTime: ETimes.startTime,
      endTime: ETimes.endTime,
      offTrackingTime: '00:00'
    }
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

  const onEndTimeChange = async (day: EDays, value: string) => {
    const selectedDay = EDays[day]
    const seconds = clockToSeconds(value)

    if (clockToSeconds(dailyWorkTimeData[selectedDay].startTime) >= seconds) {
      await setDailyWorkTimeData({
        ...dailyWorkTimeData,
        [selectedDay]: {
          ...dailyWorkTimeData[selectedDay],
          endTime: secondsToTimeString(clockToSeconds(dailyWorkTimeData[selectedDay].startTime) + 60)
        }
      })
      return toastWarning("End time can't be equal or less than start time !")
    }
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
      [selectedDay]: { ...dailyWorkTimeData[selectedDay], offTrackingTime: secondsToTimeString(seconds) }
    })
  }

  const handleDailyAvarageExpenceAmountInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDailyAvarageExpenceAmount(+event.target.value)
  }

  const handleSpecifiedCompanyProfitInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpecifiedCompanyProfitPercentage(+event.target.value)
  }

  const handlePayrollPeriodChange = (option: IOption) => {
    setPayrollPeriod(option.value)
  }

  const handlePayrollDay = (option: IOption) => {
    setPayrollDay(+option.value)
  }

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault()
    await patchCompanyPricing({
      dailyAverageExpenseAmount: dailyAvarageExpenceAmount as number,
      specifiedCompanyProfit: specifiedCompanyProfitPercentage as number,
      payrollType: payrollPeriod === 'monthly' ? 0 : 1,
      payrollDay,
      workingSchedule: dailyWorkTimeData
    })
  }

  useEffect(() => {
    let totalMinutes = 0
    let totalWorkDayInWeek = 0
    let totalOffTrackingTime = 0

    dayOfWeek.forEach(day => {
      const startTime = clockToSeconds(dailyWorkTimeData[EDays[day]].startTime)
      const endTime = clockToSeconds(dailyWorkTimeData[EDays[day]].endTime)
      const offTrackingTime = timeToSeconds(dailyWorkTimeData[EDays[day]].offTrackingTime.split(' ')[0])

      const isChecked = dailyWorkTimeData[EDays[day]].isChecked

      if (isChecked) {
        totalWorkDayInWeek++
        totalMinutes += endTime - startTime
        totalOffTrackingTime += offTrackingTime

        if (endTime - startTime < offTrackingTime) {
          return toastWarning("Off trackin time can't be greater than working time !")
        }
      }
    })
    setWeeklyOffTrackingTime(totalOffTrackingTime)
    setWorkDayInWeek(totalWorkDayInWeek)
    setTotalMinutes(totalMinutes)
  }, [dailyWorkTimeData])

  useEffect(() => {
    if (companyPricingData) {
      setDailyAvarageExpenceAmount(companyPricingData.dailyAverageExpenseAmount)
      setSpecifiedCompanyProfitPercentage(companyPricingData.specifiedCompanyProfit)
      setPayrollPeriod(companyPricingData.payrollType === 0 ? 'monthly' : 'weekly')
      setPayrollDay(companyPricingData.payrollDay)
      setDailyWorkTimeData(companyPricingData.workingSchedule)
    }
  }, [companyPricingData])

  return (
    <JustifyBetweenRow height="100%" width="auto">
      <Column height="100%" width="30%">
        <Row margin="0 0 2rem 0">
          <H1>Default</H1>
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
        <Row margin="0 0 2rem 0">
          <H1>Default</H1>
        </Row>
        <JustifyBetweenColumn height="100%">
          {dayOfWeek.map((day, index) => (
            <Row key={index}>
              <Column height="100%">
                {index === 0 && (
                  <Label fontSize="12px" color={colors.black.middle}>
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
                  <Label fontSize="12px" color={colors.black.middle}>
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
                  <Label fontSize="12px" color={colors.black.middle}>
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
                  <Label fontSize="12px" color={colors.black.middle}>
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
              labelText="Payroll Type"
              onChange={handlePayrollPeriodChange}
              name={'payrollPeriod'}
              options={payrollPeriodOptions}
            />
          </Row>
          <Row margin="0 0 0 0.25rem">
            {payrollPeriod === 'weekly' ? (
              <SelectInput
                labelText="Payroll Day"
                name={'payrollDay'}
                options={payrollDayOptions}
                onChange={handlePayrollDay}
              />
            ) : (
              <SelectInput
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
        <Row margin="0 0 2rem 0">
          <H1>Summary</H1>
        </Row>
        <JustifyBetweenColumn height="calc(100% - 1rem - 40px - 2rem - 18px)">
          <SummaryCard
            body={
              <CompanyPricingSummaryBody
                dailyAvarageExpenceAmount={dailyAvarageExpenceAmount}
                specifiedCompanyProfitPercentage={specifiedCompanyProfitPercentage}
                workDayInWeek={workDayInWeek}
                weeklyWorkTime={totalMinutes}
                weeklyOffTrackingTime={weeklyOffTrackingTime}
              />
            }
            footer={
              <CompanyPricingSummaryFooter
                dailyAvarageExpenceAmount={dailyAvarageExpenceAmount}
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
