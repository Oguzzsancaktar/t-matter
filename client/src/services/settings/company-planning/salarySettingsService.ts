import { axiosBaseQuery, IAxiosBaseQueryFn } from '@services/AxiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { ISalarySettings, IUserSalarySettings } from '@/models'

const SALARY_SETTINGS_API_REDUCER_PATH = 'salarySettingsApi'
const SALARY_SETTINGS_TAG = 'salarySettingsTag'

type IBuilder = EndpointBuilder<IAxiosBaseQueryFn, typeof SALARY_SETTINGS_TAG, typeof SALARY_SETTINGS_API_REDUCER_PATH>

const getSalarySettings = (builder: IBuilder) => {
  return builder.query<ISalarySettings, void>({
    query() {
      return {
        url: '/salarySetting',
        method: 'GET'
      }
    },
    providesTags() {
      return [{ type: SALARY_SETTINGS_TAG, id: 'LIST' }]
    }
  })
}

// const createSalarySettings = (builder:IBuilder)=>{

// }

const patchSalarySettings = (builder: IBuilder) => {
  return builder.mutation<ISalarySettings, ISalarySettings>({
    query(dto) {
      return {
        url: '/salarySetting',
        method: 'PATCH',
        data: dto
      }
    },
    invalidatesTags(result) {
      return [{ type: SALARY_SETTINGS_TAG, id: 'LIST' }]
    }
  })
}

const patchUserSalarySettings = (builder: IBuilder) => {
  return builder.mutation<ISalarySettings, IUserSalarySettings>({
    query(dto) {
      return {
        url: `/salarySetting/${dto.userId}`,
        method: 'PATCH',
        data: { defaultPayrollRate: dto.defaultPayrollRate, payrollIncreases: dto.payrollIncreases }
      }
    },
    invalidatesTags(result) {
      return [{ type: SALARY_SETTINGS_TAG, id: 'LIST' }]
    }
  })
}

const getUserSalarySettings = (builder: IBuilder) => {
  return builder.query<ISalarySettings, IUserSalarySettings['userId']>({
    query(userId) {
      return {
        url: `/salarySetting/${userId}`,
        method: 'GET'
      }
    },
    providesTags(result) {
      return [{ type: SALARY_SETTINGS_TAG, id: 'LIST' }]
    }
  })
}

const salarySettingsApi = createApi({
  reducerPath: SALARY_SETTINGS_API_REDUCER_PATH,
  tagTypes: [SALARY_SETTINGS_TAG],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getSalarySettings: getSalarySettings(builder),
    patchSalarySettings: patchSalarySettings(builder),

    patchUserSalarySettings: patchUserSalarySettings(builder),
    getUserSalarySettings: getUserSalarySettings(builder)
  })
})

const {
  useGetSalarySettingsQuery,
  usePatchSalarySettingsMutation,
  usePatchUserSalarySettingsMutation,
  useGetUserSalarySettingsQuery
} = salarySettingsApi
export {
  salarySettingsApi,
  useGetSalarySettingsQuery,
  usePatchSalarySettingsMutation,
  usePatchUserSalarySettingsMutation,
  useGetUserSalarySettingsQuery
}
