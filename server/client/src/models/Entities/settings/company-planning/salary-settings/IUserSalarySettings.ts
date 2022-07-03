import { ISalarySettings, IUser } from '@/models'

export default interface IUserSalarySettings extends Omit<ISalarySettings, '_id'> {
  userId: IUser['_id']
  owner?: IUser['_id']
}
