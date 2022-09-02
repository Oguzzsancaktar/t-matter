import { ITaskCreateDTO } from '@/models'
export default interface IWorkflow {
  _id: string
  name: string
  totalDuration?: number
  totalPrice?: number
  steps: ITaskCreateDTO[]
  status?: number
}
