import { IDailyWorkingHours } from '@/models'

export default interface ICompanyPricing {
  _id: string
  dailyAverageExpenseAmount: number
  specifiedCompanyProfit: number
  payrollType: number
  payrollDay: number
  workingSchedule: IDailyWorkingHours
}
