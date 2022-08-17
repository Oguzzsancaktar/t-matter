import { axiosBaseQuery, IAxiosBaseQueryFn } from '@services/AxiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { IRole, ICreateRoleDTO, IUpdateRoleDTO, IQueryParams } from '@/models'

const USER_ROLE_API_REDUCER_PATH = 'userRoleApi'
const USER_ROLE_TAG = 'userRoleTag'

type IBuilder = EndpointBuilder<IAxiosBaseQueryFn, typeof USER_ROLE_TAG, typeof USER_ROLE_API_REDUCER_PATH>

const getRoles = (builder: IBuilder) => {
  return builder.query<IRole[], IQueryParams>({
    query({ search = '', size, status = 1 }) {
      return {
        url: `/role?search=${search !== undefined ? search : ''}&status=${status !== undefined ? status : ''}&size=${
          size !== undefined ? size : ''
        }`,
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
  return builder.mutation<IRole, Omit<IUpdateRoleDTO, 'status'>>({
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

const updateRoleStatus = (builder: IBuilder) => {
  return builder.mutation<any, Omit<IUpdateRoleDTO, 'name'>>({
    query(dto) {
      return {
        url: `/role/${dto._id}/status`,
        method: 'PATCH',
        data: { status: dto.status }
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
    updateRoleStatus: updateRoleStatus(builder),
    createRole: createRole(builder)
  })
})

const {
  useGetRolesQuery,
  useGetRoleByIdQuery,
  usePatchRoleMutation,
  useUpdateRoleStatusMutation,
  useCreateRoleMutation
} = userRoleApi
export {
  userRoleApi,
  useGetRolesQuery,
  useGetRoleByIdQuery,
  usePatchRoleMutation,
  useUpdateRoleStatusMutation,
  useCreateRoleMutation
}
