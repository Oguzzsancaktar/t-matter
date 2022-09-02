import { ITaskChecklist } from '@models/index'
export default interface ITaskChecklistCreateDTO
  extends Omit<ITaskChecklist, '_id' | 'status' | 'price' | 'isChecked'> {}
