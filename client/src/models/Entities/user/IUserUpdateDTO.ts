import { IRole, IUser } from '@/models'
export default interface IUserUpdateDTO extends Omit<IUser, 'role'> {
  role: Omit<IRole, 'status'>
}
