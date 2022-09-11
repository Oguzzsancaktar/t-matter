import { IActivityFilter, IQueryParams, ITaskFilter } from '@/models'

export const emptyQueryParams: IQueryParams = {
  search: undefined,
  status: 1,
  size: undefined
}

export const emptyActivtyFilter: IActivityFilter = {
  type: -9,
  userId: ''
}

export const emptyTaskFilter: ITaskFilter = {
  category: undefined
}
