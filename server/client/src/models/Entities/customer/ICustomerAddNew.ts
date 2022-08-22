import { IRefferedBy, IRelativeType } from '@/models'

export default interface ICustomerAddNew {
  _id: string
  customerType: number
  firstname: string
  lastname: string
  email: string
  phone: string
  jobTitle: string
  refferedBy: IRefferedBy
  gender: number
  relativeType?: IRelativeType
}
