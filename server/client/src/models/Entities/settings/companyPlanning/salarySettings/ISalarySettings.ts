import IPayrolIncrease from './IPayrolIncrease'

export default interface ISalarySettings {
  id: string
  defaultPayrollRate: number
  payrollIncreases: IPayrolIncrease[]
}
