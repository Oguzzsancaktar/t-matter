import { ICustomer, IQueryParams, ITaskFilter, ITaskUserWorkTime, IUsedTaskAnalysisData } from '@models/index'
import { axiosBaseQuery, IAxiosBaseQueryFn } from '@services/AxiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { ICustomerTask, ITask, IUser } from '@/models'
import { ITaskStep } from '@models/Entities/workflow/task/ICustomerTask'

const TASK_REDUCER_PATH = 'taskApi'
const TASK_TAG_TYPE = 'taskTag' as const

type IBuilder = EndpointBuilder<IAxiosBaseQueryFn, typeof TASK_TAG_TYPE, typeof TASK_REDUCER_PATH>

const createTask = (builder: IBuilder) => {
  return builder.mutation<unknown, ICustomerTask>({
    query(taskCreateDto) {
      return {
        url: `/task/${taskCreateDto.customer._id}`,
        method: 'POST',
        data: {
          ...taskCreateDto,
          _id: undefined,
          customerId: undefined
        }
      }
    },
    invalidatesTags() {
      return [{ type: TASK_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const postponeTask = (builder: IBuilder) => {
  return builder.mutation<unknown, { _id: string; postponedDate: number; step: number }>({
    query(taskCreateDto) {
      return {
        url: `/task/postpone`,
        method: 'POST',
        data: {
          taskId: taskCreateDto._id,
          postponeDate: taskCreateDto.postponedDate,
          step: taskCreateDto.step
        }
      }
    },
    invalidatesTags() {
      return [{ type: TASK_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const deleteTask = (builder: IBuilder) => {
  return builder.mutation<ITask, ITask['_id']>({
    query(taskCreateDto) {
      return {
        url: `/task/${taskCreateDto}`,
        method: 'DELETE'
      }
    },
    invalidatesTags() {
      return [{ type: TASK_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const getAllTaskList = (builder: IBuilder) => {
  return builder.query<ICustomerTask[], ITaskFilter>({
    query({ category, user, status }) {
      return {
        url: `/task`,
        method: 'GET',
        params: {
          categoryId: category?._id,
          userId: user?._id,
          status: status?.value
        }
      }
    },
    providesTags(result) {
      if (!result) return [{ type: TASK_TAG_TYPE, id: 'LIST' }]
      return [...result.map(task => ({ type: TASK_TAG_TYPE, id: task._id })), { type: TASK_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const getTasksByCustomerId = (builder: IBuilder) => {
  return builder.query<ICustomerTask[], { customerId: ICustomer['_id']; isInvoiced?: boolean } & IQueryParams>({
    query({ customerId, isInvoiced, search, size, status }) {
      return {
        url: `/task/customer/${customerId}`,
        method: 'GET',
        params: {
          isInvoiced,
          search,
          size,
          status
        }
      }
    },
    providesTags(result) {
      if (!result) return [{ type: TASK_TAG_TYPE, id: 'LIST' }]
      return [...result.map(task => ({ type: TASK_TAG_TYPE, id: task._id })), { type: TASK_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const getTaskByTaskId = (builder: IBuilder) => {
  return builder.query<ICustomerTask, ICustomer['_id']>({
    query(customerId) {
      return {
        url: `/task/${customerId}`,
        method: 'GET'
      }
    },
    providesTags(result) {
      if (!result) return [{ type: TASK_TAG_TYPE, id: 'LIST' }]
      return [
        { type: TASK_TAG_TYPE, id: result._id },
        { type: TASK_TAG_TYPE, id: 'LIST' }
      ]
    }
  })
}

const updateTask = (builder: IBuilder) => {
  return builder.mutation<ICustomerTask, ICustomerTask>({
    query(taskUpdateDto) {
      return {
        url: `/task/${taskUpdateDto._id}`,
        method: 'PUT',
        data: {
          ...taskUpdateDto,
          steps: taskUpdateDto.steps.map(step => ({
            ...step,
            responsibleUser: step.responsibleUser._id,
            category: step.category._id,
            location: step.location._id,
            workedTimes: step.workedTimes.map((work: ITaskUserWorkTime) => ({
              ...work,
              user: work.user?._id || ''
            }))
          }))
        }
      }
    },
    invalidatesTags(result) {
      if (!result) return [{ type: TASK_TAG_TYPE, id: 'LIST' }]
      return [{ type: TASK_TAG_TYPE, id: result._id }]
    }
  })
}

const reorderTasks = (builder: IBuilder) => {
  return builder.mutation<ICustomerTask[], { _id: ICustomerTask['_id']; index: ICustomerTask['index'] }[]>({
    query(tasks) {
      return {
        url: '/task/reorder',
        method: 'PUT',
        data: tasks
      }
    },
    invalidatesTags() {
      return [{ type: TASK_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const getUsedTaskWorkflowCounts = (builder: IBuilder) => {
  return builder.query<IUsedTaskAnalysisData[], void>({
    query() {
      return {
        url: `/task/chart/most-used-workflow`,
        method: 'GET'
      }
    },
    providesTags(result) {
      return [{ type: TASK_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const getTaskCountForMonthsData = (builder: IBuilder) => {
  return builder.query<{ _id: string; count: number }[], void>({
    query() {
      return {
        url: `/task/chart/task-workflow-added-monthly-analysis`,
        method: 'GET'
      }
    },
    providesTags(result) {
      return [{ type: TASK_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const getTaskStepMonthlyAnalysisData = (builder: IBuilder) => {
  return builder.query<{ _id: string; monthlyPrice: number; monthlyDuration: number }[], void>({
    query() {
      return {
        url: `/task/chart/task-step-monthly-analysis`,
        method: 'GET'
      }
    },
    providesTags(result) {
      return [{ type: TASK_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const getTaskSteps = (builder: IBuilder) => {
  return builder.query<ITaskStep[], { startDate?: Date; endDate?: Date }>({
    query({ startDate, endDate }) {
      return {
        url: `/task/steps`,
        method: 'GET',
        params: {
          startDate: startDate?.toDateString(),
          endDate: endDate?.toDateString()
        }
      }
    },
    providesTags(result) {
      if (result) {
        return [...result.map(({ _id }) => ({ type: TASK_TAG_TYPE, id: _id })), { type: TASK_TAG_TYPE, id: 'LIST' }]
      }
      return [{ type: TASK_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const transferTasks = (builder: IBuilder) => {
  return builder.mutation<
    ICustomerTask[],
    {
      tasks: {
        toUserId: IUser['_id']
        taskId: ITaskStep['_id']
      }[]
    }
  >({
    query({ tasks }) {
      return {
        url: '/task/transfer',
        method: 'POST',
        data: {
          tasks
        }
      }
    },
    invalidatesTags() {
      return [{ type: TASK_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const taskApi = createApi({
  reducerPath: TASK_REDUCER_PATH,
  tagTypes: [TASK_TAG_TYPE],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    createTask: createTask(builder),
    getTasksByCustomerId: getTasksByCustomerId(builder),
    getTaskByTaskId: getTaskByTaskId(builder),
    updateTask: updateTask(builder),
    reorderTasks: reorderTasks(builder),
    getAllTaskList: getAllTaskList(builder),
    postponeTask: postponeTask(builder),
    deleteTask: deleteTask(builder),
    getUsedTaskWorkflowCounts: getUsedTaskWorkflowCounts(builder),
    getTaskCountForMonthsData: getTaskCountForMonthsData(builder),
    getTaskStepMonthlyAnalysisData: getTaskStepMonthlyAnalysisData(builder),
    getTaskSteps: getTaskSteps(builder),
    transferTasks: transferTasks(builder)
  })
})

const {
  useGetTasksByCustomerIdQuery,
  useCreateTaskMutation,
  useGetTaskByTaskIdQuery,
  useUpdateTaskMutation,
  useReorderTasksMutation,
  useGetAllTaskListQuery,
  usePostponeTaskMutation,
  useDeleteTaskMutation,
  useGetUsedTaskWorkflowCountsQuery,
  useGetTaskCountForMonthsDataQuery,
  useGetTaskStepMonthlyAnalysisDataQuery,
  useGetTaskStepsQuery,
  useLazyGetTaskStepsQuery,
  useTransferTasksMutation
} = taskApi
export {
  taskApi,
  useCreateTaskMutation,
  useGetTasksByCustomerIdQuery,
  useGetTaskByTaskIdQuery,
  useUpdateTaskMutation,
  useReorderTasksMutation,
  useGetAllTaskListQuery,
  usePostponeTaskMutation,
  useDeleteTaskMutation,
  useGetUsedTaskWorkflowCountsQuery,
  useGetTaskCountForMonthsDataQuery,
  useGetTaskStepMonthlyAnalysisDataQuery,
  useGetTaskStepsQuery,
  useLazyGetTaskStepsQuery,
  useTransferTasksMutation
}
