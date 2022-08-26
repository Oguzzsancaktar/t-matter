import { axiosBaseQuery, IAxiosBaseQueryFn } from '@services/AxiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { IFinancePlanning, IQueryParams } from '@/models'
import IInvoiceCategory from '@models/Entities/finance-plannin/IInvoiceCategory'

const FINANCE_PLANNING_REDUCER_PATH = 'financePlanningApi'
const FINANCE_PLANNING_TAG_TYPE = 'financePlanningTag' as const
const INVOICE_CATEGORY_TAG_TYPE = 'invoiceCategoryTag' as const

type IBuilder = EndpointBuilder<
  IAxiosBaseQueryFn,
  typeof FINANCE_PLANNING_TAG_TYPE | typeof INVOICE_CATEGORY_TAG_TYPE,
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

const getInvoiceCategory = (builder: IBuilder) => {
  return builder.query<IInvoiceCategory, IInvoiceCategory['_id']>({
    query(args) {
      return {
        url: `/invoice-category/${args}`,
        method: 'GET'
      }
    },
    providesTags(result) {
      if (result) {
        return [{ type: INVOICE_CATEGORY_TAG_TYPE, id: result._id }]
      }
      return [{ type: INVOICE_CATEGORY_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const getInvoiceCategories = (builder: IBuilder) => {
  return builder.query<IInvoiceCategory[], IQueryParams>({
    query(args) {
      return {
        url: '/invoice-category',
        method: 'GET',
        params: args
      }
    },
    providesTags(result) {
      return [{ type: INVOICE_CATEGORY_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const updateInvoiceCategory = (builder: IBuilder) => {
  return builder.mutation<IInvoiceCategory, IInvoiceCategory>({
    query(args) {
      return {
        url: `/invoice-category/${args._id}`,
        method: 'PUT',
        data: args
      }
    },
    invalidatesTags(result) {
      return [
        { type: INVOICE_CATEGORY_TAG_TYPE, id: result?._id },
        { type: INVOICE_CATEGORY_TAG_TYPE, id: 'LIST' }
      ]
    }
  })
}

const createInvoiceCategory = (builder: IBuilder) => {
  return builder.mutation<IInvoiceCategory, IInvoiceCategory>({
    query(args) {
      return {
        url: '/invoice-category',
        method: 'POST',
        data: args
      }
    },
    invalidatesTags(result) {
      return [{ type: INVOICE_CATEGORY_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const financePlanningApi = createApi({
  reducerPath: FINANCE_PLANNING_REDUCER_PATH,
  tagTypes: [FINANCE_PLANNING_TAG_TYPE, INVOICE_CATEGORY_TAG_TYPE],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getFinancePlanning: getFinancePlanning(builder),
    updateFinancePlanning: updateFinancePlanning(builder),
    getInvoiceCategory: getInvoiceCategory(builder),
    getInvoiceCategories: getInvoiceCategories(builder),
    updateInvoiceCategory: updateInvoiceCategory(builder),
    createInvoiceCategory: createInvoiceCategory(builder)
  })
})

const {
  useUpdateFinancePlanningMutation,
  useGetFinancePlanningQuery,
  useGetInvoiceCategoriesQuery,
  useGetInvoiceCategoryQuery,
  useCreateInvoiceCategoryMutation,
  useUpdateInvoiceCategoryMutation
} = financePlanningApi
export {
  financePlanningApi,
  useGetFinancePlanningQuery,
  useUpdateFinancePlanningMutation,
  useUpdateInvoiceCategoryMutation,
  useCreateInvoiceCategoryMutation,
  useGetInvoiceCategoriesQuery,
  useGetInvoiceCategoryQuery
}
