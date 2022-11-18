import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery, IAxiosBaseQueryFn } from '@services/AxiosBaseQuery'
import { IUser, IHrTask } from '@/models'

const HR_TASK_API_REDUCER_PATH = 'hrTaskApi'
export const HR_TASK_TAG = 'hrTaskTag'

type IBuilder = EndpointBuilder<IAxiosBaseQueryFn, typeof HR_TASK_TAG, typeof HR_TASK_API_REDUCER_PATH>

const getHrTasks = (builder: IBuilder) => {
  return builder.query<
    IHrTask[],
    {
      userId: IUser['_id']
      type: IHrTask['type']
    }
  >({
    query(params) {
      return {
        url: `/hr-task/${params.userId}`,
        method: 'GET',
        params
      }
    },
    providesTags: [HR_TASK_TAG]
  })
}

const hrTaskApi = createApi({
  reducerPath: HR_TASK_API_REDUCER_PATH,
  tagTypes: [HR_TASK_TAG],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getHrTasks: getHrTasks(builder)
  })
})

const { useGetHrTasksQuery } = hrTaskApi

export { hrTaskApi, useGetHrTasksQuery }
