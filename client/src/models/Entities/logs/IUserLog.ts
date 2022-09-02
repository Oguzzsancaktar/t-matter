import { IUser } from '@models/index'
export default interface IUserLog {
  date: string
  totalTime: number
  login: string
  logout?: string
}
