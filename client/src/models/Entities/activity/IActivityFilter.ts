import { IUser } from '../user'

export default interface IActivityFilter {
  type?: number
  userId?: IUser['_id']
}
