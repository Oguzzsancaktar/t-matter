import { ICustomer, IInstallment, Invoice, IUser } from '@/models'

interface IHistory {
  user: IUser
  type: string
  description: string
  createdAt: Date
  title: string
  customer?: ICustomer
  invoice?: Invoice
  installment?: IInstallment
}

export default IHistory
