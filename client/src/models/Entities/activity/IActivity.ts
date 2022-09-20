import { ICustomer, ITask, ITaskCategory, IUser } from '@/models'

export default interface IActivity {
  _id: string
  title: string
  content: string
  customer?: ICustomer
  task?: ITask
  owner: IUser
  type: number
  step?: number
  stepCategory: ITaskCategory['_id']
  createdAt: Date
  updatedAt: Date
  links?: [
    {
      url: string
      text: string
    }
  ]
}
