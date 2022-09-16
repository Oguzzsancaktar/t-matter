import { ICustomer, IInstallment, Invoice, IUser } from '@/models'

interface IHistoryCreateDTO {
  user: IUser['_id']
  type: string
  description: string
  title: string
  customer?: ICustomer['_id']
  invoice?: Invoice['_id']
  installment?: IInstallment['_id']
}

export default IHistoryCreateDTO
