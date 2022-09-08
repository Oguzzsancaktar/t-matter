import { axiosBaseQuery, IAxiosBaseQueryFn } from '@services/AxiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { ICompanyInfo } from '@/models'

const COMPANY_INFO_API_REDUCER_PATH = 'companyInfoApi'
const COMPANY_INFO_TAG = 'companyInfoTag'

type IBuilder = EndpointBuilder<IAxiosBaseQueryFn, typeof COMPANY_INFO_TAG, typeof COMPANY_INFO_API_REDUCER_PATH>

const getCompanyInfo = (builder: IBuilder) => {
  return builder.query<ICompanyInfo, void>({
    query() {
      return {
        url: '/company',
        method: 'GET'
      }
    },
    providesTags() {
      return [{ type: COMPANY_INFO_TAG, id: 'LIST' }]
    }
  })
}

const updateCompanyInfo = (builder: IBuilder) => {
  return builder.mutation<void, ICompanyInfo>({
    query(args) {
      return {
        url: `/company`,
        method: 'PUT',
        data: args
      }
    },
    invalidatesTags(result) {
      return [{ type: COMPANY_INFO_TAG, id: 'LIST' }]
    }
  })
}

const uploadCompanyLogo = (builder: IBuilder) => {
  return builder.mutation<void, FormData>({
    query(args) {
      return {
        url: '/company/logo',
        method: 'POST',
        data: args
      }
    },
    invalidatesTags(result) {
      return [{ type: COMPANY_INFO_TAG, id: 'LIST' }]
    }
  })
}

const companyInfoApi = createApi({
  reducerPath: COMPANY_INFO_API_REDUCER_PATH,
  tagTypes: [COMPANY_INFO_TAG],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getCompanyInfo: getCompanyInfo(builder),
    updateCompanyInfo: updateCompanyInfo(builder),
    uploadCompanyLogo: uploadCompanyLogo(builder)
  })
})

const { useGetCompanyInfoQuery, useUpdateCompanyInfoMutation, useUploadCompanyLogoMutation } = companyInfoApi
export { companyInfoApi, useGetCompanyInfoQuery, useUpdateCompanyInfoMutation, useUploadCompanyLogoMutation }
