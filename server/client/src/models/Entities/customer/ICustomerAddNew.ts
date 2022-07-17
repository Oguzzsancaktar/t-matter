import { IRelativeType } from '@/models'

export default interface ICustomerAddNew {
  customerType: number
  firstname: string
  lastname: string
  email: string
  phone: string
  refferedBy: string
  gender: number
  relativeType?: IRelativeType
}
