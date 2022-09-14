import { ICustomer } from '@/models'
import ITaskItem from './ITaskItem'

export default interface ICustomerTask {
  _id?: string
  customer: ICustomer
  startDate: number
  name: string
  steps: ITaskItem[]
  totalDuration?: number
  totalPrice?: number
  isInvoiced?: boolean
  index?: number
  status?: number
}
