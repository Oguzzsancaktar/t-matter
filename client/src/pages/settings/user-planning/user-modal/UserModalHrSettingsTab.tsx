import React, { useState } from 'react'
import { IUser } from '@/models'
import { Checkbox, JustifyBetweenColumn, JustifyBetweenRow, SelectInput } from '@/components'
import { useGetUserCompanyPricingQuery } from '@services/settings/company-planning/companyPricingService'
import { getUserMonthlyWorkingHours } from '@utils/workingHourUtil'
import { useGetUserHrSettingQuery, useGetUsersQuery } from '@services/settings/user-planning/userService'
import { emptyQueryParams } from '@constants/queryParams'

const days = [
  { value: 1, label: '1 Days' },
  { value: 2, label: '2 Days' },
  { value: 3, label: '3 Days' },
  { value: 4, label: '4 Days' },
  { value: 5, label: '5 Days' },
  { value: 6, label: '6 Days' },
  { value: 7, label: '7 Days' }
]

const widths = {
  1: 220,
  2: 270,
  3: 200
}

const UserModalHrSettingsTab: React.FC<{ userId: IUser['_id'] }> = ({ userId }) => {
  const { data } = useGetUserCompanyPricingQuery(userId)
  const { data: users, isLoading: isUsersLoading } = useGetUsersQuery(emptyQueryParams)
  const { data: hrSetting } = useGetUserHrSettingQuery(userId)
  console.log(data)
  const [specialDays, setSpecialDays] = useState([])
  if (!data) return null

  const userOptions = users?.map(({ _id, firstname }) => ({ value: _id, label: firstname })) || []

  return (
    <JustifyBetweenRow>
      <JustifyBetweenColumn width="70%">
        <JustifyBetweenRow>
          <Checkbox isChecked={false} onChange={() => {}} />
          <span style={{ width: widths[1], marginRight: 16 }}>
            After {getUserMonthlyWorkingHours(data.workingSchedule)} Hours
          </span>
          <span style={{ width: widths[2], marginRight: 16 }}>Healthy mental days</span>
          <div style={{ width: widths[3], marginRight: 16 }}>
            <SelectInput placeHolder="Days" onChange={() => {}} name="mental" options={days} />
          </div>
          <SelectInput
            isMulti
            // selectedOption={userOptions}
            placeHolder="Users"
            onChange={() => {}}
            name="monthlyNotifyUsers"
            options={userOptions}
          />
        </JustifyBetweenRow>
        <JustifyBetweenRow margin="1rem 0 0 0">
          <Checkbox isChecked={false} onChange={() => {}} />
          <span style={{ width: widths[1], marginRight: 16 }}>After 24 hours</span>
          <span style={{ width: widths[2], marginRight: 16 }}>Absent days</span>
          <span style={{ width: widths[3], marginRight: 16 }} />
          <SelectInput
            isMulti
            // selectedOption={userOptions}
            placeHolder="Users"
            onChange={() => {}}
            name="monthlyNotifyUsers"
            options={userOptions}
          />
        </JustifyBetweenRow>
        <hr style={{ height: 1, width: '100%', marginTop: 16 }} />
        {[1920, 3840, 5760, 7680, 9600].map(hours => {
          return (
            <JustifyBetweenRow margin="1rem 0 0 0">
              <Checkbox isChecked={false} onChange={() => {}} />
              <span style={{ width: widths[1], marginRight: 16 }}>After {hours} hours</span>
              <span style={{ width: widths[2], marginRight: 16 }}>Vocation days</span>
              <div style={{ width: widths[3], marginRight: 16 }}>
                <SelectInput placeHolder="Days" onChange={() => {}} name="mental" options={days} />
              </div>
              <SelectInput
                isMulti
                // selectedOption={userOptions}
                placeHolder="Users"
                onChange={() => {}}
                name="monthlyNotifyUsers"
                options={userOptions}
              />
            </JustifyBetweenRow>
          )
        })}
        {specialDays.map(s => {
          return (
            <JustifyBetweenRow margin="1rem 0 0 0">
              <Checkbox isChecked={false} onChange={() => {}} />
              <span style={{ width: widths[1], marginRight: 16 }}>{s}</span>
            </JustifyBetweenRow>
          )
        })}
      </JustifyBetweenColumn>
    </JustifyBetweenRow>
  )
}

export default UserModalHrSettingsTab
