import { ICustomer, IUser } from '@/models'

export default interface ICustomerActivity {
  _id: string
  customer: ICustomer
  creator: IUser
  type: number
  createdAt: Date
  updatedAt: Date
}
