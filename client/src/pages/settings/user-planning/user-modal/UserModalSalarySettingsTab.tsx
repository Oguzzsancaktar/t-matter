import React, { useEffect, useState } from 'react'
import {
  Button,
  Column,
  InputRegular,
  InputWithIcon,
  ItemContainer,
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterColumn,
  SummaryCard
} from '@components/index'
import { DollarSign, Percent } from 'react-feather'

import { UserModalSalarySettingsSummaryBody, UserModalSalarySettingsSummaryFooter } from '@/pages'
import {
  useGetUserSalarySettingsQuery,
  usePatchUserSalarySettingsMutation
} from '@/services/settings/company-planning/salarySettingsService'
import { ISalarySettings, IUser } from '@/models'
import { toastSuccess } from '@/utils/toastUtil'
import { companyPricingApi } from '@/services/settings/company-planning/companyPricingService'
import useAccessStore from '@/hooks/useAccessStore'

const DEFAULT_PAYROLL_RATE: number = 30
const DEFAULT_HOUR_IN_YEAR: number = 1920
const DEFAULT_INCREASE_YEAR_COUNT: number = 5

const DEFAULT_TEMPORARY_ARR: any[] = Array.apply(null, Array(DEFAULT_INCREASE_YEAR_COUNT)).map(function (x, i) {
  return i
})

const DEFAULT_INCREASE_PERCENTAGE = 20

interface IProps {
  userId: IUser['_id']
}
const UserModalSalarySettingsTab: React.FC<IProps> = ({ userId }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [
    patchUserSalarySettings,
    { data: updatedUserSalarySettingsData, isLoading: isUpdateLoading, status: salarySettingUpdateStatus }
  ] = usePatchUserSalarySettingsMutation()

  const { isLoading: isUserSalarySettingsLoading, data: userSalarySettingsData } = useGetUserSalarySettingsQuery(userId)

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

  useEffect(() => {
    if (
      userSalarySettingsData &&
      userSalarySettingsData?.defaultPayrollRate &&
      userSalarySettingsData?.payrollIncreases
    ) {
      setSalarySettingsStateData({
        _id: userSalarySettingsData?._id,
        defaultPayrollRate: userSalarySettingsData?.defaultPayrollRate,
        payrollIncreases: userSalarySettingsData?.payrollIncreases
      })
    }
  }, [userSalarySettingsData])

  useEffect(() => {
    if (
      updatedUserSalarySettingsData &&
      updatedUserSalarySettingsData?.defaultPayrollRate &&
      updatedUserSalarySettingsData?.payrollIncreases
    ) {
      setSalarySettingsStateData({
        _id: updatedUserSalarySettingsData._id,
        defaultPayrollRate: updatedUserSalarySettingsData?.defaultPayrollRate,
        payrollIncreases: updatedUserSalarySettingsData?.payrollIncreases
      })
    }
  }, [updatedUserSalarySettingsData])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSalarySettingsStateData({ ...salarySettingsStateData, [event.target.name]: event.target.value })
  }

  const handlePayrollRateInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newPayrollIncreases = salarySettingsStateData.payrollIncreases.map((payrollIncrease, i) => {
      if (i === index) {
        return { ...payrollIncrease, increaseRate: +event.target.value }
      }
      return payrollIncrease
    })
    setSalarySettingsStateData({ ...salarySettingsStateData, payrollIncreases: newPayrollIncreases })
  }

  const handleSave = async () => {
    await patchUserSalarySettings({ ...salarySettingsStateData, userId })
    dispatch(companyPricingApi.util.resetApiState())

    toastSuccess('Salary settings updated successfully')
  }

  return (
    <JustifyBetweenRow height="100%" width="auto">
      {isUserSalarySettingsLoading && isUpdateLoading && salarySettingsStateData ? (
        <div>Loading...</div>
      ) : (
        <>
          <JustifyBetweenColumn height="100%" margin="0 2rem 0 0">
            <Column margin="0 0 2rem 0">
              {/* <Row margin="0 0 2rem 0">
                <H1>Default</H1>
              </Row> */}
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

          <JustifyCenterColumn height="100%">
            <JustifyBetweenColumn height="calc(100% - 1rem - 40px)">
              {/* <ItemContainer margin="0 0 2rem 0">
                <H1>Summary</H1>
              </ItemContainer> */}
              <SummaryCard
                body={<UserModalSalarySettingsSummaryBody data={salarySettingsStateData} />}
                footer={<UserModalSalarySettingsSummaryFooter data={salarySettingsStateData} />}
              />
            </JustifyBetweenColumn>
            <ItemContainer margin="1rem 0 0 0" height="40px">
              <Button disabled={isUserSalarySettingsLoading || isUpdateLoading} onClick={handleSave}>
                Save
              </Button>
            </ItemContainer>
          </JustifyCenterColumn>
        </>
      )}
    </JustifyBetweenRow>
  )
}

export default UserModalSalarySettingsTab
