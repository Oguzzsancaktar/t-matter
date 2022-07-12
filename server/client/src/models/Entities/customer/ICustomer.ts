export default interface ICustomer {
  _id?: string
  aSharpNumber?: string
  country?: string
  city?: string
  state?: string
  address?: string
  zipcode?: string
  customerType: number
  firstname: string
  lastname: string
  email: string
  phone: string
  birthday: string
  birthplace: string
  refferedBy: string
  gender: number
  reliableCustomers: string[]
  status: number
}
