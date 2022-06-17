import { axiosBaseQuery, IAxiosBaseQueryFn } from '@services/AxiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import {
  ITaskCategory,
  ITaskCategoryCreate,
  ITaskCategoryUpdateDTO,
  ITaskChecklist,
  ITaskChecklistCreateDTO
} from '@/models'

const WORKFLOW_API_REDUCER_PATH = 'workflowApi'
const WORKFLOW_TAG = 'workflowTag'

type IBuilder = EndpointBuilder<IAxiosBaseQueryFn, typeof WORKFLOW_TAG, typeof WORKFLOW_API_REDUCER_PATH>

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
      return [{ type: WORKFLOW_TAG, id: 'LIST' }]
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
      return [{ type: WORKFLOW_TAG, id: 'LIST' }]
    }
  })
}

const getCategoryById = (builder: IBuilder) => {
  return builder.query<ITaskCategory, ITaskCategory['_id']>({
    query(id) {
      return {
        url: `/workflow/category/${id}`,
        method: 'GET'
      }
    },
    providesTags() {
      return [{ type: WORKFLOW_TAG, id: 'LIST' }]
    }
  })
}

const patchWorkflowCategory = (builder: IBuilder) => {
  return builder.mutation<ITaskCategory, Omit<ITaskCategoryUpdateDTO, 'status'>>({
    query(dto) {
      return {
        url: `/workflow/category/${dto._id}`,
        method: 'PATCH',
        data: { name: dto.name }
      }
    },
    invalidatesTags(result) {
      return [{ type: WORKFLOW_TAG, id: 'LIST' }]
    }
  })
}

const updateCategoryStatus = (builder: IBuilder) => {
  return builder.mutation<any, Omit<ITaskCategoryUpdateDTO, 'name'>>({
    query(dto) {
      return {
        url: `/workflow/category/${dto._id}/status`,
        method: 'PATCH',
        data: { status: dto.status }
      }
    },
    invalidatesTags(result) {
      return [{ type: WORKFLOW_TAG, id: 'LIST' }]
    }
  })
}

// Workflow Checklist
const createChecklist = (builder: IBuilder) => {
  return builder.mutation<string, ITaskChecklistCreateDTO>({
    query(dto) {
      return {
        url: '/workflow/checklist',
        method: 'POST',
        data: dto
      }
    },
    invalidatesTags(result) {
      return [{ type: WORKFLOW_TAG, id: 'LIST' }]
    }
  })
}

const getChecklists = (builder: IBuilder) => {
  return builder.query<ITaskChecklist[], void>({
    query() {
      return {
        url: '/workflow/checklist',
        method: 'GET'
      }
    },
    providesTags() {
      return [{ type: WORKFLOW_TAG, id: 'LIST' }]
    }
  })
}

const workflowApi = createApi({
  reducerPath: WORKFLOW_API_REDUCER_PATH,
  tagTypes: [WORKFLOW_TAG],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    createCategory: createCategory(builder),
    getCategories: getCategories(builder),
    getCategoryById: getCategoryById(builder),
    patchWorkflowCategory: patchWorkflowCategory(builder),
    updateCategoryStatus: updateCategoryStatus(builder),
    createChecklist: createChecklist(builder),
    getChecklists: getChecklists(builder)
  })
})

const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  usePatchWorkflowCategoryMutation,
  useUpdateCategoryStatusMutation,
  useCreateCategoryMutation,
  useGetChecklistsQuery,
  useCreateChecklistMutation
} = workflowApi
export {
  workflowApi,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  usePatchWorkflowCategoryMutation,
  useUpdateCategoryStatusMutation,
  useCreateCategoryMutation,
  useGetChecklistsQuery,
  useCreateChecklistMutation
}
