import { Invoice } from '@/models'

interface IInstallmentCreateDTO {
  startDate: Date
  deposit: number
  quantity: number
  payAmount: number
  invoiceId: Invoice['_id']
}

export default IInstallmentCreateDTO
