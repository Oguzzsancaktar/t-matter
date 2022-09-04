import { Invoice } from '@/models'

interface IInstallment {
  _id: string
  type: string
  invoice: Invoice
  payDate: Date
  payAmount: number
  status: string
  paidMethod?: string
  paidDate?: Date
  paidAmount?: number
  lateFee?: number
  suspendedFee?: number
  notes?: string[]
  createdAt?: Date
  updatedAt?: Date
}

export default IInstallment
