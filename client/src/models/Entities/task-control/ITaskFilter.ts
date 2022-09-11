import { ITaskCategory } from '../workflow'

export default interface ITaskFilter {
  categoryId?: ITaskCategory['_id']
}
