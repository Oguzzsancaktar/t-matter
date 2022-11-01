import { ICustomerType, IJobTitle, IRefferedBy, IRelativeType, IReliableCustomer } from '@/models'
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

  customerType: ICustomerType
  firstname: string
  lastname: string
  email: string
  phone: string
  refferedBy: IRefferedBy
  jobTitle: Omit<IJobTitle, 'status'>
  gender: number
  status: number
  relativeType?: IRelativeType
  reliableCustomers: IReliableCustomer[]

  profile_img?: string
  cloudinary_id?: string

  createdAt?: string
  updatedAt?: string
}
