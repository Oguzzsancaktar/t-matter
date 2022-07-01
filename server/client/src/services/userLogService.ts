import { ILoginResponse, IUser, IUserLog, IUserLoginCredentials } from '@models/index'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery, IAxiosBaseQueryFn } from '@services/AxiosBaseQuery'

const LOGS_API_REDUCER_PATH = 'logsApi'
const LOGS_TAG = 'logsTag'

type IBuilder = EndpointBuilder<IAxiosBaseQueryFn, typeof LOGS_TAG, typeof LOGS_API_REDUCER_PATH>

const getUserLogsById = (builder: IBuilder) => {
  return builder.query<IUserLog[], IUser['_id']>({
    query(userId) {
      return {
        url: `/time-log/${userId}`,
        method: 'GET'
      }
    },
    providesTags(results) {
      if (results) {
        return [...results.map(log => ({ type: 'logsTag' as const, id: log._id })), { type: LOGS_TAG, id: 'LIST' }]
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

const { useGetUserLogsByIdQuery } = logsApi

export { logsApi, useGetUserLogsByIdQuery }
