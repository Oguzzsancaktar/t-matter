import ITask from './task/ITask'

export default interface IWorkflow {
  _id: string
  workflowName: string
  workflowTotalDuration: number
  workflowTotalPrice: number
  workflowSteps: ITask[]
}
