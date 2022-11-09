import { ICustomer, IOption, IUser } from '@/models'
import { ITaskCategory } from '../workflow'

export default interface ITaskFilter {
  customerId?: ICustomer['_id']
  categoryArr?: ITaskCategory[]
  userArr?: IUser[]
  statusArr?: IOption[]
}
