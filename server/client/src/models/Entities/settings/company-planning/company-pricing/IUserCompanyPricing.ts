import { IDailyWorkingHours, IUser } from '@/models'

export default interface IUserCompanyPricing {
  defaultPayrollRate: number
  workingSchedule: IDailyWorkingHours
  payrollDay: number
  payrollType: number
  userId: IUser['_id']
  owner?: IUser['_id']
}
