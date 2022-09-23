import { IWorkflow } from '@/models'

export default interface IUsedTaskAnalysisData {
  _id: IWorkflow['_id']
  count: number
  workflow: IWorkflow
}
