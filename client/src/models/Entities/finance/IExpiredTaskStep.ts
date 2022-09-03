import { ICustomer, ICustomerTask, IUser } from '@/models'

interface IExpiredTaskStep {
  _id: string
  stepIndex: number
  expiredTime: number
  expiredTimePrice: number
  task: ICustomerTask
  customer: ICustomer
  user: IUser
  index: number
  isInvoiced: boolean
}

export default IExpiredTaskStep
