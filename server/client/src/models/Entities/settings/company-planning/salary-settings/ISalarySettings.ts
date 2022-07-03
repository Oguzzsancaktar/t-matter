import IPayrolIncrease from './IPayrolIncrease'

export default interface ISalarySettings {
  _id?: string
  defaultPayrollRate: number
  payrollIncreases: IPayrolIncrease[]
}
