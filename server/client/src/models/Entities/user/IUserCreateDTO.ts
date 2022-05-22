import { IUser } from '@models/index'
export default interface IUserCreateDTO extends Pick<IUser, 'username' | 'email' | 'password'> {}
