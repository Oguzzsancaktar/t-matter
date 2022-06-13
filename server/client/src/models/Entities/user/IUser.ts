import { IRole } from '@/models'
export default interface IUser {
  _id: string
  firstname: string
  lastname: string
  email: string
  phone: string
  birthday: string
  birthplace: string
  country: string
  city: string
  state: string
  zipcode: string
  address: string
  role: IRole
  gender: string
  status: string
  password: string
}
