import { axiosBaseQuery, IAxiosBaseQueryFn } from '@services/AxiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { ILocation } from '@/models'

const DYNAMIC_VARIABLES_API_REDUCER_PATH = 'locationApi'
const DYNAMIC_VARIABLES_TAG = 'locationTag'

type IBuilder = EndpointBuilder<
  IAxiosBaseQueryFn,
  typeof DYNAMIC_VARIABLES_TAG,
  typeof DYNAMIC_VARIABLES_API_REDUCER_PATH
>

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
  return builder.query<ILocation[], void>({
    query() {
      return {
        url: '/dynamic-variables/location',
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

const locationApi = createApi({
  reducerPath: DYNAMIC_VARIABLES_API_REDUCER_PATH,
  tagTypes: [DYNAMIC_VARIABLES_TAG],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    createLocation: createLocation(builder),
    getLocations: getLocations(builder),
    getLocationById: getLocationById(builder),
    patchLocation: patchLocation(builder),
    updateLocationStatus: updateLocationStatus(builder)
  })
})

const {
  useGetLocationsQuery,
  useGetLocationByIdQuery,
  usePatchLocationMutation,
  useUpdateLocationStatusMutation,
  useCreateLocationMutation
} = locationApi

export {
  locationApi,
  useGetLocationsQuery,
  useGetLocationByIdQuery,
  usePatchLocationMutation,
  useUpdateLocationStatusMutation,
  useCreateLocationMutation
}
