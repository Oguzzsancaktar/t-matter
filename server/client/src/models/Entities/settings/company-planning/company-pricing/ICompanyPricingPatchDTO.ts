import { ICompanyPricing, IDailyWorkingHours } from '@/models'

export default interface ICompanyPricingPatchDTO extends Omit<ICompanyPricing, '_id' | 'workingSchedule' | 'summary'> {
  workingSchedule: {
    payrollType: number
    payrollDay: number
    workingSchedule: IDailyWorkingHours
  }
}
