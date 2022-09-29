import { axiosBaseQuery, IAxiosBaseQueryFn } from '@services/AxiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import {
  ICustomer,
  IExpiredTaskStep,
  IExpiredTaskStepCreateDTO,
  IFinancePlanning,
  IInstallment,
  IInstallmentCreateDTO,
  Invoice,
  IQueryParams
} from '@/models'
import IInvoiceCategory from '@models/Entities/finance-plannin/IInvoiceCategory'
import IInvoiceCreateDTO from '@models/Entities/finance/IInvoiceCreateDTO'
import { PERIODS, TPeriod } from '@constants/dates'

const FINANCE_PLANNING_REDUCER_PATH = 'financePlanningApi'
const FINANCE_PLANNING_TAG_TYPE = 'financePlanningTag' as const
const INVOICE_CATEGORY_TAG_TYPE = 'invoiceCategoryTag' as const
const INVOICE_TAG_TYPE = 'invoiceTag' as const
const EXPIRED_INVOICE_TAG_TYPE = 'expiredInvoiceTag' as const
const INSTALLMENT_TAG_TYPE = 'installmentTag' as const
const INSTALLMENT_DASHBOARD_TAG_TYPE = 'installmentDashboardTag' as const
const ADDITIONAL_TIME_TAG_TYPE = 'additionalTimeTag' as const
const NON_BILLABLE_TAG_TYPE = 'nonBillableTag' as const

type IBuilder = EndpointBuilder<
  IAxiosBaseQueryFn,
  | typeof FINANCE_PLANNING_TAG_TYPE
  | typeof INVOICE_CATEGORY_TAG_TYPE
  | typeof INVOICE_TAG_TYPE
  | typeof EXPIRED_INVOICE_TAG_TYPE
  | typeof INSTALLMENT_TAG_TYPE
  | typeof INSTALLMENT_DASHBOARD_TAG_TYPE
  | typeof ADDITIONAL_TIME_TAG_TYPE
  | typeof NON_BILLABLE_TAG_TYPE,
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

const createInvoice = (builder: IBuilder) => {
  return builder.mutation<Invoice, IInvoiceCreateDTO>({
    query(args) {
      return {
        url: '/finance/invoice',
        method: 'POST',
        data: args
      }
    },
    invalidatesTags(result) {
      return [{ type: INVOICE_TAG_TYPE, id: 'LIST' }, NON_BILLABLE_TAG_TYPE, ADDITIONAL_TIME_TAG_TYPE]
    }
  })
}

const getInvoices = (builder: IBuilder) => {
  return builder.query<Invoice[], ICustomer['_id'] | undefined>({
    query(args) {
      return {
        url: `/finance/invoice${args ? '/' + args : ''}`,
        method: 'GET'
      }
    },
    providesTags(result) {
      return [{ type: INVOICE_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const getExpiredTaskSteps = (builder: IBuilder) => {
  return builder.query<IExpiredTaskStep[], { customerId: ICustomer['_id']; isInvoiced?: boolean }>({
    query(args) {
      return {
        url: '/finance/invoice/expired/' + args.customerId,
        method: 'GET',
        params: {
          isInvoiced: args.isInvoiced
        }
      }
    },
    providesTags(result) {
      return [{ type: EXPIRED_INVOICE_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const createExpiredTaskStep = (builder: IBuilder) => {
  return builder.mutation<IExpiredTaskStep, IExpiredTaskStepCreateDTO>({
    query(args) {
      return {
        url: '/finance/invoice/expired',
        method: 'POST',
        data: args
      }
    },
    invalidatesTags(result) {
      return [{ type: EXPIRED_INVOICE_TAG_TYPE, id: 'LIST' }, NON_BILLABLE_TAG_TYPE, ADDITIONAL_TIME_TAG_TYPE]
    }
  })
}

const createInstallment = (builder: IBuilder) => {
  return builder.mutation<IInstallment, IInstallmentCreateDTO>({
    query(args) {
      return {
        url: '/finance/installment/' + args.invoiceId,
        method: 'POST',
        data: args
      }
    },
    invalidatesTags(result) {
      return [{ type: INSTALLMENT_TAG_TYPE, id: 'LIST' }, INSTALLMENT_DASHBOARD_TAG_TYPE]
    }
  })
}

const getInstallments = (builder: IBuilder) => {
  return builder.query<IInstallment[], { invoice: Invoice['_id']; startDate?: Date; endDate?: Date }>({
    query(args) {
      return {
        url: `/finance/installment${args.invoice ? '/' + args.invoice : ''}`,
        method: 'GET',
        params: {
          startDate: args?.startDate?.toDateString(),
          endDate: args?.endDate?.toDateString()
        }
      }
    },
    providesTags(result) {
      return [{ type: INSTALLMENT_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const postponeInstallment = (builder: IBuilder) => {
  return builder.mutation<
    void,
    { days: number; oldDate: Date; invoiceId: Invoice['_id']; note: string; installmentId: IInstallment['_id'] }
  >({
    query(arg) {
      return {
        url: `/finance/installment/${arg.invoiceId}/postpone/${arg.installmentId}`,
        method: 'PUT',
        data: {
          days: arg.days,
          oldDate: arg.oldDate,
          note: arg.note
        }
      }
    },
    invalidatesTags(result) {
      return [{ type: INSTALLMENT_TAG_TYPE, id: 'LIST' }, INSTALLMENT_DASHBOARD_TAG_TYPE]
    }
  })
}

const payInstallment = (builder: IBuilder) => {
  return builder.mutation<
    void,
    {
      installmentId: IInstallment['_id']
      invoiceId: Invoice['_id']
      amount: number
      paidDate: Date
      paidMethod: string
      note: string
    }
  >({
    query(arg) {
      return {
        url: `/finance/installment/${arg.invoiceId}/pay/${arg.installmentId}`,
        method: 'PUT',
        data: {
          amount: arg.amount,
          paidDate: arg.paidDate,
          paidMethod: arg.paidMethod,
          note: arg.note
        }
      }
    },
    invalidatesTags(result) {
      return [{ type: INSTALLMENT_TAG_TYPE, id: 'LIST' }, INSTALLMENT_DASHBOARD_TAG_TYPE]
    }
  })
}

const resetInstallments = (builder: IBuilder) => {
  return builder.mutation<void, Invoice['_id']>({
    query(arg) {
      return {
        url: `/finance/installment/${arg}/reset`,
        method: 'PUT'
      }
    },
    invalidatesTags(result) {
      return [{ type: INSTALLMENT_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const uploadPdfToInvoiceCategory = (builder: IBuilder) => {
  return builder.mutation<IInvoiceCategory, { _id: IInvoiceCategory['_id']; file: File }>({
    query(args) {
      const formData = new FormData()
      formData.append('file', args.file)
      return {
        url: `/invoice-category/${args._id}/agreement`,
        method: 'POST',
        data: formData
      }
    },
    invalidatesTags(result) {
      return [{ type: INVOICE_CATEGORY_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const editInstallment = (builder: IBuilder) => {
  return builder.mutation<IInstallment, IInstallment>({
    query(args) {
      return {
        url: `/finance/installment/${args._id}/edit`,
        method: 'PUT',
        data: args
      }
    },
    invalidatesTags(result) {
      return [{ type: INSTALLMENT_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const getInstallmentDashboardChart = (builder: IBuilder) => {
  return builder.query<
    {
      unpaidCount: number
      paidCount: number
      paidAmount: number
      unpaidAmount: number
      totalAmount: number
      totalCount: number
      _id: string
    }[],
    { period?: TPeriod; startDate?: Date; endDate?: Date }
  >({
    query(args) {
      return {
        url: `/finance/installment/dashboard/chart`,
        method: 'GET',
        params: {
          period: args.period,
          startDate: args.startDate?.toDateString(),
          endDate: args.endDate?.toDateString()
        }
      }
    },
    providesTags(result) {
      return [INSTALLMENT_DASHBOARD_TAG_TYPE]
    }
  })
}

const getAdditionalTimePassedCustomers = (builder: IBuilder) => {
  return builder.query<{ customer: ICustomer; total: number; _id: ICustomer['_id'] }[], void>({
    query(args) {
      return {
        url: '/finance/additional-time-passed-customers',
        method: 'GET'
      }
    },
    providesTags(result) {
      return [{ type: ADDITIONAL_TIME_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const getNonBillablePassedCustomers = (builder: IBuilder) => {
  return builder.query<{ customer: ICustomer; total: number; _id: ICustomer['_id'] }[], void>({
    query(args) {
      return {
        url: '/finance/non-billable-passed-customers',
        method: 'GET'
      }
    },
    providesTags(result) {
      return [{ type: NON_BILLABLE_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const financePlanningApi = createApi({
  reducerPath: FINANCE_PLANNING_REDUCER_PATH,
  tagTypes: [
    FINANCE_PLANNING_TAG_TYPE,
    INVOICE_CATEGORY_TAG_TYPE,
    INVOICE_TAG_TYPE,
    EXPIRED_INVOICE_TAG_TYPE,
    ADDITIONAL_TIME_TAG_TYPE,
    NON_BILLABLE_TAG_TYPE
  ],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getFinancePlanning: getFinancePlanning(builder),
    updateFinancePlanning: updateFinancePlanning(builder),
    getInvoiceCategory: getInvoiceCategory(builder),
    getInvoiceCategories: getInvoiceCategories(builder),
    updateInvoiceCategory: updateInvoiceCategory(builder),
    createInvoiceCategory: createInvoiceCategory(builder),
    getInvoices: getInvoices(builder),
    createInvoice: createInvoice(builder),
    getExpiredTaskSteps: getExpiredTaskSteps(builder),
    createExpiredTaskStep: createExpiredTaskStep(builder),
    createInstallment: createInstallment(builder),
    getInstallments: getInstallments(builder),
    postponeInstallment: postponeInstallment(builder),
    payInstallment: payInstallment(builder),
    resetInstallments: resetInstallments(builder),
    uploadPdfToInvoiceCategory: uploadPdfToInvoiceCategory(builder),
    editInstallment: editInstallment(builder),
    getInstallmentDashboardChart: getInstallmentDashboardChart(builder),
    getAdditionalTimePassedCustomers: getAdditionalTimePassedCustomers(builder),
    getNonBillablePassedCustomers: getNonBillablePassedCustomers(builder)
  })
})

const {
  useUpdateFinancePlanningMutation,
  useGetFinancePlanningQuery,
  useGetInvoiceCategoriesQuery,
  useGetInvoiceCategoryQuery,
  useCreateInvoiceCategoryMutation,
  useUpdateInvoiceCategoryMutation,
  useGetInvoicesQuery,
  useCreateInvoiceMutation,
  useGetExpiredTaskStepsQuery,
  useCreateExpiredTaskStepMutation,
  useCreateInstallmentMutation,
  useGetInstallmentsQuery,
  useLazyGetInstallmentsQuery,
  usePostponeInstallmentMutation,
  usePayInstallmentMutation,
  useResetInstallmentsMutation,
  useUploadPdfToInvoiceCategoryMutation,
  useEditInstallmentMutation,
  useGetInstallmentDashboardChartQuery,
  useGetAdditionalTimePassedCustomersQuery,
  useGetNonBillablePassedCustomersQuery
} = financePlanningApi

export {
  financePlanningApi,
  useGetFinancePlanningQuery,
  useUpdateFinancePlanningMutation,
  useUpdateInvoiceCategoryMutation,
  useCreateInvoiceCategoryMutation,
  useGetInvoiceCategoriesQuery,
  useGetInvoiceCategoryQuery,
  useGetInvoicesQuery,
  useCreateInvoiceMutation,
  useGetExpiredTaskStepsQuery,
  useCreateExpiredTaskStepMutation,
  useCreateInstallmentMutation,
  useGetInstallmentsQuery,
  usePostponeInstallmentMutation,
  usePayInstallmentMutation,
  useResetInstallmentsMutation,
  useUploadPdfToInvoiceCategoryMutation,
  useEditInstallmentMutation,
  useGetInstallmentDashboardChartQuery,
  useGetAdditionalTimePassedCustomersQuery,
  useGetNonBillablePassedCustomersQuery,
  useLazyGetInstallmentsQuery
}
