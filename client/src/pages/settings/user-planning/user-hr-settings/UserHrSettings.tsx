import React, { useEffect, useState } from 'react'
import { Button, Checkbox, DatePicker, IconButton, InputWithText, JustifyBetweenRow, SelectInput } from '@/components'
import {
  useGetUserHrSettingQuery,
  useGetUsersQuery,
  useUpdateUserHrSettingMutation
} from '@services/settings/user-planning/userService'
import { emptyQueryParams } from '@constants/queryParams'
import IUserHrSetting from '@models/Entities/user/IUserHrSetting'
import { HR_TASK_TYPES } from '@constants/hrTask'
import moment from 'moment'
import colors from '@constants/colors'
import { Plus, Trash } from 'react-feather'
import { days } from '@constants/dates'
import { toastSuccess } from '@utils/toastUtil'

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

const UserHrSettings = () => {
  const { data: users, isLoading: isUsersLoading } = useGetUsersQuery(emptyQueryParams)
  const { data: hrSetting } = useGetUserHrSettingQuery()
  const [update] = useUpdateUserHrSettingMutation()

  const [loginLogout, setLoginLogout] = useState<IUserHrSetting['loginLogout']>()
  const [monthlyWorking, setMonthlyWorking] = useState<IUserHrSetting['monthlyWorking']>()
  const [vocations, setVocations] = useState<IUserHrSetting['vocations']>([])
  const [specialDays, setSpecialDays] = useState<IUserHrSetting['specialDays']>([])

  const userOptions = users?.map(({ _id, firstname }) => ({ value: _id, label: firstname })) || []

  useEffect(() => {
    if (hrSetting) {
      setLoginLogout(hrSetting.loginLogout)
      setMonthlyWorking(hrSetting.monthlyWorking)
      setVocations(hrSetting.vocations)
      setSpecialDays(hrSetting.specialDays)
    }
  }, [hrSetting])

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

  const handleSave = async () => {
    if (specialDays && loginLogout && monthlyWorking && vocations) {
      await update({ specialDays, loginLogout, monthlyWorking, vocations, owner: undefined }).unwrap()
      toastSuccess('User HR settings saved successfully')
    }
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
          <div
            onClick={() => {
              if (monthlyWorking) {
                setMonthlyWorking({
                  ...monthlyWorking,
                  isChecked: !monthlyWorking.isChecked
                })
              }
            }}
            style={{ minWidth: 32 }}
          >
            <Checkbox isChecked={!!monthlyWorking?.isChecked} onChange={() => {}} />
          </div>
          <span style={{ minWidth: widths[1], marginRight: 16 }}>After 160 Hours</span>
          <span style={{ minWidth: widths[2], marginRight: 16 }}>Healthy mental days</span>
          <div style={{ minWidth: widths[3], marginRight: 16 }}>
            <SelectInput
              placeHolder="Days"
              selectedOption={days.filter(day => day.value === '' + monthlyWorking?.days) || days[0]}
              onChange={(e, o) => {
                if (monthlyWorking) {
                  setMonthlyWorking({
                    ...monthlyWorking,
                    days: +e.value
                  })
                }
              }}
              name="mental"
              options={days}
            />
          </div>
          <SelectInput
            isMulti
            selectedOption={userOptions.filter(({ value }) => monthlyWorking?.notificationReceivers?.includes(value))}
            placeHolder="Users"
            onChange={(e, o) => {
              if (monthlyWorking) {
                setMonthlyWorking({
                  ...monthlyWorking,
                  notificationReceivers: e.map(({ value }) => value)
                })
              }
            }}
            name="monthlyNotifyUsers"
            options={userOptions}
          />
        </JustifyBetweenRow>
        <JustifyBetweenRow margin="1rem 0 0 0">
          <div
            onClick={() => {
              if (loginLogout) {
                setLoginLogout({
                  ...loginLogout,
                  isChecked: !loginLogout.isChecked
                })
              }
            }}
            style={{ minWidth: 32 }}
          >
            <Checkbox isChecked={!!loginLogout?.isChecked} onChange={() => {}} />
          </div>
          <span style={{ minWidth: widths[1], marginRight: 16 }}>After 24 hours</span>
          <span style={{ minWidth: widths[2], marginRight: 16 }}>Absent days</span>
          <span style={{ minWidth: widths[3], marginRight: 16 }} />
          <SelectInput
            isMulti
            selectedOption={userOptions.filter(({ value }) => loginLogout?.notificationReceivers?.includes(value))}
            placeHolder="Users"
            onChange={e => {
              if (loginLogout) {
                setLoginLogout({
                  ...loginLogout,
                  notificationReceivers: e.map(({ value }) => value)
                })
              }
            }}
            name="monthlyNotifyUsers"
            options={userOptions}
          />
        </JustifyBetweenRow>
        {vocations?.map((vocation, index) => {
          return (
            <JustifyBetweenRow margin="1rem 0 0 0">
              <div
                onClick={() => {
                  if (vocation) {
                    setVocations([
                      ...vocations.slice(0, index),
                      {
                        ...vocation,
                        isChecked: !vocation.isChecked
                      },
                      ...vocations.slice(index + 1)
                    ])
                  }
                }}
                style={{ minWidth: 32 }}
              >
                <Checkbox isChecked={vocation.isChecked} onChange={() => {}} />
              </div>
              <span style={{ minWidth: widths[1], marginRight: 16 }}>After {vocation.afterHours} hours</span>
              <span style={{ minWidth: widths[2], marginRight: 16 }}>Vocation days</span>
              <div style={{ minWidth: widths[3], marginRight: 16 }}>
                <SelectInput
                  placeHolder="Days"
                  selectedOption={days.filter(day => day.value === '' + vocation.days) || days[0]}
                  onChange={e => {
                    if (vocations) {
                      setVocations([
                        ...vocations.slice(0, index),
                        {
                          ...vocation,
                          days: +e.value
                        },
                        ...vocations.slice(index + 1)
                      ])
                    }
                  }}
                  name="mental"
                  options={days}
                />
              </div>
              <SelectInput
                isMulti
                selectedOption={userOptions.filter(({ value }) => vocation.notificationReceivers?.includes(value))}
                placeHolder="Users"
                onChange={e => {
                  if (vocations) {
                    setVocations([
                      ...vocations.slice(0, index),
                      {
                        ...vocation,
                        notificationReceivers: e.map(({ value }) => value)
                      },
                      ...vocations.slice(index + 1)
                    ])
                  }
                }}
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
        <div style={{ maxHeight: 250, overflowY: 'auto' }}>
          {specialDays.map((s, i) => {
            return (
              <JustifyBetweenRow margin="1rem 0 0 0">
                <div
                  style={{
                    minWidth: 32
                  }}
                  onClick={() => {
                    setSpecialDays([
                      ...specialDays.slice(0, i),
                      {
                        ...s,
                        isChecked: !s.isChecked
                      },
                      ...specialDays.slice(i + 1)
                    ])
                  }}
                >
                  <Checkbox isChecked={s.isChecked} onChange={() => {}} />
                </div>
                <div style={{ minWidth: 220, marginRight: 16 }}>
                  <InputWithText
                    name="name"
                    value={s.name}
                    onChange={e => {
                      setSpecialDays([
                        ...specialDays.slice(0, i),
                        {
                          ...s,
                          name: e.target.value
                        },
                        ...specialDays.slice(i + 1)
                      ])
                    }}
                  />
                </div>
                <div style={{ minWidth: 150, marginRight: 16 }}>
                  <DatePicker
                    placeholder="Select start"
                    name={'startDate'}
                    onChange={(value, dateText) => {
                      setSpecialDays([
                        ...specialDays.slice(0, i),
                        {
                          ...s,
                          startDate: dateText
                        },
                        ...specialDays.slice(i + 1)
                      ])
                    }}
                    value={moment(s.startDate).toDate()}
                  />
                </div>
                <div style={{ minWidth: 150, marginRight: 16 }}>
                  <DatePicker
                    placeholder="Select end"
                    name={'endDate'}
                    onChange={(value, dateText) => {
                      setSpecialDays([
                        ...specialDays.slice(0, i),
                        {
                          ...s,
                          endDate: dateText
                        },
                        ...specialDays.slice(i + 1)
                      ])
                    }}
                    value={moment(s.endDate).toDate()}
                  />
                </div>
                <SelectInput
                  isMulti
                  selectedOption={userOptions.filter(({ value }) => s.notificationReceivers?.includes(value))}
                  placeHolder="Users"
                  onChange={e => {
                    if (specialDays) {
                      setSpecialDays([
                        ...specialDays.slice(0, i),
                        {
                          ...s,
                          notificationReceivers: e.map(({ value }) => value)
                        },
                        ...specialDays.slice(i + 1)
                      ])
                    }
                  }}
                  name="monthlyNotifyUsers"
                  options={userOptions}
                />
                <div style={{ marginLeft: 16 }}>
                  <IconButton
                    onClick={() => {
                      setSpecialDays([...specialDays.slice(0, i), ...specialDays.slice(i + 1)])
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
        </div>
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
          <InfoRow
            title="Totally vocation days in 5 years"
            count={vocations.reduce((acc, curr) => {
              return acc + curr.days
            }, 0)}
          />
          <InfoRow
            title="Totally yearly healthy mental days"
            count={(monthlyWorking?.days ? monthlyWorking?.days : 1) * 12}
          />
          <InfoRow title="Totally yearly absent days" count={12} />
        </div>
        <Button onClick={handleSave} height="40px">
          Save
        </Button>
      </div>
    </JustifyBetweenRow>
  )
}

export default UserHrSettings
