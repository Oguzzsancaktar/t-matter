import { ICustomer } from '@/models'
import ITaskItem from './ITaskItem'

export default interface ICustomerTask {
  _id?: string
  customerId?: ICustomer['_id']
  startDate: string
  name: string
  steps: ITaskItem[]
}
