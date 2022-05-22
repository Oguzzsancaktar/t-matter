import React from 'react'
import {
  Button,
  Column,
  H1,
  InputRegular,
  InputWithIcon,
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterColumn,
  SalarySettingsSummaryBody,
  SalarySettingsSummaryFooter,
  SelectInput,
  SummaryCard
} from '@components/index'
import { DollarSign } from 'react-feather'
import { NOTIFICATION_BEFORE_AFTER, USER_ROLE_TYPES } from '@constants/statuses'

const DEFAULT_HOUR_IN_YEAR: number = 1920
const DEFAULT_INCREASE_YEAR_COUNT: number = 5
const DEFAULT_TEMPORARY_ARR: any[] = Array.apply(null, Array(DEFAULT_INCREASE_YEAR_COUNT)).map(function (x, i) {
  return i
})

const SalarySettings = () => {
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

  const handleSelectChange = (e: React.ChangeEvent) => {
    console.log(e)
  }

  return (
    <JustifyBetweenRow height="100%" margin="3rem 1rem" width="auto">
      <JustifyBetweenColumn height="100%">
        <Column margin="0 0 2rem 0">
          <H1>Default</H1>
          <InputWithIcon
            labelText="Default Payroll Rate"
            onBlur={() => console.log('blue')}
            children={<DollarSign size="16px" />}
            name="defaultPayrollRate"
            onChange={() => console.log('change')}
            placeholder="Default Payroll Rate"
            type="text"
          />
        </Column>

        {DEFAULT_TEMPORARY_ARR.map((_, index: number) => {
          return (
            <JustifyBetweenRow key={index} margin={`${index === 0 && '1rem'} 0 0 0`}>
              <InputRegular
                margin="0 1rem 0 0"
                labelText={index === 0 ? 'Default Payroll Rate' : null}
                name={'defaultPayrollRate' + index}
                onChange={() => console.log('change')}
                placeholder="Default Payroll Rate"
                type="text"
                value={DEFAULT_HOUR_IN_YEAR * (index + 1) + ' Hours'}
                disabled={true}
              />
              <InputRegular
                labelText={index === 0 ? 'Increase Rate' : null}
                name="defaultPayrollRate"
                onChange={() => console.log('change')}
                placeholder="Default Payroll Rate"
                type="text"
              />
            </JustifyBetweenRow>
          )
        })}
      </JustifyBetweenColumn>

      <JustifyBetweenColumn margin="0px 3rem" height="100%">
        <Column>
          <H1>Notifications</H1>
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
          <H1>Summary</H1>
          <SummaryCard body={<SalarySettingsSummaryBody />} footer={<SalarySettingsSummaryFooter />} />
        </JustifyBetweenColumn>
        <Column margin="1rem 0 0 0" height="40px">
          <Button>Save</Button>
        </Column>
      </JustifyCenterColumn>
    </JustifyBetweenRow>
  )
}

export default SalarySettings
