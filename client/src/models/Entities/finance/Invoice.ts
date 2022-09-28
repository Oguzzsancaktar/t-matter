import IInvoiceCategory from '@models/Entities/finance-plannin/IInvoiceCategory'
import { ICustomer, ICustomerTask, IExpiredTaskStep } from '@/models'

interface Invoice {
  _id?: string
  category: IInvoiceCategory
  customer: ICustomer
  amount: number
  total: number
  discount: number
  tasks?: ICustomerTask[]
  createdAt?: Date
  expiredTaskSteps?: IExpiredTaskStep[]
  postponeCount: number
}

export default Invoice
