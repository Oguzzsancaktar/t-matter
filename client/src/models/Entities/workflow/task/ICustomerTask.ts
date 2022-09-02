import { ICustomer } from '@/models'
import ITaskItem from './ITaskItem'

export default interface ICustomerTask {
  _id?: string
  customer: ICustomer
  startDate: string
  name: string
  steps: ITaskItem[]
  totalPrice?: number
  isInvoiced?: boolean
  index?: number
}
