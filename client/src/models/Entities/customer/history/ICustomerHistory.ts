import { ICustomer, IUser } from '@/models'

export default interface ICustomerHistory {
  _id: string
  customer: ICustomer
  responsible: IUser
  type: number
  createdAt: Date
  updatedAt: Date
}
