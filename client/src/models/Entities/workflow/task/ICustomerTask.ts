import { ICustomer, IUser, IWorkflow } from '@/models'
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

export interface ITaskStep {
  _id?: string
  workflowId: IWorkflow['_id']
  workflow: IWorkflow
  customer: ICustomer
  startDate: number
  name: string
  steps: ITaskItem
  totalDuration?: number
  totalPrice?: number
  isInvoiced?: boolean
  index?: number
  status?: number
  stepIndex: number
  isChecked?: boolean
}

export interface IActiveTaskStep {
  task: ICustomerTask
  user: IUser
  activeTaskStep: number
  workedTime?: number
}
