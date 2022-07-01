import { axiosBaseQuery, IAxiosBaseQueryFn } from '@services/AxiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { IUser, IUserCreateDTO, IUserUpdateDTO } from '@/models'

const USER_REDUCER_PATH = 'userApi'
const USER_TAG_TYPE = 'userTag' as const

type IBuilder = EndpointBuilder<IAxiosBaseQueryFn, typeof USER_TAG_TYPE, typeof USER_REDUCER_PATH>

const getUsers = (builder: IBuilder) => {
  return builder.query<IUser[], void>({
    query() {
      return {
        url: `/user`,
        method: 'GET'
      }
    },
    providesTags(result) {
      if (!result) return [{ type: USER_TAG_TYPE, id: 'LIST' }]
      return [...result.map(user => ({ type: USER_TAG_TYPE, id: user._id })), { type: USER_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const createUser = (builder: IBuilder) => {
  return builder.mutation<unknown, IUserCreateDTO>({
    query(userCreateDto) {
      return {
        url: '/user',
        method: 'POST',
        data: userCreateDto
      }
    },
    invalidatesTags() {
      return [{ type: USER_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const getUserById = (builder: IBuilder) => {
  return builder.query<IUser, IUser['_id']>({
    query(userId) {
      return {
        url: `/user/${userId}`,
        method: 'GET'
      }
    },
    providesTags(result) {
      if (!result) return [{ type: USER_TAG_TYPE, id: 'LIST' }]
      return [
        { type: USER_TAG_TYPE, id: result._id },
        { type: USER_TAG_TYPE, id: 'LIST' }
      ]
    }
  })
}

const updateUser = (builder: IBuilder) => {
  return builder.mutation<IUser, Omit<IUserUpdateDTO, 'password'>>({
    query(userUpdateDto) {
      return {
        url: `/user`,
        method: 'PATCH',
        data: { ...userUpdateDto, role: userUpdateDto.role._id }
      }
    },
    invalidatesTags(result) {
      if (!result) return [{ type: USER_TAG_TYPE, id: 'LIST' }]
      return [{ type: USER_TAG_TYPE, id: result._id }]
    }
  })
}

const updateUserStatus = (builder: IBuilder) => {
  return builder.mutation<any, Pick<IUserUpdateDTO, '_id' | 'status'>>({
    query(dto) {
      return {
        url: `/user/${dto._id}/status`,
        method: 'PATCH',
        data: { status: dto.status }
      }
    },
    invalidatesTags(result) {
      return [{ type: USER_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const userApi = createApi({
  reducerPath: USER_REDUCER_PATH,
  tagTypes: [USER_TAG_TYPE],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getUsers: getUsers(builder),
    createUser: createUser(builder),
    getUserById: getUserById(builder),
    updateUser: updateUser(builder),
    updateUserStatus: updateUserStatus(builder)
  })
})

const {
  useGetUsersQuery,
  useCreateUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useUpdateUserStatusMutation
} = userApi
export {
  userApi,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useUpdateUserStatusMutation
}
