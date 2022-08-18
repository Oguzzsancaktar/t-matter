import React, { useState } from 'react'
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
import { payrollTypeOptions } from '@constants/payrollOptions'

const feeCalculationType = {
  BALANCE: 'BALANCE',
  DEPT: 'DEPT',
  PAYMENT: 'PAYMENT'
}

const feeCalculationTypeOptions = [
  { label: 'Balance', value: feeCalculationType.BALANCE },
  { label: 'Payment', value: feeCalculationType.PAYMENT },
  { label: 'Dept', value: feeCalculationType.DEPT }
]

const defaultPaymentSettings = {
  minDepositAmount: {
    isChecked: false,
    value: 30
  },
  minInstallmentAmount: {
    isChecked: false,
    value: 400
  },
  installmentPostponeLimit: {
    isChecked: false,
    value: 2
  },
  installmentPostponeTimeLimit: {
    isChecked: false,
    value: 30
  },
  activeTimeSlipAmount: {
    isChecked: false,
    value: 1500
  },
  inactiveTimeSlipAmount: {
    isChecked: false,
    value: 1000
  },
  pastDueLateFee: {
    isChecked: false,
    days: 2,
    percentage: 20,
    feeCalculationType: feeCalculationType.BALANCE
  },
  suspendedFee: {
    isChecked: false,
    days: 2,
    percentage: 20,
    feeCalculationType: feeCalculationType.BALANCE
  }
}

const PaymentSettingsTab = () => {
  const [state, setState] = useState({
    ...defaultPaymentSettings
  })

  const selectedPastDueLateFeeCalculationType = feeCalculationTypeOptions.find(
    ({ value }) => value === state.pastDueLateFee.feeCalculationType
  )

  const selectedSuspendedFeeCalculationType = feeCalculationTypeOptions.find(
    ({ value }) => value === state.suspendedFee.feeCalculationType
  )

  const handleChangeCheckbox = name => {
    const tempState = { ...state }
    tempState[name].isChecked = !tempState[name].isChecked
    setState(tempState)
  }

  const handleInputChange: any = (e, o) => {
    let name, value
    if (e.target) {
      name = e.target.name
      value = e.target.value
    }
    if (o?.action) {
      value = e.value
      name = o.name
    }
    const tempState = { ...state }
    if (name.includes('.')) {
      const [first, second] = name.split('.')
      tempState[first][second] = value
      setState(tempState)
      return
    }
    tempState[name].value = value
    setState(tempState)
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
              <Row margin="0 1rem 0 1rem">
                <SelectInput
                  selectedOption={selectedPastDueLateFeeCalculationType ? [selectedPastDueLateFeeCalculationType] : []}
                  labelText="Payroll Type"
                  onChange={handleInputChange}
                  name="pastDueLateFee.feeCalculationType"
                  options={feeCalculationTypeOptions}
                />
              </Row>
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
              <Row margin="0 1rem 0 1rem">
                <SelectInput
                  selectedOption={selectedSuspendedFeeCalculationType ? [selectedSuspendedFeeCalculationType] : []}
                  labelText="Payroll Type"
                  onChange={handleInputChange}
                  name="suspendedFee.feeCalculationType"
                  options={feeCalculationTypeOptions}
                />
              </Row>
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
          </Column>
        </JustifyBetweenRow>
      </Column>
    </JustifyCenterRow>
  )
}

export default PaymentSettingsTab
