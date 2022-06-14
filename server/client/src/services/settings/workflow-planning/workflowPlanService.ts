import { axiosBaseQuery, IAxiosBaseQueryFn } from '@services/AxiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { ITaskCategory, ITaskCategoryCreate, ITaskCategoryUpdateDTO } from '@/models'

const USER_ROLE_API_REDUCER_PATH = 'workflowApi'
const USER_ROLE_TAG = 'workflowTag'

type IBuilder = EndpointBuilder<IAxiosBaseQueryFn, typeof USER_ROLE_TAG, typeof USER_ROLE_API_REDUCER_PATH>

const createCategory = (builder: IBuilder) => {
  return builder.mutation<string, ITaskCategoryCreate>({
    query(dto) {
      return {
        url: '/workflow/category',
        method: 'POST',
        data: dto
      }
    },
    invalidatesTags(result) {
      return [{ type: USER_ROLE_TAG, id: 'LIST' }]
    }
  })
}

const getCategories = (builder: IBuilder) => {
  return builder.query<ITaskCategory[], void>({
    query() {
      return {
        url: '/workflow/category',
        method: 'GET'
      }
    },
    providesTags() {
      return [{ type: USER_ROLE_TAG, id: 'LIST' }]
    }
  })
}

const getCategoryById = (builder: IBuilder) => {
  return builder.query<ITaskCategory, ITaskCategory['_id']>({
    query(id) {
      return {
        url: `/workflow/${id}`,
        method: 'GET'
      }
    },
    providesTags() {
      return [{ type: USER_ROLE_TAG, id: 'LIST' }]
    }
  })
}

const patchCategory = (builder: IBuilder) => {
  return builder.mutation<ITaskCategory, Omit<ITaskCategoryUpdateDTO, 'status'>>({
    query(dto) {
      return {
        url: '/workflow',
        method: 'PATCH',
        data: dto
      }
    },
    invalidatesTags(result) {
      return [{ type: USER_ROLE_TAG, id: 'LIST' }]
    }
  })
}

const updateCategoryStatus = (builder: IBuilder) => {
  return builder.mutation<any, Omit<ITaskCategoryUpdateDTO, 'name'>>({
    query(dto) {
      return {
        // url: `/workflow/${dto._id}/status`,
        method: 'PATCH'
        // data: { status: dto.status }
      }
    },
    invalidatesTags(result) {
      return [{ type: USER_ROLE_TAG, id: 'LIST' }]
    }
  })
}

const workflowApi = createApi({
  reducerPath: USER_ROLE_API_REDUCER_PATH,
  tagTypes: [USER_ROLE_TAG],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getCategories: getCategories(builder),
    getCategoryById: getCategoryById(builder),
    patchCategory: patchCategory(builder),
    updateCategoryStatus: updateCategoryStatus(builder),
    createCategory: createCategory(builder)
  })
})

const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  usePatchCategoryMutation,
  useUpdateCategoryStatusMutation,
  useCreateCategoryMutation
} = workflowApi
export {
  workflowApi,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  usePatchCategoryMutation,
  useUpdateCategoryStatusMutation,
  useCreateCategoryMutation
}
