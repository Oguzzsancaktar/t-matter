import { IUser, IUserLog } from '@models/index'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery, IAxiosBaseQueryFn } from '@services/AxiosBaseQuery'

const LOGS_API_REDUCER_PATH = 'logsApi'
const LOGS_TAG = 'logsTag'

type IBuilder = EndpointBuilder<IAxiosBaseQueryFn, typeof LOGS_TAG, typeof LOGS_API_REDUCER_PATH>

const getUserLogsById = (builder: IBuilder) => {
  return builder.query<IUserLog[], { userId: IUser['_id']; timeOffSet: number }>({
    query({ userId, timeOffSet }) {
      return {
        url: `/time-log/${userId}`,
        method: 'GET',
        params: {
          timeOffSet
        }
      }
    },
    providesTags(results) {
      if (results) {
        return [...results.map(log => ({ type: 'logsTag' as const, id: log.date })), { type: LOGS_TAG, id: 'LIST' }]
      }
      return [{ type: LOGS_TAG, id: 'LIST' }]
    }
  })
}

const logsApi = createApi({
  reducerPath: LOGS_API_REDUCER_PATH,
  tagTypes: [LOGS_TAG],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getUserLogsById: getUserLogsById(builder)
  })
})

const { useGetUserLogsByIdQuery, useLazyGetUserLogsByIdQuery } = logsApi

export { logsApi, useGetUserLogsByIdQuery, useLazyGetUserLogsByIdQuery }
