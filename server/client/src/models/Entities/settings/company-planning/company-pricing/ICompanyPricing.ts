import { IDailyWorkingHours } from '@/models'

export default interface ICompanyPricing {
  _id: string
  dailyAverageExpenseAmount: number
  specifiedCompanyProfit: number
  summary: {
    employerCount: number
    employerHourlyFee: number
    hourlyCompanyFee: number
  }
  workingSchedule: {
    payrollType: number
    payrollDay: number
    workingSchedule: IDailyWorkingHours
  }
}
