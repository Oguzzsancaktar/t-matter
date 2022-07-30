import { ICustomer } from '@models/index'
import { axiosBaseQuery, IAxiosBaseQueryFn } from '@services/AxiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { ICustomerTask, ITask, ITaskCreateDTO } from '@/models'

const TASK_REDUCER_PATH = 'taskApi'
const TASK_TAG_TYPE = 'taskTag' as const

type IBuilder = EndpointBuilder<IAxiosBaseQueryFn, typeof TASK_TAG_TYPE, typeof TASK_REDUCER_PATH>

const createTask = (builder: IBuilder) => {
  return builder.mutation<unknown, ICustomerTask>({
    query(taskCreateDto) {
      return {
        url: `/task/${taskCreateDto.customerId}`,
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

const getTaskByCustomerId = (builder: IBuilder) => {
  return builder.query<ICustomerTask[], ICustomer['_id']>({
    query(customerId) {
      return {
        url: `/task/customer/${customerId}`,
        method: 'GET'
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

// const updateTask = (builder: IBuilder) => {
//   return builder.mutation<ITask, ITaskUpdateDTO>({
//     query(taskUpdateDto) {
//       return {
//         url: `/task`,
//         method: 'PATCH',
//         data: { ...taskUpdateDto, role: taskUpdateDto._id }
//       }
//     },
//     invalidatesTags(result) {
//       if (!result) return [{ type: TASK_TAG_TYPE, id: 'LIST' }]
//       return [{ type: TASK_TAG_TYPE, id: result._id }]
//     }
//   })
// }

const taskApi = createApi({
  reducerPath: TASK_REDUCER_PATH,
  tagTypes: [TASK_TAG_TYPE],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    createTask: createTask(builder),
    getTaskByCustomerId: getTaskByCustomerId(builder),
    getTaskByTaskId: getTaskByTaskId(builder)
    // updateTask: updateTask(builder),
  })
})

const {
  useGetTaskByCustomerIdQuery,
  useCreateTaskMutation,
  useGetTaskByTaskIdQuery
  // useUpdateTaskMutation,
} = taskApi
export {
  taskApi,
  useCreateTaskMutation,
  useGetTaskByCustomerIdQuery,
  useGetTaskByTaskIdQuery
  // useUpdateTaskMutation,
}
