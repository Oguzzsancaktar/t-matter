import { IActivityFilter, IQueryParams, ITaskFilter } from '@/models'

export const emptyQueryParams: IQueryParams = {
  search: undefined,
  status: 1,
  size: undefined
}

export const emptyActivtyFilter: IActivityFilter = {
  categoryId: '',
  userId: ''
}

export const emptyTaskFilter: ITaskFilter = {
  categoryArr: [],
  userArr: [],
  statusArr: []
}
