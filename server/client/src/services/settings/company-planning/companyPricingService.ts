import { axiosBaseQuery, IAxiosBaseQueryFn } from '@services/AxiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { ICompanyPricingPatchDTO, ICompanyPricing, IUserCompanyPricing } from '@/models'

const COMPANY_PRICING_API_REDUCER_PATH = 'companyPricingApi'
const COMPANY_PRICING_TAG = 'companyPricingTag'

type IBuilder = EndpointBuilder<IAxiosBaseQueryFn, typeof COMPANY_PRICING_TAG, typeof COMPANY_PRICING_API_REDUCER_PATH>

const getCompanyPricing = (builder: IBuilder) => {
  return builder.query<ICompanyPricing, void>({
    query() {
      return {
        url: '/companyPricing',
        method: 'GET'
      }
    },
    providesTags() {
      return [{ type: COMPANY_PRICING_TAG, id: 'LIST' }]
    }
  })
}

const patchCompanyPricing = (builder: IBuilder) => {
  return builder.mutation<ICompanyPricing, ICompanyPricingPatchDTO>({
    query(dto) {
      return {
        url: '/companyPricing',
        method: 'PATCH',
        data: dto
      }
    },
    invalidatesTags(result) {
      return [{ type: COMPANY_PRICING_TAG, id: 'LIST' }]
    }
  })
}

const patchUserCompanyPricing = (builder: IBuilder) => {
  return builder.mutation<IUserCompanyPricing, IUserCompanyPricing>({
    query(dto) {
      return {
        url: `/working-schedule/${dto.userId}`,
        method: 'PATCH',
        data: { workingSchedule: dto.workingSchedule, payrollType: dto.payrollType, payrollDay: dto.payrollDay }
      }
    },
    invalidatesTags(result) {
      return [{ type: COMPANY_PRICING_TAG, id: 'LIST' }]
    }
  })
}

const getUserCompanyPricing = (builder: IBuilder) => {
  return builder.query<IUserCompanyPricing, IUserCompanyPricing['userId']>({
    query(userId) {
      return {
        url: `/working-schedule/${userId}`,
        method: 'GET'
      }
    },
    providesTags(result) {
      return [{ type: COMPANY_PRICING_TAG, id: 'LIST' }]
    }
  })
}

const companyPricingApi = createApi({
  reducerPath: COMPANY_PRICING_API_REDUCER_PATH,
  tagTypes: [COMPANY_PRICING_TAG],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getCompanyPricing: getCompanyPricing(builder),
    patchCompanyPricing: patchCompanyPricing(builder),

    patchUserCompanyPricing: patchUserCompanyPricing(builder),
    getUserCompanyPricing: getUserCompanyPricing(builder)
  })
})

const {
  useGetCompanyPricingQuery,
  usePatchCompanyPricingMutation,
  useGetUserCompanyPricingQuery,
  usePatchUserCompanyPricingMutation
} = companyPricingApi
export {
  companyPricingApi,
  useGetCompanyPricingQuery,
  usePatchCompanyPricingMutation,
  useGetUserCompanyPricingQuery,
  usePatchUserCompanyPricingMutation
}
