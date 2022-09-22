import { IOption, IUser } from '@/models'
import { ITaskCategory } from '../workflow'

export default interface ITaskFilter {
  category?: ITaskCategory
  user?: IUser
  status?: IOption
}
