import {
  JustifyBetweenRow,
  Column,
  Row,
  H1,
  JustifyBetweenColumn,
  InputWithIcon,
  Label,
  Checkbox,
  ClockPicker12,
  ClockPicker24,
  SelectInput,
  SummaryCard,
  Button
} from '@/components'
import colors from '@/constants/colors'
import { dayOfWeek } from '@/constants/dates'
import { payrollPeriodOptions, payrollDayOptions, payrollDateOptions } from '@/constants/payrollOptions'
import { IDailyWorkingHours, ETimes, EDays, IOption } from '@/models'
import {
  useGetCompanyPricingQuery,
  usePatchCompanyPricingMutation
} from '@/services/settings/company-panning/companyPricing'
import {
  clockToSeconds,
  secondsToTimeString,
  secondsToHourMin,
  timeToSeconds,
  secondsToTimeWithDisplay
} from '@/utils/timeUtils'
import { toastWarning, toastSuccess } from '@/utils/toastUtil'
import React, { useEffect, useState } from 'react'
import { DollarSign, Clock, Percent } from 'react-feather'
import { CompanyPricingSummaryBody, CompanyPricingSummaryFooter } from '../../companyPlanning'

const UserModalSalarySettingsTab = () => {
  const [totalMinutes, setTotalMinutes] = useState(0)

  const [payrollPeriod, setPayrollPeriod] = useState<string>('monthly')
  const [payrollDay, setPayrollDay] = useState(1)

  const [workDayInWeek, setWorkDayInWeek] = useState<number>(0)
  const [weeklyOffTrackingTime, setWeeklyOffTrackingTime] = useState<number>(0)

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

  const handlePayrollPeriodChange = (option: IOption) => {
    setPayrollPeriod(option.value)
    setPayrollDay(1)
  }

  const handlePayrollDay = (option: IOption) => {
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
      payrollType: payrollPeriod === 'monthly' ? 0 : 1,
      payrollDay,
      workingSchedule: dailyWorkTimeData
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
      setPayrollPeriod(companyPricingData.payrollType === 0 ? 'monthly' : 'weekly')
      setPayrollDay(companyPricingData.payrollDay)
      setDailyWorkTimeData(companyPricingData.workingSchedule)
    }
  }, [companyPricingData])

  return (
    <JustifyBetweenRow height="100%" width="auto">
      <Column height="100%" margin="0px 1rem" width="70%">
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
              selectedOption={payrollPeriodOptions.findIndex(option => option.value === payrollPeriod)}
              labelText="Payroll Type"
              onChange={handlePayrollPeriodChange}
              name={'payrollPeriod'}
              options={payrollPeriodOptions}
            />
          </Row>
          <Row margin="0 0 0 0.25rem">
            {payrollPeriod === 'weekly' ? (
              <SelectInput
                selectedOption={payrollDayOptions.findIndex(option => option.value === payrollDay)}
                labelText="Payroll Day"
                name={'payrollDay'}
                options={payrollDayOptions}
                onChange={handlePayrollDay}
              />
            ) : (
              <SelectInput
                selectedOption={payrollDateOptions.findIndex(option => option.value === payrollDay)}
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

export default UserModalSalarySettingsTab
