import { axiosBaseQuery, IAxiosBaseQueryFn } from '@services/AxiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { ICustomer, ICustomerHistory, ICustomerHistoryCreateDTO } from '@/models'

const CUSTOMER_HISTORY_REDUCER_PATH = 'customerHistoryApi'
const CUSTOMER_HISTORY_TAG_TYPE = 'customerHistoryTag' as const

type IBuilder = EndpointBuilder<
  IAxiosBaseQueryFn,
  typeof CUSTOMER_HISTORY_TAG_TYPE,
  typeof CUSTOMER_HISTORY_REDUCER_PATH
>

const createCustomerHistory = (builder: IBuilder) => {
  return builder.mutation<ICustomerHistory, ICustomerHistoryCreateDTO>({
    query(customerHistoryCreateDto) {
      return {
        url: `/history/customer`,
        method: 'POST',
        data: { ...customerHistoryCreateDto }
      }
    },
    invalidatesTags() {
      return [{ type: CUSTOMER_HISTORY_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const getCustomerHistories = (builder: IBuilder) => {
  return builder.query<ICustomerHistory[], ICustomer['_id']>({
    query(customerHistory) {
      return {
        url: `/history/customer/${customerHistory}`,
        method: 'GET'
      }
    },
    providesTags(result) {
      return [{ type: CUSTOMER_HISTORY_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const customerHistoryApi = createApi({
  reducerPath: CUSTOMER_HISTORY_REDUCER_PATH,
  tagTypes: [CUSTOMER_HISTORY_TAG_TYPE],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    createCustomerHistory: createCustomerHistory(builder),
    getCustomerHistories: getCustomerHistories(builder)
  })
})

const { useCreateCustomerHistoryMutation, useGetCustomerHistoriesQuery } = customerHistoryApi
export { customerHistoryApi, useGetCustomerHistoriesQuery, useCreateCustomerHistoryMutation }
