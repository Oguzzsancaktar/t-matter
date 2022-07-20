import { ITaskCreateDTO } from '@/models'
export default interface IWorkflow {
  _id: string
  name: string
  duration?: number
  price?: number
  steps: ITaskCreateDTO[]
  status?: number
}
