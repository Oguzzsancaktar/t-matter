import { ITaskCategory } from '@/models'
import { IUser } from '../user'

export default interface IActivityFilter {
  categoryId?: ITaskCategory['_id']
  userId?: IUser['_id']
}
