import { IDailyWorkingHours, IUser } from '@/models'

export default interface IUserCompanyPricing {
  workingSchedule: IDailyWorkingHours
  payrollDay: number
  payrollType: number
  userId: IUser['_id']
  owner?: IUser['_id']
}
