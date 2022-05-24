import React, { useEffect, useState } from 'react'
import {
  Button,
  Column,
  H1,
  InputRegular,
  InputWithIcon,
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterColumn,
  Row,
  SelectInput,
  SummaryCard
} from '@components/index'
import { DollarSign, Percent } from 'react-feather'
import { NOTIFICATION_BEFORE_AFTER, USER_ROLE_TYPES } from '@constants/statuses'
import { SalarySettingsSummaryBody, SalarySettingsSummaryFooter } from '@/pages'
import {
  useGetSalarySettingsQuery,
  usePatchSalarySettingsMutation
} from '@/services/settings/company-panning/salarySettings'
import { ISalarySettings } from '@/models'

const DEFAULT_PAYROLL_RATE: number = 30
const DEFAULT_HOUR_IN_YEAR: number = 1920
const DEFAULT_INCREASE_YEAR_COUNT: number = 5

const DEFAULT_TEMPORARY_ARR: any[] = Array.apply(null, Array(DEFAULT_INCREASE_YEAR_COUNT)).map(function (x, i) {
  return i
})

const DEFAULT_INCREASE_PERCENTAGE = 20

const SalarySettings = () => {
  const { data: salarySettingsData, isLoading: isSalarySettingsDataLoading } = useGetSalarySettingsQuery()
  const [patchSalarySettings, { data: updatedSalarySettingsData, isLoading: isUpdateLoading }] =
    usePatchSalarySettingsMutation()

  const [salarySettingsStateData, setSalarySettingsStateData] = useState<ISalarySettings>({
    defaultPayrollRate: DEFAULT_PAYROLL_RATE,
    payrollIncreases: [
      {
        increaseHour: DEFAULT_HOUR_IN_YEAR,
        increaseRate: DEFAULT_INCREASE_PERCENTAGE
      },
      {
        increaseHour: DEFAULT_HOUR_IN_YEAR * 2,
        increaseRate: DEFAULT_INCREASE_PERCENTAGE
      },
      {
        increaseHour: DEFAULT_HOUR_IN_YEAR * 3,
        increaseRate: DEFAULT_INCREASE_PERCENTAGE
      },
      {
        increaseHour: DEFAULT_HOUR_IN_YEAR * 4,
        increaseRate: DEFAULT_INCREASE_PERCENTAGE
      },
      {
        increaseHour: DEFAULT_HOUR_IN_YEAR * 5,
        increaseRate: DEFAULT_INCREASE_PERCENTAGE
      }
    ]
  })

  const notificationOptions = [
    { value: NOTIFICATION_BEFORE_AFTER.AFTER, label: 'After' },
    { value: NOTIFICATION_BEFORE_AFTER.BEFORE, label: 'Before' }
  ]

  const userTaskOptions = [
    { value: 'task1', label: 'Task 1' },
    { value: 'task2', label: 'Task 2' }
  ]

  const userRoleOptions = [
    { value: USER_ROLE_TYPES.ADMIN, label: 'Admin' },
    { value: USER_ROLE_TYPES.USER, label: 'User' }
  ]

  useEffect(() => {
    if (salarySettingsData && salarySettingsData?.defaultPayrollRate && salarySettingsData?.payrollIncreases) {
      setSalarySettingsStateData({
        defaultPayrollRate: salarySettingsData?.defaultPayrollRate,
        payrollIncreases: salarySettingsData?.payrollIncreases
      })
    }
  }, [salarySettingsData])

  useEffect(() => {
    if (
      updatedSalarySettingsData &&
      updatedSalarySettingsData?.defaultPayrollRate &&
      updatedSalarySettingsData?.payrollIncreases
    ) {
      setSalarySettingsStateData({
        defaultPayrollRate: updatedSalarySettingsData?.defaultPayrollRate,
        payrollIncreases: updatedSalarySettingsData?.payrollIncreases
      })
    }
  }, [updatedSalarySettingsData])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSalarySettingsStateData({ ...salarySettingsStateData, [event.target.name]: event.target.value })
  }

  const handlePayrollRateInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let payrollIncreasesClone = [...salarySettingsStateData.payrollIncreases]
    payrollIncreasesClone[index].increaseRate = +event.target.value
    console.log(payrollIncreasesClone)
    setSalarySettingsStateData({ ...salarySettingsStateData, payrollIncreases: payrollIncreasesClone })
  }

  const handleSelectChange = (e: React.ChangeEvent) => {
    console.log(e)
  }

  const handleSave = () => {
    patchSalarySettings(salarySettingsStateData)
  }

  return (
    <JustifyBetweenRow height="100%" width="auto">
      {isSalarySettingsDataLoading && isUpdateLoading && salarySettingsStateData ? (
        <div>Loading...</div>
      ) : (
        <>
          <JustifyBetweenColumn height="100%">
            <Column margin="0 0 2rem 0">
              <Row margin="0 0 2rem 0">
                <H1>Default</H1>
              </Row>
              <InputWithIcon
                labelText="Default Payroll Rate"
                onBlur={() => console.log('blue')}
                children={<DollarSign size="16px" />}
                name="defaultPayrollRate"
                onChange={handleInputChange}
                placeholder="Default Payroll Rate"
                type="number"
                value={salarySettingsStateData.defaultPayrollRate}
              />
            </Column>

            {DEFAULT_TEMPORARY_ARR.map((_, index: number) => {
              return (
                <JustifyBetweenRow key={index} margin={`${index === 0 && '1rem'} 0 0 0`}>
                  <InputRegular
                    margin="0 1rem 0 0"
                    labelText={index === 0 ? 'Default Payroll Rate' : null}
                    name={'totalHoursInYear' + index}
                    onChange={() => console.log('cant change !!')}
                    placeholder="Default Payroll Rate"
                    type="text"
                    value={DEFAULT_HOUR_IN_YEAR * (index + 1) + ' Hours'}
                    disabled={true}
                  />
                  <InputWithIcon
                    labelText={index === 0 ? 'Increase Rate' : null}
                    name={'increasedPercentage' + index}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handlePayrollRateInputChange(event, index)
                    }
                    placeholder="Default Payroll Rate"
                    type="number"
                    value={salarySettingsStateData.payrollIncreases[index].increaseRate}
                    children={<Percent size="16px" />}
                  />
                </JustifyBetweenRow>
              )
            })}
          </JustifyBetweenColumn>

          <JustifyBetweenColumn margin="0px 3rem" height="100%">
            <Column>
              <Row margin="0 0 2rem 0">
                <H1>Notifications</H1>
              </Row>
              <SelectInput
                name="notificationType"
                options={notificationOptions}
                isClearable={false}
                labelText="Type"
                onChange={handleSelectChange}
              />
            </Column>
            <JustifyBetweenRow>
              <SelectInput
                name="taskType"
                options={userTaskOptions}
                isClearable={false}
                labelText="Create Task"
                onChange={handleSelectChange}
              />
            </JustifyBetweenRow>

            <JustifyBetweenRow>
              <SelectInput
                name="sendAllertFor"
                options={userRoleOptions}
                isClearable={false}
                labelText="Send Alert"
                isMulti={true}
                onChange={handleSelectChange}
              />
            </JustifyBetweenRow>
          </JustifyBetweenColumn>

          <JustifyCenterColumn height="100%">
            <JustifyBetweenColumn height="calc(100% - 1rem - 40px)">
              <Row margin="0 0 2rem 0">
                <H1>Summary</H1>
              </Row>
              <SummaryCard
                body={<SalarySettingsSummaryBody data={salarySettingsStateData} />}
                footer={<SalarySettingsSummaryFooter data={salarySettingsStateData} />}
              />
            </JustifyBetweenColumn>
            <Column margin="1rem 0 0 0" height="40px">
              <Button onClick={handleSave}>Save</Button>
            </Column>
          </JustifyCenterColumn>
        </>
      )}
    </JustifyBetweenRow>
  )
}

export default SalarySettings
