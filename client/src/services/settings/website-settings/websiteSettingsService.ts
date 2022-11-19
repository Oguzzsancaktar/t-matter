import { axiosBaseQuery, IAxiosBaseQueryFn } from '@services/AxiosBaseQuery'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { IWebsiteStylesData, IWebsiteTextsData } from '@/models'
import { createApi } from '@reduxjs/toolkit/query/react'

const WEBSITE_SETTINGS_API_REDUCER_PATH = 'websiteSettingsApi'
const WEBSITE_SETTINGS_TAG = 'websiteSettingsTag'

type IBuilder = EndpointBuilder<
  IAxiosBaseQueryFn,
  typeof WEBSITE_SETTINGS_TAG,
  typeof WEBSITE_SETTINGS_API_REDUCER_PATH
>

const createOrUpdateWebsiteTextSettings = (builder: IBuilder) => {
  return builder.mutation<IWebsiteTextsData, IWebsiteTextsData>({
    query(dto) {
      return {
        url: '/website-settings/text',
        method: 'POST',
        data: dto
      }
    },
    invalidatesTags(result) {
      return [{ type: WEBSITE_SETTINGS_TAG, id: 'LIST' }]
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
      return [{ type: WEBSITE_SETTINGS_TAG, id: 'LIST' }]
    }
  })
}

const createOrUpdateWebsiteStyleSettings = (builder: IBuilder) => {
  return builder.mutation<IWebsiteStylesData, IWebsiteStylesData>({
    query(dto) {
      delete dto.createdAt
      delete dto.updatedAt
      delete dto.__v
      return {
        url: '/website-settings/style',
        method: 'POST',
        data: {
          ...dto,
          navbarBorderColor: dto.navbarBorderColor._id,
          websitePaddingColor: dto?.websitePaddingColor._id,
          websiteBackgroundColor: dto?.websiteBackgroundColor._id,
          websiteModalButtonsBackgroundColor: dto?.websiteModalButtonsBackgroundColor._id,
          websiteModalButtonsBorderColor: dto?.websiteModalButtonsBorderColor._id,
          navlinkTextColor: dto?.navlinkTextColor._id,
          navlinkHoverTextColor: dto?.navlinkHoverTextColor._id,
          informationHeaderTextColor: dto?.informationHeaderTextColor._id,
          informationDescriptionTextColor: dto?.informationDescriptionTextColor._id,
          informationButtonTextColor: dto?.informationButtonTextColor._id,
          contactIconColor: dto?.contactIconColor._id,
          contactTitleColor: dto?.contactTitleColor._id,
          contactContentColor: dto?.contactContentColor._id,
          websiteModalIconColor: dto?.websiteModalIconColor._id,
          websiteModalTitleColor: dto?.websiteModalTitleColor._id,
          websiteModalContentColor: dto?.websiteModalContentColor._id
        }
      }
    },
    invalidatesTags(result) {
      return [{ type: WEBSITE_SETTINGS_TAG, id: 'LIST' }]
    }
  })
}

const getWebsiteStyleSettings = (builder: IBuilder) => {
  return builder.query<IWebsiteStylesData, void>({
    query() {
      return {
        url: '/website-settings/style',
        method: 'GET'
      }
    },
    providesTags() {
      return [{ type: WEBSITE_SETTINGS_TAG, id: 'LIST' }]
    }
  })
}

const websiteSettingsApi = createApi({
  reducerPath: WEBSITE_SETTINGS_API_REDUCER_PATH,
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    createOrUpdateWebsiteTextSettings: createOrUpdateWebsiteTextSettings(builder),
    getWebsiteTextSettings: getWebsiteTextSettings(builder),
    createOrUpdateWebsiteStyleSettings: createOrUpdateWebsiteStyleSettings(builder),
    getWebsiteStyleSettings: getWebsiteStyleSettings(builder)
  })
})

const {
  useCreateOrUpdateWebsiteTextSettingsMutation,
  useGetWebsiteTextSettingsQuery,
  useCreateOrUpdateWebsiteStyleSettingsMutation,
  useGetWebsiteStyleSettingsQuery
} = websiteSettingsApi

export {
  useCreateOrUpdateWebsiteTextSettingsMutation,
  useGetWebsiteTextSettingsQuery,
  useCreateOrUpdateWebsiteStyleSettingsMutation,
  useGetWebsiteStyleSettingsQuery,
  websiteSettingsApi
}
