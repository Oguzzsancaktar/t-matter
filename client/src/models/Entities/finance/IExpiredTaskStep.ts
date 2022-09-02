import { ICustomer, ICustomerTask } from '@/models'

interface IExpiredTaskStep {
  _id: string
  stepIndex: number
  expiredTime: number
  expiredTimePrice: number
  task: ICustomerTask
  customer: ICustomer
  index: number
  isInvoiced: boolean
}

export default IExpiredTaskStep
