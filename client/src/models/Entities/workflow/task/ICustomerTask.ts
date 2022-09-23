import { ICustomer, IWorkflow } from '@/models'
import ITaskItem from './ITaskItem'

export default interface ICustomerTask {
  _id?: string
  workflowId: IWorkflow['_id']
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
