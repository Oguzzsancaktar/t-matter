import { IUser } from '@/models'

interface IHrTask {
  _id: string
  owner: IUser
  type: string
  description: string
  startDate: Date
  endDate: Date
  createdAt: Date
  updatedAt: Date
  isCompleted: boolean
  month?: number
}

export default IHrTask
