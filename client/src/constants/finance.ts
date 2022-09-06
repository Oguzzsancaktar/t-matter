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
  postponeCount: 0
}

const INSTALLMENT_TYPES = {
  DEPOSIT: 'DEPOSIT',
  PAYMENT: 'PAYMENT'
}

const INSTALLMENT_STATUS = {
  PAID: 'PAID',
  MORE_PAID: 'MORE_PAID',
  UN_PAID: 'UN_PAID',
  LATE_FEES: 'LATE_FEES',
  SUSPENDED_FEES: 'SUSPENDED_FEES'
}

export { invoiceDefault, INSTALLMENT_STATUS, INSTALLMENT_TYPES }
