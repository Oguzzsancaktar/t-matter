import { ICustomer, ICustomerTask, Invoice } from '@/models'
import IInvoiceCategory from '@models/Entities/finance-plannin/IInvoiceCategory'

interface IInvoiceCreateDTO extends Pick<Invoice, 'total' | 'amount' | 'additionReason' | 'addition'> {
  category: IInvoiceCategory['_id']
  tasks: ICustomerTask[]
  customer: ICustomer['_id']
}

export default IInvoiceCreateDTO
