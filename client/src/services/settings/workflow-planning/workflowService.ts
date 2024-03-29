import { IUser } from '@models/index'
import { emptyQueryParams } from '@/constants/queryParams'
import { axiosBaseQuery, IAxiosBaseQueryFn } from '@services/AxiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import {
  IQueryParams,
  ITaskCategory,
  ITaskCategoryCreate,
  ITaskCategoryUpdateDTO,
  ITaskChecklist,
  ITaskChecklistCreateDTO,
  ITaskChecklistUpdateDTO,
  IWorkflow,
  IWorkflowCreateDTO
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
  return builder.query<ITaskCategory[], IQueryParams>({
    query({ search = '', size, status = 1 }) {
      return {
        url: `/workflow/category?search=${search !== undefined ? search : ''}&status=${
          status !== undefined ? status : ''
        }&size=${size !== undefined ? size : ''}`,
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
        data: { name: dto.name, color: dto.color }
      }
    },
    invalidatesTags(result) {
      return [{ type: WORKFLOW_TAG, id: 'LIST' }]
    }
  })
}

const updateCategoryStatus = (builder: IBuilder) => {
  return builder.mutation<any, Omit<ITaskCategoryUpdateDTO, 'name' | 'color'>>({
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
  return builder.query<ITaskChecklist[], IQueryParams>({
    query({ search = '', size, status = 1 }) {
      return {
        url: `/workflow/checklist?search=${search !== undefined ? search : ''}&status=${
          status !== undefined ? status : ''
        }&size=${size !== undefined ? size : ''}`,
        method: 'GET'
      }
    },
    providesTags() {
      return [{ type: WORKFLOW_TAG, id: 'LIST' }]
    }
  })
}

const getChecklistById = (builder: IBuilder) => {
  return builder.query<ITaskChecklist, ITaskChecklist['_id']>({
    query(id) {
      return {
        url: `/workflow/checklist/${id}`,
        method: 'GET'
      }
    },
    providesTags() {
      return [{ type: WORKFLOW_TAG, id: 'LIST' }]
    }
  })
}

const patchWorkflowChecklist = (builder: IBuilder) => {
  return builder.mutation<ITaskChecklist, Omit<ITaskChecklistUpdateDTO, 'status' | 'isChecked'>>({
    query(dto) {
      return {
        url: `/workflow/checklist/${dto._id}`,
        method: 'PATCH',
        data: { name: dto.name, duration: dto.duration, point: dto.point }
      }
    },
    invalidatesTags(result) {
      return [{ type: WORKFLOW_TAG, id: 'LIST' }]
    }
  })
}

const updateChecklistStatus = (builder: IBuilder) => {
  return builder.mutation<any, Pick<ITaskChecklistUpdateDTO, '_id' | 'status'>>({
    query(dto) {
      return {
        url: `/workflow/checklist/${dto._id}/status`,
        method: 'PATCH',
        data: { status: dto.status }
      }
    },
    invalidatesTags(result) {
      return [{ type: WORKFLOW_TAG, id: 'LIST' }]
    }
  })
}

// Workflow Plan
const createPlan = (builder: IBuilder) => {
  return builder.mutation<string, IWorkflowCreateDTO>({
    query(dto) {
      return {
        url: '/workflow/plan',
        method: 'POST',
        data: dto
      }
    },
    invalidatesTags(result) {
      return [{ type: WORKFLOW_TAG, id: 'LIST' }]
    }
  })
}

const getPlans = (builder: IBuilder) => {
  return builder.query<IWorkflow[], IQueryParams>({
    query({ search = '', size, status = 1 } = emptyQueryParams) {
      return {
        url: `/workflow/plan?search=${search !== undefined ? search : ''}&status=${
          status !== undefined ? status : ''
        }&size=${size !== undefined ? size : ''}`,
        method: 'GET'
      }
    },
    providesTags() {
      return [{ type: WORKFLOW_TAG, id: 'LIST' }]
    }
  })
}

const getPlanById = (builder: IBuilder) => {
  return builder.query<IWorkflow, IWorkflow['_id']>({
    query(id) {
      return {
        url: `/workflow/plan/${id}`,
        method: 'GET'
      }
    },
    providesTags() {
      return [{ type: WORKFLOW_TAG, id: 'LIST' }]
    }
  })
}

const patchWorkflowPlan = (builder: IBuilder) => {
  return builder.mutation<IWorkflow, Omit<IWorkflow, 'status' | 'price' | 'duration' | 'price'>>({
    query(dto) {
      return {
        url: `/workflow/plan/${dto._id}`,
        method: 'PATCH',
        data: { name: dto.name, steps: dto.steps }
      }
    },
    invalidatesTags(result) {
      return [{ type: WORKFLOW_TAG, id: 'LIST' }]
    }
  })
}

const updatePlanStatus = (builder: IBuilder) => {
  return builder.mutation<any, Pick<IWorkflow, '_id' | 'status'>>({
    query(dto) {
      return {
        url: `/workflow/plan/${dto._id}/status`,
        method: 'PATCH',
        data: { status: dto.status }
      }
    },
    invalidatesTags(result) {
      return [{ type: WORKFLOW_TAG, id: 'LIST' }]
    }
  })
}

const getWorkflowPlanUsedUserData = (builder: IBuilder) => {
  return builder.query<{ _id: IUser['_id']; user: IUser; count: number }[], void>({
    query() {
      return {
        url: `/workflow/chart/plan/used-user-counts`,
        method: 'GET'
      }
    },
    providesTags(result) {
      return [{ type: WORKFLOW_TAG, id: 'LIST' }]
    }
  })
}

const getWorkflowCountForMonthsData = (builder: IBuilder) => {
  return builder.query<{ _id: string; count: number }[], void>({
    query() {
      return {
        url: `/workflow/chart/monthly-created-counts`,
        method: 'GET'
      }
    },
    providesTags(result) {
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
    getChecklists: getChecklists(builder),
    getChecklistById: getChecklistById(builder),
    patchWorkflowChecklist: patchWorkflowChecklist(builder),
    updateChecklistStatus: updateChecklistStatus(builder),

    createPlan: createPlan(builder),
    getPlans: getPlans(builder),
    getPlanById: getPlanById(builder),
    patchWorkflowPlan: patchWorkflowPlan(builder),
    updatePlanStatus: updatePlanStatus(builder),

    getWorkflowPlanUsedUserData: getWorkflowPlanUsedUserData(builder),
    getWorkflowCountForMonthsData: getWorkflowCountForMonthsData(builder)
  })
})

const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  usePatchWorkflowCategoryMutation,
  useUpdateCategoryStatusMutation,
  useCreateCategoryMutation,

  useGetChecklistsQuery,
  useCreateChecklistMutation,
  useGetChecklistByIdQuery,
  usePatchWorkflowChecklistMutation,
  useUpdateChecklistStatusMutation,

  useGetPlansQuery,
  useCreatePlanMutation,
  useGetPlanByIdQuery,
  usePatchWorkflowPlanMutation,
  useUpdatePlanStatusMutation,

  useGetWorkflowPlanUsedUserDataQuery,
  useGetWorkflowCountForMonthsDataQuery
} = workflowApi

export {
  workflowApi,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  usePatchWorkflowCategoryMutation,
  useUpdateCategoryStatusMutation,
  useCreateCategoryMutation,
  useGetChecklistsQuery,
  useCreateChecklistMutation,
  useGetChecklistByIdQuery,
  usePatchWorkflowChecklistMutation,
  useUpdateChecklistStatusMutation,
  useGetPlansQuery,
  useCreatePlanMutation,
  useGetPlanByIdQuery,
  usePatchWorkflowPlanMutation,
  useUpdatePlanStatusMutation,
  useGetWorkflowPlanUsedUserDataQuery,
  useGetWorkflowCountForMonthsDataQuery
}
