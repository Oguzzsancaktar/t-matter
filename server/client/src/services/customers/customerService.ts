import { axiosBaseQuery, IAxiosBaseQueryFn } from '@services/AxiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { ICustomer, ICustomerCreateDTO } from '@/models'

const CUSTOMER_REDUCER_PATH = 'customerApi'
const CUSTOMER_TAG_TYPE = 'customerTag' as const

type IBuilder = EndpointBuilder<IAxiosBaseQueryFn, typeof CUSTOMER_TAG_TYPE, typeof CUSTOMER_REDUCER_PATH>

const getCustomers = (builder: IBuilder) => {
  return builder.query<ICustomer[], void>({
    query() {
      return {
        url: `/customer`,
        method: 'GET'
      }
    },
    providesTags(result) {
      if (!result) return [{ type: CUSTOMER_TAG_TYPE, id: 'LIST' }]
      return [
        ...result.map(customer => ({ type: CUSTOMER_TAG_TYPE, id: customer._id })),
        { type: CUSTOMER_TAG_TYPE, id: 'LIST' }
      ]
    }
  })
}

const createCustomer = (builder: IBuilder) => {
  return builder.mutation<unknown, ICustomerCreateDTO>({
    query(customerCreateDto) {
      return {
        url: '/customer',
        method: 'POST',
        data: customerCreateDto
      }
    },
    invalidatesTags() {
      return [{ type: CUSTOMER_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const getCustomerById = (builder: IBuilder) => {
  return builder.query<ICustomer, ICustomer['_id']>({
    query(customerId) {
      return {
        url: `/customer/${customerId}`,
        method: 'GET'
      }
    },
    providesTags(result) {
      if (!result) return [{ type: CUSTOMER_TAG_TYPE, id: 'LIST' }]
      return [
        { type: CUSTOMER_TAG_TYPE, id: result._id },
        { type: CUSTOMER_TAG_TYPE, id: 'LIST' }
      ]
    }
  })
}

// const updateCustomer = (builder: IBuilder) => {
//   return builder.mutation<ICustomer, Omit<ICustomerUpdateDTO, 'password'>>({
//     query(customerUpdateDto) {
//       return {
//         url: `/customer`,
//         method: 'PATCH',
//         data: { ...customerUpdateDto, role: customerUpdateDto.role._id }
//       }
//     },
//     invalidatesTags(result) {
//       if (!result) return [{ type: CUSTOMER_TAG_TYPE, id: 'LIST' }]
//       return [{ type: CUSTOMER_TAG_TYPE, id: result._id }]
//     }
//   })
// }

// const updateCustomerStatus = (builder: IBuilder) => {
//   return builder.mutation<any, Pick<ICustomerUpdateDTO, '_id' | 'status'>>({
//     query(dto) {
//       return {
//         url: `/customer/${dto._id}/status`,
//         method: 'PATCH',
//         data: { status: dto.status }
//       }
//     },
//     invalidatesTags(result) {
//       return [{ type: CUSTOMER_TAG_TYPE, id: 'LIST' }]
//     }
//   })
// }

const customerApi = createApi({
  reducerPath: CUSTOMER_REDUCER_PATH,
  tagTypes: [CUSTOMER_TAG_TYPE],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getCustomers: getCustomers(builder),
    createCustomer: createCustomer(builder),
    getCustomerById: getCustomerById(builder)
    // updateCustomer: updateCustomer(builder),
    // updateCustomerStatus: updateCustomerStatus(builder)
  })
})

const {
  useGetCustomersQuery,
  useCreateCustomerMutation,
  useGetCustomerByIdQuery
  // useUpdateCustomerMutation,
  // useUpdateCustomerStatusMutation
} = customerApi
export {
  customerApi,
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useCreateCustomerMutation
  // useUpdateCustomerMutation,
  // useUpdateCustomerStatusMutation
}
