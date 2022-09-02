import { feeCalculationType } from '@constants/financePlanning'
import { IUser } from '@/models'

interface IFinancePlanningItem {
  isChecked: boolean
  value: number
}

interface IFinancePlanningExtendItem extends Pick<IFinancePlanningItem, 'isChecked'> {
  days: number
  percentage: number
  feeCalculationType: keyof typeof feeCalculationType
  notifyUsers: IUser['_id'][]
}

interface IFinancePlanning {
  _id?: string
  minDepositAmount: IFinancePlanningItem
  minInstallmentAmount: IFinancePlanningItem
  installmentPostponeLimit: IFinancePlanningItem
  installmentPostponeTimeLimit: IFinancePlanningItem
  activeTimeSlipAmount: IFinancePlanningItem
  inactiveTimeSlipAmount: IFinancePlanningItem
  pastDueLateFee: IFinancePlanningExtendItem
  suspendedFee: IFinancePlanningExtendItem
}
export default IFinancePlanning
