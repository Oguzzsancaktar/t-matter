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
  return builder.mutation<ICustomerTask[], ITaskFilter>({
    query({ categoryArr, userArr, statusArr, customerId }) {
      return {
        url: `/task`,
        method: 'POST',
        data: {
          customerId,
          categoryArr,
          userArr,
          statusArr
        }
      }
    },
    invalidatesTags() {
      return [{ type: TASK_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const getTasksByCustomerId = (builder: IBuilder) => {
  return builder.query<
    ICustomerTask[],
    { customerId: ICustomer['_id']; isInvoiced?: boolean; year?: string; startDate?: Date } & IQueryParams
  >({
    query({ customerId, isInvoiced, search, size, status, year }) {
      return {
        url: `/task/customer/${customerId}`,
        method: 'GET',
        params: {
          isInvoiced,
          search,
          size,
          status,
          year
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
          customer: taskUpdateDto.customer?._id || taskUpdateDto.customer,
          steps: taskUpdateDto.steps.map(step => ({
            ...step,
            responsibleUser: step.responsibleUser._id,
            addedFrom: step.addedFrom?._id,
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
        stepIndex: ITaskStep['stepIndex']
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

const updateTaskStepsSeen = (builder: IBuilder) => {
  return builder.mutation<
    ICustomerTask[],
    {
      tasks: {
        stepIndex: ITaskStep['stepIndex']
        taskId: ITaskStep['_id']
      }[]
    }
  >({
    query({ tasks }) {
      return {
        url: `/task/seen`,
        method: 'POST',
        data: {
          tasks
        }
      }
    },
    invalidatesTags(result) {
      if (result) {
        return [...result.map(({ _id }) => ({ type: TASK_TAG_TYPE, id: _id })), { type: TASK_TAG_TYPE, id: 'LIST' }]
      }
      return [{ type: TASK_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const postponeTaskStep = (builder: IBuilder) => {
  return builder.mutation<
    ICustomerTask,
    {
      taskId: ITaskStep['_id']
      stepIndex: ITaskStep['stepIndex']
      postponedDate: number
    }
  >({
    query({ taskId, stepIndex, postponedDate }) {
      return {
        url: `/task/postpone/${taskId}`,
        method: 'PATCH',
        data: {
          stepIndex,
          postponedDate
        }
      }
    },
    invalidatesTags(result) {
      return [{ type: TASK_TAG_TYPE, id: 'LIST' }]
    }
  })
}
// charts

const getCustomerMostUsedUserInTasks = (builder: IBuilder) => {
  return builder.query<
    { _id: IUser['_id']; count: number; responsibleUser: IUser }[],
    { customerId: ICustomer['_id'] }
  >({
    query({ customerId }) {
      return {
        url: `/task/chart/customer-most-used-user/${customerId}`,
        method: 'GET'
      }
    },
    providesTags(result) {
      return [{ type: TASK_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const getCustomerTasksTimerAnalyises = (builder: IBuilder) => {
  return builder.query<
    { _id: ICustomer['_id']; totalDuration: number; totalPassedTime: number }[],
    { customerId: ICustomer['_id'] }
  >({
    query({ customerId }) {
      return {
        url: `/task/chart/customer-timer-analyis/${customerId}`,
        method: 'GET'
      }
    },
    providesTags(result) {
      return [{ type: TASK_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const getTaskYearsWithCustomerId = (builder: IBuilder) => {
  return builder.query<{ _id: number; count: number }[], { customerId: ICustomer['_id'] }>({
    query({ customerId }) {
      return {
        method: 'GET',
        url: `/task/customer-task-years/${customerId}`
      }
    },
    providesTags(result) {
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
    transferTasks: transferTasks(builder),
    updateTaskStepsSeen: updateTaskStepsSeen(builder),
    getCustomerMostUsedUserInTasks: getCustomerMostUsedUserInTasks(builder),
    getCustomerTasksTimerAnalyises: getCustomerTasksTimerAnalyises(builder),
    getTaskYearsWithCustomerId: getTaskYearsWithCustomerId(builder),
    postponeTaskStep: postponeTaskStep(builder)
  })
})

const {
  useGetTasksByCustomerIdQuery,
  useLazyGetTasksByCustomerIdQuery,
  useCreateTaskMutation,
  useGetTaskByTaskIdQuery,
  useUpdateTaskMutation,
  useReorderTasksMutation,
  usePostponeTaskMutation,
  useDeleteTaskMutation,
  useGetUsedTaskWorkflowCountsQuery,
  useGetTaskCountForMonthsDataQuery,
  useGetTaskStepMonthlyAnalysisDataQuery,
  useGetTaskStepsQuery,
  useLazyGetTaskStepsQuery,
  useTransferTasksMutation,
  useUpdateTaskStepsSeenMutation,
  useGetCustomerMostUsedUserInTasksQuery,
  useGetCustomerTasksTimerAnalyisesQuery,
  useGetTaskYearsWithCustomerIdQuery,
  useGetAllTaskListMutation,
  usePostponeTaskStepMutation
} = taskApi
export {
  taskApi,
  useCreateTaskMutation,
  useGetTasksByCustomerIdQuery,
  useGetTaskByTaskIdQuery,
  useUpdateTaskMutation,
  useReorderTasksMutation,
  usePostponeTaskMutation,
  useDeleteTaskMutation,
  useGetUsedTaskWorkflowCountsQuery,
  useGetTaskCountForMonthsDataQuery,
  useGetTaskStepMonthlyAnalysisDataQuery,
  useGetTaskStepsQuery,
  useLazyGetTaskStepsQuery,
  useTransferTasksMutation,
  useUpdateTaskStepsSeenMutation,
  useGetCustomerMostUsedUserInTasksQuery,
  useGetCustomerTasksTimerAnalyisesQuery,
  useGetTaskYearsWithCustomerIdQuery,
  useGetAllTaskListMutation,
  usePostponeTaskStepMutation,
  useLazyGetTasksByCustomerIdQuery
}
