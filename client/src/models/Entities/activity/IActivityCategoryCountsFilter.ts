import { ICustomer, ITaskCategory, IUser } from '@/models'

export default interface IActivityCategoryCountsFilter {
  userId: IUser['_id']
  categoryId: ITaskCategory['_id']
  customerId: ICustomer['_id']
}
