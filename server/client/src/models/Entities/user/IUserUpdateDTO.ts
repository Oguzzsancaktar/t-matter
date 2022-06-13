import { IUser, IUserCreateDTO } from '@/models'
export default interface IUserUpdateDTO extends Omit<IUser, 'role'> {
  _id: string
  role: string
}
