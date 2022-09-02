import { ICustomer, ICustomerTask, IExpiredTaskStep, Invoice } from '@/models'
import IInvoiceCategory from '@models/Entities/finance-plannin/IInvoiceCategory'

interface IInvoiceCreateDTO extends Pick<Invoice, 'total' | 'amount'> {
  category: IInvoiceCategory['_id']
  tasks: ICustomerTask['_id'][]
  customer: ICustomer['_id']
  expiredTaskSteps: IExpiredTaskStep['_id'][]
}

export default IInvoiceCreateDTO
