import { ICompanyPricing, IUser } from '@/models'

export default interface IUserCompanyPricing
  extends Omit<ICompanyPricing, '_id' | 'dailyAverageExpenseAmount' | 'specifiedCompanyProfit'> {
  userId: IUser['_id']
  owner?: IUser['_id']
}
