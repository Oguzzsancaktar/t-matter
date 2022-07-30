import { IRelativeType } from '@/models'
import { ICustomer } from '@models/index'

export default interface IReliableCustomer {
  reliableId: ICustomer['_id']
  relativeType: { id: IRelativeType['_id']; fromOrTo: number }
}
