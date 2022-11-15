import { IUser, IUserLog } from '@models/index'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery, IAxiosBaseQueryFn } from '@services/AxiosBaseQuery'

const LOGS_API_REDUCER_PATH = 'logsApi'
const LOGS_TAG = 'logsTag'

type IBuilder = EndpointBuilder<IAxiosBaseQueryFn, typeof LOGS_TAG, typeof LOGS_API_REDUCER_PATH>

const getUserLogsById = (builder: IBuilder) => {
  return builder.query<
    IUserLog[],
    { userId: IUser['_id']; timeOffSet: number; startDate?: string; endDate?: string; condition: string }
  >({
    query({ userId, timeOffSet, startDate, endDate, condition }) {
      return {
        url: `/time-log/${userId}`,
        method: 'GET',
        params: {
          timeOffSet,
          startDate,
          endDate,
          condition
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

const createLog = (builder: IBuilder) => {
  return builder.mutation<void, { logType: number; owner: IUser['_id'] }>({
    query({ logType, owner }) {
      return {
        url: `/time-log`,
        method: 'POST',
        data: {
          logType,
          owner
        }
      }
    },
    invalidatesTags: [{ type: LOGS_TAG, id: 'LIST' }]
  })
}

const logsApi = createApi({
  reducerPath: LOGS_API_REDUCER_PATH,
  tagTypes: [LOGS_TAG],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getUserLogsById: getUserLogsById(builder),
    createLog: createLog(builder)
  })
})

const { useGetUserLogsByIdQuery, useLazyGetUserLogsByIdQuery, useCreateLogMutation } = logsApi

export { logsApi, useGetUserLogsByIdQuery, useLazyGetUserLogsByIdQuery, useCreateLogMutation }
