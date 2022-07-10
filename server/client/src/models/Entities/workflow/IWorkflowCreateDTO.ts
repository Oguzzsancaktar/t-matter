import IWorkflow from './IWorkflow'

export default interface IWorkflowCreateDTO extends Omit<IWorkflow, '_id' | "duration" | "price"> {}
