import { IColor } from '@/models'
export default interface ITaskCategory {
  _id: string
  name: string
  color: IColor
  status: number
}
