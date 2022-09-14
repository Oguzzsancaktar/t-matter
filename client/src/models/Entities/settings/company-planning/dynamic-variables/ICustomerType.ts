import { IColor } from '@/models'
export default interface ICustomerType {
  _id: string
  name: string
  color: IColor
  status: number
}
