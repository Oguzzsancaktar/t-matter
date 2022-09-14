import {
  JustifyBetweenRow,
  Column,
  Row,
  H1,
  JustifyBetweenColumn,
  Label,
  SelectInput,
  SummaryCard,
  Button,
  ClockPicker12,
  ClockPicker24,
  ItemContainer,
  Checkbox
} from '@/components'
import colors from '@/constants/colors'
import { dayOfWeek } from '@/constants/dates'
import { payrollTypeOptions, payrollDayOptions, payrollDateOptions } from '@/constants/payrollOptions'
import initialWorkingHours from '@/constants/workingHours'
import useAccessStore from '@/hooks/useAccessStore'

import { IDailyWorkingHours, EDays, IOption, IUser, EPayrollType } from '@/models'
import { UserModalWorkingScheduleSettingsSummaryBody, UserModalWorkingScheduleSettingsSummaryFooter } from '@/pages'
import {
  companyPricingApi,
  useGetUserCompanyPricingQuery,
  usePatchUserCompanyPricingMutation
} from '@/services/settings/company-planning/companyPricingService'
import { clockToSeconds, secondsToTimeString, secondsToHourMin, timeToSeconds } from '@/utils/timeUtils'
import { toastSuccess, toastWarning } from '@/utils/toastUtil'
import React, { useEffect, useState } from 'react'

interface IProps {
  userId: IUser['_id']
}
const UserModalWorkingScheduleSettingsTab: React.FC<IProps> = ({ userId }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const [patchUserworkingSchedule] = usePatchUserCompanyPricingMutation()

  const [totalSeconds, setTotalMinutes] = useState(0)

  const [payrollType, setPayrollType] = useState<number>(0)
  const [payrollDay, setPayrollDay] = useState(1)

  const [workDayInWeek, setWorkDayInWeek] = useState<number>(0)
  const [weeklyOffTrackingTime, setWeeklyOffTrackingTime] = useState<number>(0)

  const [userDefaultPayrollRate, setUserDefaultPayrollRate] = useState<number>(0)

  const [dailyWorkTimeData, setDailyWorkTimeData] = useState<IDailyWorkingHours>({ ...initialWorkingHours })

  const { data: userDailyWorkingHourData, isLoading: userDailyWorkingHourIsLoading } =
    useGetUserCompanyPricingQuery(userId)

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

  const handlePayrollTypeChange = (option: IOption) => {
    setPayrollType(EPayrollType[option.label.toUpperCase()])
    setPayrollDay(0)
  }

  const handlePayrollDay = (option: IOption) => {
    setPayrollDay(+option.value - 1)
  }

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault()
    await patchUserworkingSchedule({
      workingSchedule: dailyWorkTimeData,
      payrollDay,
      payrollType: +payrollType,
      userId
    })
    dispatch(companyPricingApi.util.resetApiState())

    toastSuccess('Company pricing updated successfully')
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

  useEffect(() => {
    let totalSeconds = 0
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
        totalSeconds += endTime - startTime
        totalOffTrackingTime += offTrackingTime
      }

      validateTimes(selectedDay)
    })
    setWeeklyOffTrackingTime(totalOffTrackingTime)
    setWorkDayInWeek(totalWorkDayInWeek)
    setTotalMinutes(totalSeconds)
  }, [dailyWorkTimeData])

  useEffect(() => {
    console.log(userDailyWorkingHourData)
    if (userDailyWorkingHourData && !userDailyWorkingHourIsLoading) {
      setPayrollDay(userDailyWorkingHourData.payrollDay)
      if (userDailyWorkingHourData.workingSchedule) {
        setDailyWorkTimeData(userDailyWorkingHourData.workingSchedule)
      }
      setUserDefaultPayrollRate(userDailyWorkingHourData.defaultPayrollRate)
    }
  }, [userDailyWorkingHourData, userDailyWorkingHourIsLoading])

  return (
    <ItemContainer height="100%">
      <JustifyBetweenRow height="100%" width="auto">
        <Column height="100%" margin="0px 1rem" width="70%">
          {/* <Row margin="0 0 2rem 0">
            <H1>Default</H1>
          </Row> */}
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
                      isChecked={dailyWorkTimeData[EDays[day]]?.isChecked}
                      onChange={(e: any) => console.log('checkbox changed', e)}
                    />
                    <H1
                      cursor="pointer"
                      fontSize="0.8rem"
                      color={dailyWorkTimeData[EDays[day]].isChecked ? colors.green.primary : colors.gray.dark}
                    >
                      {EDays[day]}
                    </H1>
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
                selectedOption={payrollTypeOptions.filter(option => +option.value === payrollType)}
                labelText="Payroll Type"
                onChange={handlePayrollTypeChange}
                name={'payrollType'}
                options={payrollTypeOptions}
              />
            </Row>
            <Row margin="0 0 0 0.25rem">
              {+payrollType === 1 ? (
                <SelectInput
                  selectedOption={payrollDayOptions.filter(
                    option => +option.value === +payrollDayOptions[payrollDay].value
                  )}
                  labelText="Payroll Day"
                  name={'payrollDay'}
                  options={payrollDayOptions}
                  onChange={handlePayrollDay}
                />
              ) : (
                <SelectInput
                  selectedOption={payrollDateOptions.filter(
                    option => +option?.value === +payrollDateOptions[payrollDay]?.value
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
          {/* <Row margin="0 0 2rem 0">
            <H1>Summary</H1>
          </Row> */}
          <JustifyBetweenColumn height="calc(100% - 1rem - 40px)">
            <SummaryCard
              body={
                <UserModalWorkingScheduleSettingsSummaryBody
                  workDayInWeek={workDayInWeek}
                  weeklyWorkTime={totalSeconds}
                  weeklyOffTrackingTime={weeklyOffTrackingTime}
                  userDefaultPayrollRate={userDefaultPayrollRate}
                />
              }
              footer={
                <UserModalWorkingScheduleSettingsSummaryFooter
                  workDayInWeek={workDayInWeek}
                  weeklyWorkTime={totalSeconds}
                  userDefaultPayrollRate={userDefaultPayrollRate}
                />
              }
            />
          </JustifyBetweenColumn>
          <Column margin="1rem 0 0 0" height="40px">
            <Button onClick={handleSave}>Save</Button>
          </Column>
        </Column>
      </JustifyBetweenRow>
    </ItemContainer>
  )
}

export default UserModalWorkingScheduleSettingsTab
