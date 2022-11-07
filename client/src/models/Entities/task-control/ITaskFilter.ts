import { IOption, IUser } from '@/models'
import { ITaskCategory } from '../workflow'

export default interface ITaskFilter {
  categoryArr?: ITaskCategory[]
  userArr?: IUser[]
  statusArr?: IOption[]
}
