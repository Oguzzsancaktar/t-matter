import { axiosBaseQuery, IAxiosBaseQueryFn } from '@services/AxiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { ICustomer, ICustomerCreateDTO, ICustomerUpdateDTO, IQueryParams } from '@/models'

const CUSTOMER_REDUCER_PATH = 'customerApi'
const CUSTOMER_TAG_TYPE = 'customerTag' as const

type IBuilder = EndpointBuilder<IAxiosBaseQueryFn, typeof CUSTOMER_TAG_TYPE, typeof CUSTOMER_REDUCER_PATH>

const getCustomers = (builder: IBuilder) => {
  return builder.query<ICustomer[], IQueryParams>({
    query({ search = '', size, status = 1 }) {
      return {
        url: `/customer?search=${search !== undefined ? search : ''}&status=${
          status !== undefined ? status : ''
        }&size=${size !== undefined ? size : ''}`,
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
  return builder.mutation<unknown, Omit<ICustomerCreateDTO, '_id'>>({
    query(customerCreateDto) {
      return {
        url: '/customer',
        method: 'POST',
        data: { ...customerCreateDto, jobTitle: customerCreateDto.jobTitle._id }
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

const updateCustomer = (builder: IBuilder) => {
  return builder.mutation<ICustomer, ICustomerUpdateDTO>({
    query(customerUpdateDto) {
      return {
        url: `/customer`,
        method: 'PATCH',
        data: { ...customerUpdateDto }
      }
    },
    invalidatesTags(result) {
      if (!result) return [{ type: CUSTOMER_TAG_TYPE, id: 'LIST' }]
      return [{ type: CUSTOMER_TAG_TYPE, id: result._id }]
    }
  })
}

const updateCustomerStatus = (builder: IBuilder) => {
  return builder.mutation<any, Pick<ICustomerUpdateDTO, '_id' | 'status'>>({
    query(dto) {
      return {
        url: `/customer/${dto._id}/status`,
        method: 'PATCH',
        data: { status: dto.status }
      }
    },
    invalidatesTags(result) {
      return [{ type: CUSTOMER_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const getCustomerReliables = (builder: IBuilder) => {
  return builder.query<ICustomer[], ICustomer['_id']>({
    query(id) {
      return {
        url: `/customer/reliables/${id}`,
        method: 'GET'
      }
    },
    providesTags(result) {
      if (!result) return [{ type: CUSTOMER_TAG_TYPE, id: 'LIST' }]
      return [
        ...result.map(customer => ({ type: CUSTOMER_TAG_TYPE, id: customer?._id || 'LIST' })),
        { type: CUSTOMER_TAG_TYPE, id: 'LIST' }
      ]
    }
  })
}

const addOrUpdateCustomerImage = (builder: IBuilder) => {
  return builder.mutation<ICustomer, Pick<ICustomer, '_id'> & { image: any }>({
    query(dto) {
      return {
        url: `/customer/image/${dto._id}`,
        method: 'POST',
        data: { image: dto.image }
      }
    },
    invalidatesTags(result) {
      return [{ type: CUSTOMER_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const customerApi = createApi({
  reducerPath: CUSTOMER_REDUCER_PATH,
  tagTypes: [CUSTOMER_TAG_TYPE],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getCustomers: getCustomers(builder),
    createCustomer: createCustomer(builder),
    getCustomerById: getCustomerById(builder),
    updateCustomer: updateCustomer(builder),
    updateCustomerStatus: updateCustomerStatus(builder),
    getCustomerReliables: getCustomerReliables(builder),
    addOrUpdateCustomerImage: addOrUpdateCustomerImage(builder)
  })
})

const {
  useGetCustomersQuery,
  useCreateCustomerMutation,
  useGetCustomerByIdQuery,
  useUpdateCustomerMutation,
  useUpdateCustomerStatusMutation,
  useGetCustomerReliablesQuery,
  useAddOrUpdateCustomerImageMutation
} = customerApi
export {
  customerApi,
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useUpdateCustomerStatusMutation,
  useGetCustomerReliablesQuery,
  useAddOrUpdateCustomerImageMutation
}
