import { ICustomer, IUser } from '@/models'

export default interface ICustomerActivityCreateDTO {
  customer: ICustomer['_id']
  creator: IUser['_id']
  type: number
}
