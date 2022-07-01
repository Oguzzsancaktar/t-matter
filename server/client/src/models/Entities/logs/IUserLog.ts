import { IUser } from '@models/index'
export default interface IUserLog {
  _id: IUser['_id']
  logType: number
  owner: IUser
  createdAt: string
  updatedAt: string
}
