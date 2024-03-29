const invoiceDefault = {
  category: {
    name: '',
    _id: '',
    status: 1
  },
  amount: 0,
  total: 0,
  discount: 0,
  addition: 0,
  additionReason: '',
  postponeCount: 0,
  customer: {
    firstname: '',
    lastname: '',
    _id: ''
  }
}

const INSTALLMENT_TYPES = {
  DEPOSIT: 'DEPOSIT',
  PAYMENT: 'PAYMENT'
}

const INSTALLMENT_STATUS = {
  PAID: 'PAID',
  UN_PAID: 'UN_PAID',
  LESS_PAID: 'LESS_PAID'
}

const PAYMENT_METHODS = {
  CASH: 'CASH',
  CREDIT: 'CREDIT',
  MONEY_ORDER: 'MONEY_ORDER',
  CHECK: 'CHECK'
}

const PAYMENT_OPTIONS = [
  { label: 'Cash', value: PAYMENT_METHODS.CASH },
  { label: 'Credit', value: PAYMENT_METHODS.CREDIT },
  { label: 'Money Order', value: PAYMENT_METHODS.MONEY_ORDER },
  { label: 'Check', value: PAYMENT_METHODS.CHECK }
]

const INSTALLMENT_STATUS_OPTIONS = [
  { label: 'Paid', value: INSTALLMENT_STATUS.PAID },
  { label: 'Unpaid', value: INSTALLMENT_STATUS.UN_PAID },
  { label: 'Less Paid', value: INSTALLMENT_STATUS.LESS_PAID }
]

export {
  invoiceDefault,
  INSTALLMENT_STATUS,
  INSTALLMENT_TYPES,
  PAYMENT_METHODS,
  PAYMENT_OPTIONS,
  INSTALLMENT_STATUS_OPTIONS
}
