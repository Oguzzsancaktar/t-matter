import { IDailyWorkingHours } from '@/models'

export default interface ICompanyPricing {
  _id: string
  dailyAverageExpenseAmount: number
  specifiedCompanyProfit: number

  workingSchedule: {
    payrollType: number
    payrollDay: number
    workingSchedule: IDailyWorkingHours
  }
}
