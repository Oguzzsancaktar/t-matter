import React, { useEffect, useState } from 'react'
import {
  Checkbox,
  Column,
  H1,
  InputWithIcon,
  ItemContainer,
  JustifyBetweenRow,
  JustifyCenterRow,
  Row,
  SelectInput
} from '@/components'
import colors from '@constants/colors'
import { Clock, DollarSign, Percent } from 'react-feather'
import { useGetUsersQuery } from '@services/settings/user-planning/userService'
import emptyQueryParams from '@constants/queryParams'
import { defaultPaymentSettings, feeCalculationTypeOptions } from '@/constants/financePlanning'
import {
  useGetFinancePlanningQuery,
  useUpdateFinancePlanningMutation
} from '@services/settings/finance-planning/financePlanningService'
import { IFinancePlanning } from '@/models'
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import useConstant from 'use-constant'
const PaymentSettingsTab = () => {
  const [state, setState] = useState<IFinancePlanning>({
    ...defaultPaymentSettings
  })

  const { data: users, isLoading: isUsersLoading } = useGetUsersQuery(emptyQueryParams)
  const { data, isLoading } = useGetFinancePlanningQuery()
  const [updateFinancePlanning] = useUpdateFinancePlanningMutation()
  const updateDebounce = useConstant(() => AwesomeDebouncePromise(updateFinancePlanning, 500))

  useEffect(() => {
    if (data) {
      setState({ ...data })
    }
  }, [data])

  const selectedPastDueLateFeeCalculationType = feeCalculationTypeOptions.find(
    ({ value }) => value === state.pastDueLateFee.feeCalculationType
  )
  const selectedSuspendedFeeCalculationType = feeCalculationTypeOptions.find(
    ({ value }) => value === state.suspendedFee.feeCalculationType
  )

  const userOptions = users?.map(({ _id, firstname }) => ({ value: _id, label: firstname })) || []
  const selectedPastDueLateFeeNotificationUsers = userOptions.filter(({ value }) =>
    state.pastDueLateFee.notifyUsers.includes(value as never)
  )
  const selectedSuspendedFeeNotificationUsers = userOptions.filter(({ value }) =>
    state.suspendedFee.notifyUsers.includes(value as never)
  )

  const handleChangeCheckbox = async name => {
    const tempState = JSON.parse(JSON.stringify(state))
    tempState[name].isChecked = !tempState[name].isChecked
    setState(tempState)
    await updateDebounce(tempState)
  }

  const handleInputChange: any = async (e, o) => {
    let name, value
    if (e.target) {
      name = e.target.name
      value = e.target.value
    }
    if (o?.action) {
      value = e.value ? e.value : e.map(({ value }) => value)
      name = o.name
    }
    const tempState = JSON.parse(JSON.stringify(state))
    if (name.includes('.')) {
      const [first, second] = name.split('.')
      tempState[first][second] = value
      setState(tempState)
      await updateDebounce(tempState)
      return
    }
    tempState[name].value = value
    setState(tempState)
    await updateDebounce(tempState)
  }

  return (
    <JustifyCenterRow height="100%" width="auto">
      <Column width="60%">
        <JustifyBetweenRow margin="0 0 2rem 0">
          <H1 fontSize="22px" color={colors.black.primary}>
            Payment Rules
          </H1>
        </JustifyBetweenRow>
        <JustifyBetweenRow margin="0 0 1rem 0">
          <Column margin="1.3rem 0 0 0" width="50px" height="100%">
            <ItemContainer onClick={handleChangeCheckbox.bind(this, 'minDepositAmount')}>
              <Checkbox isChecked={state.minDepositAmount.isChecked} onChange={() => {}} />
            </ItemContainer>
          </Column>
          <Column>
            <InputWithIcon
              labelText="Minimum deposit amount"
              placeholder="Minimum deposit amount"
              name="minDepositAmount"
              onChange={handleInputChange}
              value={state.minDepositAmount.value}
              type="number"
            >
              <Percent size="16px" />
            </InputWithIcon>
          </Column>
        </JustifyBetweenRow>
        <JustifyBetweenRow margin="0 0 1rem 0">
          <Column margin="1.3rem 0 0 0" width="50px" height="100%">
            <ItemContainer onClick={handleChangeCheckbox.bind(this, 'minInstallmentAmount')}>
              <Checkbox isChecked={state.minInstallmentAmount.isChecked} onChange={() => {}} />
            </ItemContainer>
          </Column>
          <Column>
            <InputWithIcon
              labelText="Minimum installment amount"
              placeholder="Minimum installment amount"
              onBlur={() => console.log('blue')}
              children={<DollarSign size="16px" />}
              name="minInstallmentAmount"
              type="number"
              onChange={handleInputChange}
              value={state.minInstallmentAmount.value}
            />
          </Column>
        </JustifyBetweenRow>
        <JustifyBetweenRow margin="0 0 1rem 0">
          <Column margin="1.3rem 0 0 0" width="50px" height="100%">
            <ItemContainer onClick={handleChangeCheckbox.bind(this, 'installmentPostponeLimit')}>
              <Checkbox isChecked={state.installmentPostponeLimit.isChecked} onChange={() => {}} />
            </ItemContainer>
          </Column>
          <Column>
            <InputWithIcon
              labelText="Installment postpone limit"
              placeholder="Installment postpone limit"
              name="installmentPostponeLimit"
              value={state.installmentPostponeLimit.value}
              onChange={handleInputChange}
              type="number"
            >
              <Clock size="16px" />
            </InputWithIcon>
          </Column>
        </JustifyBetweenRow>
        <JustifyBetweenRow margin="0 0 1rem 0">
          <Column margin="1.3rem 0 0 0" width="50px" height="100%">
            <ItemContainer onClick={handleChangeCheckbox.bind(this, 'installmentPostponeTimeLimit')}>
              <Checkbox isChecked={state.installmentPostponeTimeLimit.isChecked} onChange={() => {}} />
            </ItemContainer>
          </Column>
          <Column>
            <InputWithIcon
              labelText="Installment postpone time limit"
              placeholder="Installment postpone time limit"
              name="installmentPostponeTimeLimit"
              value={state.installmentPostponeTimeLimit.value}
              onChange={handleInputChange}
              type="number"
            >
              <Clock size="16px" />
            </InputWithIcon>
          </Column>
        </JustifyBetweenRow>
        <JustifyBetweenRow margin="0 0 1rem 0">
          <Column margin="1.3rem 0 0 0" width="50px" height="100%">
            <ItemContainer onClick={handleChangeCheckbox.bind(this, 'activeTimeSlipAmount')}>
              <Checkbox isChecked={state.activeTimeSlipAmount.isChecked} onChange={() => {}} />
            </ItemContainer>
          </Column>
          <Column>
            <InputWithIcon
              labelText="Active time slip amount"
              placeholder="Active time slip amount"
              onBlur={() => console.log('blue')}
              children={<DollarSign size="16px" />}
              name="activeTimeSlipAmount"
              type="number"
              onChange={handleInputChange}
              value={state.activeTimeSlipAmount.value}
            />
          </Column>
        </JustifyBetweenRow>
        <JustifyBetweenRow margin="0 0 1rem 0">
          <Column margin="1.3rem 0 0 0" width="50px" height="100%">
            <ItemContainer onClick={handleChangeCheckbox.bind(this, 'inactiveTimeSlipAmount')}>
              <Checkbox isChecked={state.inactiveTimeSlipAmount.isChecked} onChange={() => {}} />
            </ItemContainer>
          </Column>
          <Column>
            <InputWithIcon
              labelText="Inactive time slip amount"
              placeholder="Inactive time slip amount"
              onBlur={() => console.log('blue')}
              children={<DollarSign size="16px" />}
              name="inactiveTimeSlipAmount"
              type="number"
              onChange={handleInputChange}
              value={state.inactiveTimeSlipAmount.value}
            />
          </Column>
        </JustifyBetweenRow>
        {/*PAST DUE LATE FEE*/}
        <JustifyBetweenRow margin="0 0 1rem 0">
          <H1 color={colors.black.primary}>Past Due Late Fee</H1>
        </JustifyBetweenRow>
        <JustifyBetweenRow margin="0 0 1rem 0">
          <Column margin="1.3rem 0 0 0" width="50px" height="100%">
            <ItemContainer onClick={handleChangeCheckbox.bind(this, 'pastDueLateFee')}>
              <Checkbox isChecked={state.pastDueLateFee.isChecked} onChange={() => {}} />
            </ItemContainer>
          </Column>
          <Column>
            <Row>
              <Row width="10%">
                <InputWithIcon
                  labelText="Days"
                  placeholder="Days"
                  name="pastDueLateFee.days"
                  onChange={handleInputChange}
                  value={state.pastDueLateFee.days}
                  type="number"
                >
                  <Clock size="16px" />
                </InputWithIcon>
              </Row>
              <Row width="20%" margin="0 1rem 0 1rem">
                <SelectInput
                  selectedOption={selectedPastDueLateFeeCalculationType ? [selectedPastDueLateFeeCalculationType] : []}
                  labelText="Payroll Type"
                  onChange={handleInputChange}
                  name="pastDueLateFee.feeCalculationType"
                  options={feeCalculationTypeOptions}
                />
              </Row>
              <Row width="10%">
                <InputWithIcon
                  labelText="Percentage"
                  placeholder="Percentage"
                  name="pastDueLateFee.percentage"
                  onChange={handleInputChange}
                  value={state.pastDueLateFee.percentage}
                  type="number"
                >
                  <Percent size="16px" />
                </InputWithIcon>
              </Row>
              <Row width="60%" margin="0 0 0 1rem">
                <SelectInput
                  isMulti
                  selectedOption={selectedPastDueLateFeeNotificationUsers}
                  labelText="Users"
                  onChange={handleInputChange}
                  name="pastDueLateFee.notifyUsers"
                  options={userOptions}
                />
              </Row>
            </Row>
          </Column>
        </JustifyBetweenRow>
        {/*SUSPENDED FEE*/}
        <JustifyBetweenRow margin="0 0 1rem 0">
          <H1 color={colors.black.primary}>Suspended Fee</H1>
        </JustifyBetweenRow>
        <JustifyBetweenRow margin="0 0 1rem 0">
          <Column margin="1.3rem 0 0 0" width="50px" height="100%">
            <ItemContainer onClick={handleChangeCheckbox.bind(this, 'suspendedFee')}>
              <Checkbox isChecked={state.suspendedFee.isChecked} onChange={() => {}} />
            </ItemContainer>
          </Column>
          <Column>
            <Row>
              <Row width="10%">
                <InputWithIcon
                  labelText="Days"
                  placeholder="Days"
                  name="suspendedFee.days"
                  onChange={handleInputChange}
                  value={state.suspendedFee.days}
                  type="number"
                >
                  <Clock size="16px" />
                </InputWithIcon>
              </Row>
              <Row width="20%" margin="0 1rem 0 1rem">
                <SelectInput
                  selectedOption={selectedSuspendedFeeCalculationType ? [selectedSuspendedFeeCalculationType] : []}
                  labelText="Payroll Type"
                  onChange={handleInputChange}
                  name="suspendedFee.feeCalculationType"
                  options={feeCalculationTypeOptions}
                />
              </Row>
              <Row width="10%">
                <InputWithIcon
                  labelText="Percentage"
                  placeholder="Percentage"
                  name="suspendedFee.percentage"
                  onChange={handleInputChange}
                  value={state.suspendedFee.percentage}
                  type="number"
                >
                  <Percent size="16px" />
                </InputWithIcon>
              </Row>
              <Row width="60%" margin="0 0 0 1rem">
                <SelectInput
                  isMulti
                  selectedOption={selectedSuspendedFeeNotificationUsers}
                  labelText="Users"
                  onChange={handleInputChange}
                  name="suspendedFee.notifyUsers"
                  options={userOptions}
                />
              </Row>
            </Row>
          </Column>
        </JustifyBetweenRow>
      </Column>
    </JustifyCenterRow>
  )
}

export default PaymentSettingsTab
