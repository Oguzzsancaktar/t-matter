import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery, IAxiosBaseQueryFn } from '@services/AxiosBaseQuery'
import { IActivity, IActivityCreate, ICustomer, ITask } from '@/models'

const ACTIVITY_API_REDUCER_PATH = 'activityApi'
const ACTIVITY_TAG = 'activityTag'

type IBuilder = EndpointBuilder<IAxiosBaseQueryFn, typeof ACTIVITY_TAG, typeof ACTIVITY_API_REDUCER_PATH>

const createActivity = (builder: IBuilder) => {
  return builder.mutation<IActivity, IActivityCreate>({
    query(credentials) {
      return {
        url: '/activity',
        method: 'POST',
        data: credentials
      }
    }
  })
}

const getActivities = (builder: IBuilder) => {
  return builder.query<IActivity[], { customer?: ICustomer['_id']; task?: ITask['_id'] }>({
    query(params) {
      return {
        url: '/activity',
        method: 'GET',
        params
      }
    }
  })
}

const activityApi = createApi({
  reducerPath: ACTIVITY_API_REDUCER_PATH,
  tagTypes: [ACTIVITY_TAG],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    createActivity: createActivity(builder),
    getActivities: getActivities(builder)
  })
})

const { useCreateActivityMutation, useGetActivitiesQuery } = activityApi

export { activityApi, useCreateActivityMutation, useGetActivitiesQuery }
