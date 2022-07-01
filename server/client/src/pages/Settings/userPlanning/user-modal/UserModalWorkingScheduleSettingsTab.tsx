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
import initialWorkingSchedule from '@/constants/workingSchedule'

import { IDailyWorkingHours, EDays, IOption, IUser, EPayrollType } from '@/models'
import { UserModalWorkingScheduleSettingsSummaryBody, UserModalWorkingScheduleSettingsSummaryFooter } from '@/pages'
import {
  useGetUserCompanyPricingQuery,
  usePatchUserCompanyPricingMutation
} from '@/services/settings/company-planning/companyPricingService'
import { clockToSeconds, secondsToTimeString, secondsToHourMin, timeToSeconds } from '@/utils/timeUtils'
import { toastWarning, toastSuccess } from '@/utils/toastUtil'
import React, { useEffect, useState } from 'react'

interface IProps {
  userId: IUser['_id']
}
const UserModalWorkingScheduleSettingsTab: React.FC<IProps> = ({ userId }) => {
  const [totalMinutes, setTotalMinutes] = useState(0)

  const [payrollType, setPayrollType] = useState<number>(0)
  const [payrollDay, setPayrollDay] = useState(1)

  const [workDayInWeek, setWorkDayInWeek] = useState<number>(0)
  const [weeklyOffTrackingTime, setWeeklyOffTrackingTime] = useState<number>(0)

  const [dailyWorkTimeData, setDailyWorkTimeData] = useState<IDailyWorkingHours>({ ...initialWorkingSchedule })

  const { data: userDailyWorkingHourData, isLoading: userDailyWorkingHourIsLoading } =
    useGetUserCompanyPricingQuery(userId)

  const [patchUserworkingSchedule, { isLoading: isUpdateLoading }] = usePatchUserCompanyPricingMutation()

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
    setPayrollType(EPayrollType[option.value])
    setPayrollDay(1)
  }

  const handlePayrollDay = (option: IOption) => {
    setPayrollDay(+option.value)
  }

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault()
    await patchUserworkingSchedule({
      workingSchedule: dailyWorkTimeData,
      payrollDay,
      payrollType: +payrollType,
      userId
    })

    toastSuccess('Company pricing updated successfully')
  }

  console.log(4444, userDailyWorkingHourData)

  useEffect(() => {
    if (userDailyWorkingHourData && !userDailyWorkingHourIsLoading) {
      console.log(5555, userDailyWorkingHourData)
      setPayrollDay(userDailyWorkingHourData.payrollDay)
      setDailyWorkTimeData(userDailyWorkingHourData.workingSchedule)
    }
  }, [userDailyWorkingHourData, userDailyWorkingHourIsLoading])

  return (
    <ItemContainer>
      {userDailyWorkingHourIsLoading && isUpdateLoading && userDailyWorkingHourData ? (
        <div>Loading...</div>
      ) : (
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
                        isChecked={dailyWorkTimeData[EDays[day]]?.isChecked === 1 ? true : false}
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
                      disabled={dailyWorkTimeData[EDays[day]]?.isChecked === 1 ? true : false}
                      value={dailyWorkTimeData[EDays[day]]?.startTime}
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
                      disabled={dailyWorkTimeData[EDays[day]]?.isChecked === 1 ? true : false}
                      value={dailyWorkTimeData[EDays[day]]?.endTime}
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
                      disabled={dailyWorkTimeData[EDays[day]]?.isChecked === 1 ? true : false}
                      value={dailyWorkTimeData[EDays[day]]?.offTrackingTime}
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
                  // selectedOption={payrollTypeOptions.filter(option => +option.value === payrollType)}
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
                      option => option.value === payrollDayOptions[payrollDay].value
                    )}
                    labelText="Payroll Day"
                    name={'payrollDay'}
                    options={payrollDayOptions}
                    onChange={handlePayrollDay}
                  />
                ) : (
                  <SelectInput
                    selectedOption={payrollDateOptions.filter(
                      option => option.value === payrollDateOptions[payrollDay].value
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
            <Row margin="0 0 2rem 0">
              <H1>Summary</H1>
            </Row>
            <JustifyBetweenColumn height="calc(100% - 1rem - 40px - 2rem - 18px)">
              <SummaryCard
                body={
                  <UserModalWorkingScheduleSettingsSummaryBody
                    workDayInWeek={workDayInWeek}
                    weeklyWorkTime={totalMinutes}
                    weeklyOffTrackingTime={weeklyOffTrackingTime}
                  />
                }
                footer={
                  <UserModalWorkingScheduleSettingsSummaryFooter
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
      )}
    </ItemContainer>
  )
}

export default UserModalWorkingScheduleSettingsTab
