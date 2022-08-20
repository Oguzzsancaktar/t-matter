import { axiosBaseQuery, IAxiosBaseQueryFn } from '@services/AxiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { IFinancePlanning } from '@/models'

const FINANCE_PLANNING_REDUCER_PATH = 'financePlanningApi'
const FINANCE_PLANNING_TAG_TYPE = 'financePlanningTag' as const

type IBuilder = EndpointBuilder<
  IAxiosBaseQueryFn,
  typeof FINANCE_PLANNING_TAG_TYPE,
  typeof FINANCE_PLANNING_REDUCER_PATH
>

const getFinancePlanning = (builder: IBuilder) => {
  return builder.query<IFinancePlanning, void>({
    query(args) {
      return {
        url: '/finance/plan',
        method: 'GET'
      }
    },
    providesTags(result) {
      return [FINANCE_PLANNING_TAG_TYPE]
    }
  })
}

const updateFinancePlanning = (builder: IBuilder) => {
  return builder.mutation<IFinancePlanning, IFinancePlanning>({
    query(args) {
      return {
        url: '/finance/plan',
        method: 'PUT',
        data: args
      }
    },
    invalidatesTags(result) {
      return [FINANCE_PLANNING_TAG_TYPE]
    }
  })
}

const financePlanningApi = createApi({
  reducerPath: FINANCE_PLANNING_REDUCER_PATH,
  tagTypes: [FINANCE_PLANNING_TAG_TYPE],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getFinancePlanning: getFinancePlanning(builder),
    updateFinancePlanning: updateFinancePlanning(builder)
  })
})

const { useUpdateFinancePlanningMutation, useGetFinancePlanningQuery } = financePlanningApi
export { financePlanningApi, useGetFinancePlanningQuery, useUpdateFinancePlanningMutation }
