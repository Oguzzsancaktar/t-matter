import { axiosBaseQuery, IAxiosBaseQueryFn } from '@services/AxiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { ICustomer, ICustomerActivity, ICustomerActivityCreateDTO } from '@/models'

const CUSTOMER_ACTIVITY_REDUCER_PATH = 'customerActivityApi'
const CUSTOMER_ACTIVITY_TAG_TYPE = 'customerActivityTag' as const

type IBuilder = EndpointBuilder<
  IAxiosBaseQueryFn,
  typeof CUSTOMER_ACTIVITY_TAG_TYPE,
  typeof CUSTOMER_ACTIVITY_REDUCER_PATH
>

const createCustomerActivity = (builder: IBuilder) => {
  return builder.mutation<ICustomerActivity, ICustomerActivityCreateDTO>({
    query(customerActivityCreateDto) {
      return {
        url: `/customer-work-activity`,
        method: 'POST',
        data: { ...customerActivityCreateDto }
      }
    },
    invalidatesTags() {
      return [{ type: CUSTOMER_ACTIVITY_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const getCustomerActivities = (builder: IBuilder) => {
  return builder.query<ICustomerActivity[], ICustomer['_id']>({
    query(customerActivity) {
      return {
        url: `/customer-work-activity/${customerActivity}`,
        method: 'GET'
      }
    },
    providesTags(result) {
      return [{ type: CUSTOMER_ACTIVITY_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const customerActivityApi = createApi({
  reducerPath: CUSTOMER_ACTIVITY_REDUCER_PATH,
  tagTypes: [CUSTOMER_ACTIVITY_TAG_TYPE],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    createCustomerActivity: createCustomerActivity(builder),
    getCustomerActivities: getCustomerActivities(builder)
  })
})

const { useCreateCustomerActivityMutation, useGetCustomerActivitiesQuery } = customerActivityApi
export { customerActivityApi, useGetCustomerActivitiesQuery, useCreateCustomerActivityMutation }
