import { axiosBaseQuery, IAxiosBaseQueryFn } from '@services/AxiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { IQueryParams, IUser, IUserCreateDTO, IUserUpdateDTO } from '@/models'
import IUserHrSetting from '@models/Entities/user/IUserHrSetting'

const USER_REDUCER_PATH = 'userApi'
const USER_TAG_TYPE = 'userTag' as const

const COMPANY_PRICING_TAG = 'companyPricingTag'
const USER_HR_TAG = 'userHrTag'

type IBuilder = EndpointBuilder<
  IAxiosBaseQueryFn,
  typeof USER_TAG_TYPE | typeof COMPANY_PRICING_TAG | typeof USER_HR_TAG,
  typeof USER_REDUCER_PATH
>

const getUsers = (builder: IBuilder) => {
  return builder.query<IUser[], IQueryParams>({
    query({ search = '', size, status = 1 }) {
      return {
        url: `/user?search=${search !== undefined ? search : ''}&status=${status !== undefined ? status : ''}&size=${
          size !== undefined ? size : ''
        }`,
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
      return [
        { type: USER_TAG_TYPE, id: 'LIST' },
        { type: COMPANY_PRICING_TAG, id: 'LIST' }
      ]
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

const addOrUpdateUserImage = (builder: IBuilder) => {
  return builder.mutation<IUser, Pick<IUser, '_id'> & { file: FormData }>({
    query(dto) {
      return {
        url: `/user/image/${dto._id}`,
        method: 'POST',
        data: dto.file
      }
    },
    invalidatesTags(result) {
      return [{ type: USER_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const getUserHrSetting = (builder: IBuilder) => {
  return builder.query<IUserHrSetting, IUser['_id']>({
    query(userId) {
      return {
        url: `/hr-setting/${userId}`,
        method: 'GET'
      }
    },
    providesTags(result) {
      return [{ type: USER_HR_TAG, id: 'LIST' }]
    }
  })
}

const updateUserHrSetting = (builder: IBuilder) => {
  return builder.mutation<void, IUserHrSetting>({
    query(dto) {
      return {
        url: `/hr-setting/${dto.owner}`,
        method: 'POST',
        data: dto
      }
    },
    invalidatesTags(result) {
      return [{ type: USER_HR_TAG, id: 'LIST' }]
    }
  })
}

const userApi = createApi({
  reducerPath: USER_REDUCER_PATH,
  tagTypes: [USER_TAG_TYPE, COMPANY_PRICING_TAG, USER_HR_TAG],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getUsers: getUsers(builder),
    createUser: createUser(builder),
    getUserById: getUserById(builder),
    updateUser: updateUser(builder),
    updateUserStatus: updateUserStatus(builder),
    addOrUpdateUserImage: addOrUpdateUserImage(builder),
    getUserHrSetting: getUserHrSetting(builder),
    updateUserHrSetting: updateUserHrSetting(builder)
  })
})

const {
  useGetUsersQuery,
  useCreateUserMutation,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useUpdateUserMutation,
  useUpdateUserStatusMutation,
  useAddOrUpdateUserImageMutation,
  useGetUserHrSettingQuery
} = userApi
export {
  userApi,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useUpdateUserStatusMutation,
  useAddOrUpdateUserImageMutation,
  useGetUserHrSettingQuery
}
