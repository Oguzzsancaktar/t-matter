import IInvoiceCategory from '@models/Entities/finance-plannin/IInvoiceCategory'
import { ICustomerTask } from '@/models'

interface Invoice {
  category: IInvoiceCategory
  amount: number
  total: number
  addition: number
  discount: number
  additionReason: string
  tasks?: ICustomerTask
  createdAt?: Date
}

export default Invoice
