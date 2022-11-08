import { IFinancePlanning } from '@/models'

const feeCalculationType = {
  BALANCE: 'BALANCE',
  DEPT: 'DEPT',
  PAYMENT: 'PAYMENT'
} as const

const feeCalculationTypeOptions = [
  { label: 'Balance', value: feeCalculationType.BALANCE },
  { label: 'Payment', value: feeCalculationType.PAYMENT },
  { label: 'Dept', value: feeCalculationType.DEPT }
]

const defaultPaymentSettings: IFinancePlanning = {
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
  installmentpostponeLimitLimit: {
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
    feeCalculationType: feeCalculationType.BALANCE,
    notifyUsers: []
  },
  suspendedFee: {
    isChecked: false,
    days: 2,
    percentage: 20,
    feeCalculationType: feeCalculationType.BALANCE,
    notifyUsers: []
  }
}

export { feeCalculationType, feeCalculationTypeOptions, defaultPaymentSettings }
