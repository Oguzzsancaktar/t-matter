import { axiosBaseQuery, IAxiosBaseQueryFn } from '@services/AxiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { IRole, ICreateRoleDTO, IUpdateRoleDTO } from '@/models'

const USER_ROLE_API_REDUCER_PATH = 'userRoleApi'
const USER_ROLE_TAG = 'userRoleTag'

type IBuilder = EndpointBuilder<IAxiosBaseQueryFn, typeof USER_ROLE_TAG, typeof USER_ROLE_API_REDUCER_PATH>

const getRoles = (builder: IBuilder) => {
  return builder.query<IRole[], void>({
    query() {
      return {
        url: '/role',
        method: 'GET'
      }
    },
    providesTags() {
      return [{ type: USER_ROLE_TAG, id: 'LIST' }]
    }
  })
}

const getRoleById = (builder: IBuilder) => {
  return builder.query<IRole, IRole['_id']>({
    query(id) {
      return {
        url: `/role/${id}`,
        method: 'GET'
      }
    },
    providesTags() {
      return [{ type: USER_ROLE_TAG, id: 'LIST' }]
    }
  })
}

const createRole = (builder: IBuilder) => {
  return builder.mutation<string, ICreateRoleDTO>({
    query(dto) {
      return {
        url: '/role',
        method: 'POST',
        data: dto
      }
    },
    invalidatesTags(result) {
      return [{ type: USER_ROLE_TAG, id: 'LIST' }]
    }
  })
}

const patchRole = (builder: IBuilder) => {
  return builder.mutation<IRole, IUpdateRoleDTO>({
    query(dto) {
      return {
        url: '/role',
        method: 'PATCH',
        data: dto
      }
    },
    invalidatesTags(result) {
      return [{ type: USER_ROLE_TAG, id: 'LIST' }]
    }
  })
}

const inactivateRole = (builder: IBuilder) => {
  return builder.mutation<IRole, IUpdateRoleDTO>({
    query(dto) {
      return {
        url: '/role',
        method: 'PATCH',
        data: dto
      }
    },
    invalidatesTags(result) {
      return [{ type: USER_ROLE_TAG, id: 'LIST' }]
    }
  })
}

const userRoleApi = createApi({
  reducerPath: USER_ROLE_API_REDUCER_PATH,
  tagTypes: [USER_ROLE_TAG],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getRoles: getRoles(builder),
    getRoleById: getRoleById(builder),
    patchRole: patchRole(builder),
    createRole: createRole(builder)
  })
})

const { useGetRolesQuery, useGetRoleByIdQuery, usePatchRoleMutation, useCreateRoleMutation } = userRoleApi
export { userRoleApi, useGetRolesQuery, useGetRoleByIdQuery, usePatchRoleMutation, useCreateRoleMutation }
