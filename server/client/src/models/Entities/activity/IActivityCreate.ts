import { ICustomer, ITask, IUser } from '@/models'

export default interface IActivityCreate {
  _id: string
  title: string
  content: string
  customer?: ICustomer['_id']
  task?: ITask['_id']
  owner: IUser['_id']
  createdAt: Date
  updatedAt: Date
}
