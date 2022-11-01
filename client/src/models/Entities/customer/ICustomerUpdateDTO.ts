import { ICustomerType } from '@/models'
import ICustomer from './ICustomer'
import ICustomerAddNew from './ICustomerAddNew'

interface ICustomerUpdateDTO extends Omit<ICustomer, 'status'> {
  deleteReliableId: ICustomer['_id'][]
  reliableInCompany?: ICustomer[]
  createContact?: ICustomerAddNew[]
  status?: number
}

export default ICustomerUpdateDTO
