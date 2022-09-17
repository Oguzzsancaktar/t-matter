import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery, IAxiosBaseQueryFn } from '@services/AxiosBaseQuery'
import { ICustomer, IHistory, IHistoryCreateDTO, IInstallment, Invoice, IUser } from '@/models'

const HISTORY_API_REDUCER_PATH = 'historyApi'
export const HISTORY_TAG = 'historyTag'

type IBuilder = EndpointBuilder<IAxiosBaseQueryFn, typeof HISTORY_TAG, typeof HISTORY_API_REDUCER_PATH>

const createHistory = (builder: IBuilder) => {
  return builder.mutation<IHistory, IHistoryCreateDTO>({
    query(credentials) {
      return {
        url: '/history',
        method: 'POST',
        data: credentials
      }
    },
    invalidatesTags: [HISTORY_TAG]
  })
}

const getFinanceHistory = (builder: IBuilder) => {
  return builder.query<
    IHistory[],
    {
      customerId?: ICustomer['_id']
      userId?: IUser['_id']
      invoiceId?: Invoice['_id']
      installmentId?: IInstallment['_id']
      historyType?: string
    }
  >({
    query(params) {
      return {
        url: '/history/finance',
        method: 'GET',
        params
      }
    },
    providesTags: [HISTORY_TAG]
  })
}

const historyApi = createApi({
  reducerPath: HISTORY_API_REDUCER_PATH,
  tagTypes: [HISTORY_TAG],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    createHistory: createHistory(builder),
    getFinanceHistory: getFinanceHistory(builder)
  })
})

const { useCreateHistoryMutation, useGetFinanceHistoryQuery } = historyApi

export { historyApi, useCreateHistoryMutation, useGetFinanceHistoryQuery }
