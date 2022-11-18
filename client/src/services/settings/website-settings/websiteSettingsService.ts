import { axiosBaseQuery, IAxiosBaseQueryFn } from '@services/AxiosBaseQuery'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { IWebsiteTextsData } from '@/models'
import { createApi } from '@reduxjs/toolkit/query/react'

const WEBSITE_TEXT_SETTINGS_API_REDUCER_PATH = 'websiteSettingsApi'
const WEBSITE_TEXT_SETTINGS_TAG = 'websiteSettingsTag'

type IBuilder = EndpointBuilder<
  IAxiosBaseQueryFn,
  typeof WEBSITE_TEXT_SETTINGS_TAG,
  typeof WEBSITE_TEXT_SETTINGS_API_REDUCER_PATH
>

const createOrUpdateWebsiteSettings = (builder: IBuilder) => {
  return builder.mutation<IWebsiteTextsData, IWebsiteTextsData>({
    query(dto) {
      return {
        url: '/website-settings/text',
        method: 'POST',
        data: dto
      }
    },
    invalidatesTags(result) {
      return [{ type: WEBSITE_TEXT_SETTINGS_TAG, id: 'LIST' }]
    }
  })
}

const getWebsiteTextSettings = (builder: IBuilder) => {
  return builder.query<IWebsiteTextsData, void>({
    query() {
      return {
        url: '/website-settings/text',
        method: 'GET'
      }
    },
    providesTags() {
      return [{ type: WEBSITE_TEXT_SETTINGS_TAG, id: 'LIST' }]
    }
  })
}

const websiteSettingsApi = createApi({
  reducerPath: WEBSITE_TEXT_SETTINGS_API_REDUCER_PATH,
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    createOrUpdateWebsiteSettings: createOrUpdateWebsiteSettings(builder),
    getWebsiteTextSettings: getWebsiteTextSettings(builder)
  })
})

const { useCreateOrUpdateWebsiteSettingsMutation, useGetWebsiteTextSettingsQuery } = websiteSettingsApi

export { useCreateOrUpdateWebsiteSettingsMutation, useGetWebsiteTextSettingsQuery, websiteSettingsApi }
