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
import { SalarySettingsSummaryBody, SalarySettingsSummaryFooter } from '@/pages'
import {
  useGetSalarySettingsQuery,
  usePatchSalarySettingsMutation
} from '@/services/settings/company-planning/salarySettingsService'
import { ISalarySettings } from '@/models'
import { toastSuccess } from '@/utils/toastUtil'

const DEFAULT_PAYROLL_RATE: number = 30
const DEFAULT_HOUR_IN_YEAR: number = 1920
const DEFAULT_INCREASE_YEAR_COUNT: number = 5

const DEFAULT_TEMPORARY_ARR: any[] = Array.apply(null, Array(DEFAULT_INCREASE_YEAR_COUNT)).map(function (x, i) {
  return i
})

const DEFAULT_INCREASE_PERCENTAGE = 20

const SalarySettings = () => {
  const { data: salarySettingsData, isLoading: isSalarySettingsDataLoading } = useGetSalarySettingsQuery()
  const [
    patchSalarySettings,
    { data: updatedSalarySettingsData, isLoading: isUpdateLoading, status: salarySettingUpdateStatus }
  ] = usePatchSalarySettingsMutation()

  const [salarySettingsStateData, setSalarySettingsStateData] = useState<ISalarySettings>({
    _id: salarySettingsData?._id,
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
    if (salarySettingsData && salarySettingsData?.defaultPayrollRate && salarySettingsData?.payrollIncreases) {
      setSalarySettingsStateData({
        _id: salarySettingsData?._id,
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
        _id: updatedSalarySettingsData._id,
        defaultPayrollRate: updatedSalarySettingsData?.defaultPayrollRate,
        payrollIncreases: updatedSalarySettingsData?.payrollIncreases
      })
    }
  }, [updatedSalarySettingsData])

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
    await patchSalarySettings(salarySettingsStateData)
    toastSuccess('Salary settings updated successfully')
  }

  return (
    <JustifyBetweenRow height="100%" width="auto">
      {isSalarySettingsDataLoading && isUpdateLoading && salarySettingsStateData ? (
        <div>Loading...</div>
      ) : (
        <>
          <JustifyBetweenColumn height="100%" margin="0 2rem 0 0">
            <Column margin="0 0 2rem 0">
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
              <SummaryCard
                body={<SalarySettingsSummaryBody data={salarySettingsStateData} />}
                footer={<SalarySettingsSummaryFooter data={salarySettingsStateData} />}
              />
            </JustifyBetweenColumn>
            <ItemContainer margin="1rem 0 0 0" height="40px">
              <Button disabled={isSalarySettingsDataLoading || isUpdateLoading} onClick={handleSave}>
                Save
              </Button>
            </ItemContainer>
          </JustifyCenterColumn>
        </>
      )}
    </JustifyBetweenRow>
  )
}

export default SalarySettings
