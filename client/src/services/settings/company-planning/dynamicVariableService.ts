import { axiosBaseQuery, IAxiosBaseQueryFn } from '@services/AxiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { IColor, ICustomerType, IJobTitle, ILocation, IQueryParams, IRefferedBy, IRelativeType } from '@/models'

const DYNAMIC_VARIABLES_API_REDUCER_PATH = 'dynamicVariablesApi'
const DYNAMIC_VARIABLES_TAG = 'dynamicVariablesTag'

type IBuilder = EndpointBuilder<
  IAxiosBaseQueryFn,
  typeof DYNAMIC_VARIABLES_TAG,
  typeof DYNAMIC_VARIABLES_API_REDUCER_PATH
>

// RelativeType
const createRelativeType = (builder: IBuilder) => {
  return builder.mutation<string, Pick<IRelativeType, 'relateTo' | 'relateFrom'>>({
    query(dto) {
      return {
        url: '/dynamic-variables/relative-type',
        method: 'POST',
        data: dto
      }
    },
    invalidatesTags(result) {
      return [{ type: DYNAMIC_VARIABLES_TAG, id: 'LIST' }]
    }
  })
}

const getRelativeTypes = (builder: IBuilder) => {
  return builder.query<IRelativeType[], IQueryParams>({
    query({ search = '', size, status = 1 }) {
      return {
        url: `/dynamic-variables/relative-type?search=${search !== undefined ? search : ''}&status=${
          status !== undefined ? status : ''
        }&size=${size !== undefined ? size : ''}`,
        method: 'GET'
      }
    },
    providesTags() {
      return [{ type: DYNAMIC_VARIABLES_TAG, id: 'LIST' }]
    }
  })
}

const getRelativeTypeById = (builder: IBuilder) => {
  return builder.query<IRelativeType, IRelativeType['_id']>({
    query(id) {
      return {
        url: `/dynamic-variables/relative-type/${id}`,
        method: 'GET'
      }
    },
    providesTags() {
      return [{ type: DYNAMIC_VARIABLES_TAG, id: 'LIST' }]
    }
  })
}

const patchRelativeType = (builder: IBuilder) => {
  return builder.mutation<IRelativeType, Omit<IRelativeType, 'status'>>({
    query(dto) {
      return {
        url: `/dynamic-variables/relative-type/${dto._id}`,
        method: 'PATCH',
        data: { relateTo: dto.relateTo, relateFrom: dto.relateFrom }
      }
    },
    invalidatesTags(result) {
      return [{ type: DYNAMIC_VARIABLES_TAG, id: 'LIST' }]
    }
  })
}

const updateRelativeTypeStatus = (builder: IBuilder) => {
  return builder.mutation<any, Omit<IRelativeType, 'relateTo' | 'relateFrom'>>({
    query(dto) {
      return {
        url: `/dynamic-variables/relative-type/${dto._id}/status`,
        method: 'PATCH',
        data: { status: dto.status }
      }
    },
    invalidatesTags(result) {
      return [{ type: DYNAMIC_VARIABLES_TAG, id: 'LIST' }]
    }
  })
}

// Reffered By
const createRefferedBy = (builder: IBuilder) => {
  return builder.mutation<string, Pick<IRefferedBy, 'name' | 'color'>>({
    query(dto) {
      return {
        url: '/dynamic-variables/reffered-by',
        method: 'POST',
        data: dto
      }
    },
    invalidatesTags(result) {
      return [{ type: DYNAMIC_VARIABLES_TAG, id: 'LIST' }]
    }
  })
}

const getRefferedBys = (builder: IBuilder) => {
  return builder.query<IRefferedBy[], IQueryParams>({
    query({ search = '', size, status = 1 }) {
      return {
        url: `/dynamic-variables/reffered-by?search=${search !== undefined ? search : ''}&status=${
          status !== undefined ? status : ''
        }&size=${size !== undefined ? size : ''}`,
        method: 'GET'
      }
    },
    providesTags() {
      return [{ type: DYNAMIC_VARIABLES_TAG, id: 'LIST' }]
    }
  })
}

const getRefferedByById = (builder: IBuilder) => {
  return builder.query<IRefferedBy, IRefferedBy['_id']>({
    query(id) {
      return {
        url: `/dynamic-variables/reffered-by/${id}`,
        method: 'GET'
      }
    },
    providesTags() {
      return [{ type: DYNAMIC_VARIABLES_TAG, id: 'LIST' }]
    }
  })
}

const patchRefferedBy = (builder: IBuilder) => {
  return builder.mutation<IRefferedBy, Omit<IRefferedBy, 'status'>>({
    query(dto) {
      return {
        url: `/dynamic-variables/reffered-by/${dto._id}`,
        method: 'PATCH',
        data: { name: dto.name, color: dto.color }
      }
    },
    invalidatesTags(result) {
      return [{ type: DYNAMIC_VARIABLES_TAG, id: 'LIST' }]
    }
  })
}

const updateRefferedByStatus = (builder: IBuilder) => {
  return builder.mutation<any, Omit<IRefferedBy, 'name' | 'color'>>({
    query(dto) {
      return {
        url: `/dynamic-variables/reffered-by/${dto._id}/status`,
        method: 'PATCH',
        data: { status: dto.status }
      }
    },
    invalidatesTags(result) {
      return [{ type: DYNAMIC_VARIABLES_TAG, id: 'LIST' }]
    }
  })
}

// Locations
const createLocation = (builder: IBuilder) => {
  return builder.mutation<string, Pick<ILocation, 'name'>>({
    query(dto) {
      return {
        url: '/dynamic-variables/location',
        method: 'POST',
        data: dto
      }
    },
    invalidatesTags(result) {
      return [{ type: DYNAMIC_VARIABLES_TAG, id: 'LIST' }]
    }
  })
}

const getLocations = (builder: IBuilder) => {
  return builder.query<ILocation[], IQueryParams>({
    query({ search = '', size, status = 1 }) {
      return {
        url: `/dynamic-variables/location?search=${search !== undefined ? search : ''}&status=${
          status !== undefined ? status : ''
        }&size=${size !== undefined ? size : ''}`,
        method: 'GET'
      }
    },
    providesTags() {
      return [{ type: DYNAMIC_VARIABLES_TAG, id: 'LIST' }]
    }
  })
}

const getLocationById = (builder: IBuilder) => {
  return builder.query<ILocation, ILocation['_id']>({
    query(id) {
      return {
        url: `/dynamic-variables/location/${id}`,
        method: 'GET'
      }
    },
    providesTags() {
      return [{ type: DYNAMIC_VARIABLES_TAG, id: 'LIST' }]
    }
  })
}

const patchLocation = (builder: IBuilder) => {
  return builder.mutation<ILocation, Omit<ILocation, 'status'>>({
    query(dto) {
      return {
        url: `/dynamic-variables/location/${dto._id}`,
        method: 'PATCH',
        data: { name: dto.name }
      }
    },
    invalidatesTags(result) {
      return [{ type: DYNAMIC_VARIABLES_TAG, id: 'LIST' }]
    }
  })
}

const updateLocationStatus = (builder: IBuilder) => {
  return builder.mutation<any, Omit<ILocation, 'name'>>({
    query(dto) {
      return {
        url: `/dynamic-variables/location/${dto._id}/status`,
        method: 'PATCH',
        data: { status: dto.status }
      }
    },
    invalidatesTags(result) {
      return [{ type: DYNAMIC_VARIABLES_TAG, id: 'LIST' }]
    }
  })
}

// JobTitle
const createJobTitle = (builder: IBuilder) => {
  return builder.mutation<string, Pick<IJobTitle, 'name'>>({
    query(dto) {
      return {
        url: '/dynamic-variables/jobTitle',
        method: 'POST',
        data: dto
      }
    },
    invalidatesTags(result) {
      return [{ type: DYNAMIC_VARIABLES_TAG, id: 'LIST' }]
    }
  })
}

const getJobTitles = (builder: IBuilder) => {
  return builder.query<IJobTitle[], IQueryParams>({
    query({ search = '', size, status = 1 }) {
      return {
        url: `/dynamic-variables/jobTitle?search=${search !== undefined ? search : ''}&status=${
          status !== undefined ? status : ''
        }&size=${size !== undefined ? size : ''}`,
        method: 'GET'
      }
    },
    providesTags() {
      return [{ type: DYNAMIC_VARIABLES_TAG, id: 'LIST' }]
    }
  })
}

const getJobTitleById = (builder: IBuilder) => {
  return builder.query<IJobTitle, IJobTitle['_id']>({
    query(id) {
      return {
        url: `/dynamic-variables/jobTitle/${id}`,
        method: 'GET'
      }
    },
    providesTags() {
      return [{ type: DYNAMIC_VARIABLES_TAG, id: 'LIST' }]
    }
  })
}

const patchJobTitle = (builder: IBuilder) => {
  return builder.mutation<IJobTitle, Omit<IJobTitle, 'status'>>({
    query(dto) {
      return {
        url: `/dynamic-variables/jobTitle/${dto._id}`,
        method: 'PATCH',
        data: { name: dto.name }
      }
    },
    invalidatesTags(result) {
      return [{ type: DYNAMIC_VARIABLES_TAG, id: 'LIST' }]
    }
  })
}

const updateJobTitleStatus = (builder: IBuilder) => {
  return builder.mutation<any, Omit<IJobTitle, 'name'>>({
    query(dto) {
      return {
        url: `/dynamic-variables/jobTitle/${dto._id}/status`,
        method: 'PATCH',
        data: { status: dto.status }
      }
    },
    invalidatesTags(result) {
      return [{ type: DYNAMIC_VARIABLES_TAG, id: 'LIST' }]
    }
  })
}

// Color
const createColor = (builder: IBuilder) => {
  return builder.mutation<string, Pick<IColor, 'color'>>({
    query(dto) {
      return {
        url: '/dynamic-variables/color',
        method: 'POST',
        data: dto
      }
    },
    invalidatesTags(result) {
      return [{ type: DYNAMIC_VARIABLES_TAG, id: 'LIST' }]
    }
  })
}

const getColors = (builder: IBuilder) => {
  return builder.query<IColor[], IQueryParams>({
    query({ search = '', size, status = 1 }) {
      return {
        url: `/dynamic-variables/color?search=${search !== undefined ? search : ''}&status=${
          status !== undefined ? status : ''
        }&size=${size !== undefined ? size : ''}`,
        method: 'GET'
      }
    },
    providesTags() {
      return [{ type: DYNAMIC_VARIABLES_TAG, id: 'LIST' }]
    }
  })
}

const getColorById = (builder: IBuilder) => {
  return builder.query<IColor, IColor['_id']>({
    query(id) {
      return {
        url: `/dynamic-variables/color/${id}`,
        method: 'GET'
      }
    },
    providesTags() {
      return [{ type: DYNAMIC_VARIABLES_TAG, id: 'LIST' }]
    }
  })
}

const patchColor = (builder: IBuilder) => {
  return builder.mutation<IColor, Omit<IColor, 'status'>>({
    query(dto) {
      return {
        url: `/dynamic-variables/color/${dto._id}`,
        method: 'PATCH',
        data: { color: dto.color }
      }
    },
    invalidatesTags(result) {
      return [{ type: DYNAMIC_VARIABLES_TAG, id: 'LIST' }]
    }
  })
}

const updateColorStatus = (builder: IBuilder) => {
  return builder.mutation<any, Omit<IColor, 'color'>>({
    query(dto) {
      return {
        url: `/dynamic-variables/color/${dto._id}/status`,
        method: 'PATCH',
        data: { status: dto.status }
      }
    },
    invalidatesTags(result) {
      return [{ type: DYNAMIC_VARIABLES_TAG, id: 'LIST' }]
    }
  })
}

// CustomerType
const createCustomerType = (builder: IBuilder) => {
  return builder.mutation<string, Omit<ICustomerType, 'status' | '_id'>>({
    query(dto) {
      return {
        url: '/dynamic-variables/customer-type',
        method: 'POST',
        data: { name: dto.name, color: dto.color._id }
      }
    },
    invalidatesTags(result) {
      return [{ type: DYNAMIC_VARIABLES_TAG, id: 'LIST' }]
    }
  })
}

const getCustomerTypes = (builder: IBuilder) => {
  return builder.query<ICustomerType[], IQueryParams>({
    query({ search = '', size, status = 1 }) {
      return {
        url: `/dynamic-variables/customer-type?search=${search !== undefined ? search : ''}&status=${
          status !== undefined ? status : ''
        }&size=${size !== undefined ? size : ''}`,
        method: 'GET'
      }
    },
    providesTags() {
      return [{ type: DYNAMIC_VARIABLES_TAG, id: 'LIST' }]
    }
  })
}

const getCustomerTypeById = (builder: IBuilder) => {
  return builder.query<ICustomerType, ICustomerType['_id']>({
    query(id) {
      return {
        url: `/dynamic-variables/customer-type/${id}`,
        method: 'GET'
      }
    },
    providesTags() {
      return [{ type: DYNAMIC_VARIABLES_TAG, id: 'LIST' }]
    }
  })
}

const patchCustomerType = (builder: IBuilder) => {
  return builder.mutation<ICustomerType, Omit<ICustomerType, 'status'>>({
    query(dto) {
      return {
        url: `/dynamic-variables/customer-type/${dto._id}`,
        method: 'PATCH',
        data: { name: dto.name, color: dto.color._id }
      }
    },
    invalidatesTags(result) {
      return [{ type: DYNAMIC_VARIABLES_TAG, id: 'LIST' }]
    }
  })
}

const updateCustomerTypeStatus = (builder: IBuilder) => {
  return builder.mutation<any, Omit<ICustomerType, 'name' | 'color'>>({
    query(dto) {
      return {
        url: `/dynamic-variables/customer-type/${dto._id}/status`,
        method: 'PATCH',
        data: { status: dto.status }
      }
    },
    invalidatesTags(result) {
      return [{ type: DYNAMIC_VARIABLES_TAG, id: 'LIST' }]
    }
  })
}

const dynamicVariablesApi = createApi({
  reducerPath: DYNAMIC_VARIABLES_API_REDUCER_PATH,
  tagTypes: [DYNAMIC_VARIABLES_TAG],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    createLocation: createLocation(builder),
    getLocations: getLocations(builder),
    getLocationById: getLocationById(builder),
    patchLocation: patchLocation(builder),
    updateLocationStatus: updateLocationStatus(builder),

    createRefferedBy: createRefferedBy(builder),
    getRefferedBys: getRefferedBys(builder),
    getRefferedByById: getRefferedByById(builder),
    patchRefferedBy: patchRefferedBy(builder),
    updateRefferedByStatus: updateRefferedByStatus(builder),

    createRelativeType: createRelativeType(builder),
    getRelativeTypes: getRelativeTypes(builder),
    getRelativeTypeById: getRelativeTypeById(builder),
    patchRelativeType: patchRelativeType(builder),
    updateRelativeTypeStatus: updateRelativeTypeStatus(builder),

    createJobTitle: createJobTitle(builder),
    getJobTitles: getJobTitles(builder),
    getJobTitleById: getJobTitleById(builder),
    patchJobTitle: patchJobTitle(builder),
    updateJobTitleStatus: updateJobTitleStatus(builder),

    createColor: createColor(builder),
    getColors: getColors(builder),
    getColorById: getColorById(builder),
    patchColor: patchColor(builder),
    updateColorStatus: updateColorStatus(builder),

    createCustomerType: createCustomerType(builder),
    getCustomerTypes: getCustomerTypes(builder),
    getCustomerTypeById: getCustomerTypeById(builder),
    patchCustomerType: patchCustomerType(builder),
    updateCustomerTypeStatus: updateCustomerTypeStatus(builder)
  })
})

const {
  useGetLocationsQuery,
  useGetLocationByIdQuery,
  usePatchLocationMutation,
  useUpdateLocationStatusMutation,
  useCreateLocationMutation,

  useGetRefferedBysQuery,
  useGetRefferedByByIdQuery,
  usePatchRefferedByMutation,
  useUpdateRefferedByStatusMutation,
  useCreateRefferedByMutation,

  useGetRelativeTypesQuery,
  useGetRelativeTypeByIdQuery,
  usePatchRelativeTypeMutation,
  useUpdateRelativeTypeStatusMutation,
  useCreateRelativeTypeMutation,

  useGetJobTitlesQuery,
  useGetJobTitleByIdQuery,
  usePatchJobTitleMutation,
  useUpdateJobTitleStatusMutation,
  useCreateJobTitleMutation,

  useGetColorsQuery,
  useGetColorByIdQuery,
  usePatchColorMutation,
  useUpdateColorStatusMutation,
  useCreateColorMutation,

  useGetCustomerTypesQuery,
  useGetCustomerTypeByIdQuery,
  usePatchCustomerTypeMutation,
  useUpdateCustomerTypeStatusMutation,
  useCreateCustomerTypeMutation
} = dynamicVariablesApi

export {
  dynamicVariablesApi,
  useGetLocationsQuery,
  useGetLocationByIdQuery,
  usePatchLocationMutation,
  useUpdateLocationStatusMutation,
  useCreateLocationMutation,
  useGetRefferedBysQuery,
  useGetRefferedByByIdQuery,
  usePatchRefferedByMutation,
  useUpdateRefferedByStatusMutation,
  useCreateRefferedByMutation,
  useGetRelativeTypesQuery,
  useGetRelativeTypeByIdQuery,
  usePatchRelativeTypeMutation,
  useUpdateRelativeTypeStatusMutation,
  useCreateRelativeTypeMutation,
  useGetJobTitlesQuery,
  useGetJobTitleByIdQuery,
  usePatchJobTitleMutation,
  useUpdateJobTitleStatusMutation,
  useCreateJobTitleMutation,
  useGetColorsQuery,
  useGetColorByIdQuery,
  usePatchColorMutation,
  useUpdateColorStatusMutation,
  useCreateColorMutation,
  useGetCustomerTypesQuery,
  useGetCustomerTypeByIdQuery,
  usePatchCustomerTypeMutation,
  useUpdateCustomerTypeStatusMutation,
  useCreateCustomerTypeMutation
}
