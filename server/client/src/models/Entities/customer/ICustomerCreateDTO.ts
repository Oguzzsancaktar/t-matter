import { ICustomer, ICustomerAddNew } from '@models/index'
export default interface ICustomerCreateDTO extends Omit<ICustomer, 'status' | 'reliableCustomers'> {
  reliableInCompany?: string[]
  createContact?: ICustomerAddNew[]
}
