import { IRefferedBy, IRelativeType, IReliableCustomer } from '@/models'
export default interface ICustomer {
  _id: string
  aSharpNumber?: string
  country?: string
  city?: string
  state?: string
  address?: string
  zipcode?: string
  birthday?: string
  birthplace?: string

  customerType: number
  firstname: string
  lastname: string
  email: string
  phone: string
  refferedBy: IRefferedBy
  jobTitle: string
  gender: number
  status: number
  relativeType?: IRelativeType
  reliableCustomers: IReliableCustomer[]
}
