import { ICustomer, ITask, ITaskCategory, IUser } from '@/models'

export default interface IActivityCreate {
  _id?: string
  title: string
  content?: string
  customer?: ICustomer['_id']
  stepCategory: ITaskCategory['_id']
  usedTime?: number
  task?: ITask['_id']
  owner: IUser['_id']
  type: number
  step?: number
  createdAt?: Date
  updatedAt?: Date
}
