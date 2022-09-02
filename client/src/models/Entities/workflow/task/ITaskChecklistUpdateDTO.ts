import { ITaskChecklist } from '@models/index'
export default interface ITaskChecklistCreateDTO extends Omit<ITaskChecklist, 'price'> {}
