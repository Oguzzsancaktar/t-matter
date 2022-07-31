import { ICustomer, ITask, IUser } from '@/models'

export default interface IActivity {
  _id: string
  title: string
  content: string
  customer?: ICustomer
  task?: ITask
  owner: IUser
  createdAt: Date
  updatedAt: Date
  links?: [
    {
      url: string
      text: string
    }
  ]
}
