import ICustomer from './ICustomer'
import ICustomerAddNew from './ICustomerAddNew'

interface ICustomerUpdateDTO extends Omit<ICustomer, 'status'> {
  reliableInCompany?: ICustomer[]
  createContact?: ICustomerAddNew[]
  status?: number
}

export default ICustomerUpdateDTO
