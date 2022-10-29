import { ICustomer, IUser } from '@/models'

export default interface ICustomerHistoryCreateDTO {
  customer: ICustomer['_id']
  responsible: IUser['_id']
  type: number
}
