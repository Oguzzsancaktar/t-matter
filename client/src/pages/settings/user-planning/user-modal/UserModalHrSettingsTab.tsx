import React, { useState } from 'react'
import {
  Button,
  Checkbox,
  Column,
  DatePicker,
  IconButton,
  InputWithText,
  JustifyBetweenColumn,
  JustifyBetweenRow,
  SelectInput
} from '@/components'
import { useGetUsersQuery } from '@services/settings/user-planning/userService'
import { emptyQueryParams } from '@constants/queryParams'
import { useGetUserCompanyPricingQuery } from '@services/settings/company-planning/companyPricingService'
import { getUserMonthlyWorkingHours } from '@utils/workingHourUtil'
import styled from 'styled-components'
import IUserHrSetting from '@models/Entities/user/IUserHrSetting'
import { HR_TASK_TYPES } from '@constants/hrTask'
import moment from 'moment'
import { Input } from '@nextui-org/react'
import colors from '@constants/colors'
import { Edit, Plus, Trash } from 'react-feather'
import { IUser } from '@/models'
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
  1: 200,
  2: 200,
  3: 200
}

const InfoRow = ({ title, count }) => {
  return (
    <JustifyBetweenRow height="50px">
      <span style={{ fontSize: 16, height: 50, fontFamily: 'Satoshi-Medium', marginRight: 4 }}>{title}</span>
      <div style={{ minWidth: 70, maxWidth: 70, display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: 1, height: 50, backgroundColor: '#ccc' }} />
        <span style={{ fontSize: 16, fontFamily: 'Satoshi-Medium' }}>{count} days</span>
      </div>
    </JustifyBetweenRow>
  )
}

const UserHrSettings: React.FC<{ userId: IUser['_id'] }> = ({ userId }) => {
  const { data: users, isLoading: isUsersLoading } = useGetUsersQuery(emptyQueryParams)
  const { data } = useGetUserCompanyPricingQuery(userId)

  const [specialDays, setSpecialDays] = useState<IUserHrSetting['specialDays'][]>([])

  const userOptions = users?.map(({ _id, firstname }) => ({ value: _id, label: firstname })) || []

  if (!data) return null

  const handleAddSpecialDay = () => {
    setSpecialDays([
      ...specialDays,
      {
        isChecked: false,
        taskType: HR_TASK_TYPES.OTHERS,
        name: '',
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
        notificationReceivers: []
      }
    ])
  }

  return (
    <JustifyBetweenRow height="100%">
      <div style={{ height: '100%', marginRight: '1rem', minWidth: '70%' }}>
        <JustifyBetweenRow margin="0 0 0.25rem 0">
          <div style={{ width: 32 }} />
          <div style={{ minWidth: widths[1], marginRight: 16 }}>After</div>
          <div style={{ minWidth: widths[2], marginRight: 16 }}>Task</div>
          <div style={{ minWidth: widths[3], marginRight: 16 }}>Days</div>
          <div style={{ flex: 1 }}>Users</div>
        </JustifyBetweenRow>
        <hr style={{ marginBottom: 16 }} />
        <JustifyBetweenRow>
          <div style={{ minWidth: 32 }}>
            <Checkbox isChecked={false} onChange={() => {}} />
          </div>
          <span style={{ minWidth: widths[1], marginRight: 16 }}>
            After {getUserMonthlyWorkingHours(data.workingSchedule)} Hours
          </span>
          <span style={{ minWidth: widths[2], marginRight: 16 }}>Healthy mental days</span>
          <div style={{ minWidth: widths[3], marginRight: 16 }}>
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
          <div style={{ minWidth: 32 }}>
            <Checkbox isChecked={false} onChange={() => {}} />
          </div>
          <span style={{ minWidth: widths[1], marginRight: 16 }}>After 24 hours</span>
          <span style={{ minWidth: widths[2], marginRight: 16 }}>Absent days</span>
          <span style={{ minWidth: widths[3], marginRight: 16 }} />
          <SelectInput
            isMulti
            // selectedOption={userOptions}
            placeHolder="Users"
            onChange={() => {}}
            name="monthlyNotifyUsers"
            options={userOptions}
          />
        </JustifyBetweenRow>
        {[1920, 3840, 5760, 7680, 9600].map(hours => {
          return (
            <JustifyBetweenRow margin="1rem 0 0 0">
              <div style={{ minWidth: 32 }}>
                <Checkbox isChecked={false} onChange={() => {}} />
              </div>
              <span style={{ minWidth: widths[1], marginRight: 16 }}>After {hours} hours</span>
              <span style={{ minWidth: widths[2], marginRight: 16 }}>Vocation days</span>
              <div style={{ minWidth: widths[3], marginRight: 16 }}>
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

        <JustifyBetweenRow margin="1rem 0 0.25rem 0">
          <div style={{ width: 32 }} />
          <div style={{ minWidth: 220, marginRight: 16 }}>Name</div>
          <div style={{ minWidth: 150, marginRight: 16 }}>Start Date</div>
          <div style={{ minWidth: 150, marginRight: 16 }}>End Date</div>
          <div style={{ flex: 1 }}>Users</div>
        </JustifyBetweenRow>
        <hr style={{ marginBottom: 16 }} />
        {specialDays.map((s, i) => {
          return (
            <JustifyBetweenRow margin="1rem 0 0 0">
              <div
                style={{
                  minWidth: 32
                }}
                onClick={() => {
                  const newSpecialDays = [...specialDays]
                  newSpecialDays[i].isChecked = !newSpecialDays[i].isChecked
                  setSpecialDays(newSpecialDays)
                }}
              >
                <Checkbox isChecked={s.isChecked} onChange={() => {}} />
              </div>
              <div style={{ minWidth: 220, marginRight: 16 }}>
                <InputWithText
                  name="name"
                  value={s.name}
                  onChange={e => {
                    const newSpecialDays = [...specialDays]
                    newSpecialDays[i].name = e.target.value
                    setSpecialDays(newSpecialDays)
                  }}
                />
              </div>
              <div style={{ minWidth: 150, marginRight: 16 }}>
                <DatePicker
                  placeholder="Select start"
                  name={'startDate'}
                  onChange={(value, dateText) => {
                    const newSpecialDays = [...specialDays]
                    newSpecialDays[i].startDate = dateText
                    setSpecialDays(newSpecialDays)
                  }}
                  value={moment(s.startDate).toDate()}
                />
              </div>
              <div style={{ minWidth: 150, marginRight: 16 }}>
                <DatePicker
                  placeholder="Select end"
                  name={'endDate'}
                  onChange={(value, dateText) => {
                    const newSpecialDays = [...specialDays]
                    newSpecialDays[i].endDate = dateText
                    setSpecialDays(newSpecialDays)
                  }}
                  value={moment(s.endDate).toDate()}
                />
              </div>
              <SelectInput
                isMulti
                // selectedOption={userOptions}
                placeHolder="Users"
                onChange={() => {}}
                name="monthlyNotifyUsers"
                options={userOptions}
              />
              <div style={{ marginLeft: 16 }}>
                <IconButton
                  onClick={() => {
                    const newSpecialDays = [...specialDays]
                    newSpecialDays.splice(i, 1)
                    setSpecialDays(newSpecialDays)
                  }}
                  bgColor={colors.red.primary}
                  width="30px"
                  height="30px"
                  margin="0 .2rem 0 0"
                  children={<Trash size={'16px'} color="#fff" />}
                />
              </div>
            </JustifyBetweenRow>
          )
        })}
        <JustifyBetweenRow>
          <JustifyBetweenRow margin="1rem 0 0 0">
            <div />
            <IconButton
              onClick={handleAddSpecialDay}
              bgColor={colors.green.primary}
              width="30px"
              height="30px"
              margin="0 .2rem 0 0"
              children={<Plus size={'16px'} color="#fff" />}
            />
          </JustifyBetweenRow>
        </JustifyBetweenRow>
      </div>
      <div style={{ border: '1px solid #ccc', padding: 16, width: '100%', height: '100%', borderRadius: 4 }}>
        <div
          style={{
            height: 'calc(100% - 56px)',
            width: '100%',
            backgroundColor: '#f6f4f4',
            marginBottom: 16,
            display: 'flex',
            flexDirection: 'column',
            padding: 16,
            borderRadius: 4
          }}
        >
          <InfoRow title="Totally vocation days in 5 years" count={49} />
          <InfoRow title="Totally yearly healthy mental days" count={12} />
          <InfoRow title="Totally yearly absent days" count={12} />
        </div>
        <Button height="40px">Save</Button>
      </div>
    </JustifyBetweenRow>
  )
}

export default UserHrSettings
