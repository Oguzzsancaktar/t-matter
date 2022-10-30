import { authApi } from '@services/authService'
import { IUser } from '@models/index'
import { createSlice } from '@reduxjs/toolkit'
import { IRootState } from '../store'

type IAuthState = {
  userId: string
  accessToken: string
  user?: IUser | undefined
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: sessionStorage.getItem('userId') || '',
    accessToken: sessionStorage.getItem('accessToken') || '',
    user: JSON.parse(sessionStorage.getItem('user') || '{}')
  } as IAuthState,
  reducers: {
    logout(state: IAuthState) {
      state.userId = ''
      state.accessToken = ''
      state.user = undefined
    }
  },
  extraReducers(builder) {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken
      state.userId = action.payload.userId
      state.user = action.payload.user
    })
  }
})

export const { logout } = authSlice.actions

export const selectUser = (state: IRootState) => state.auth.user
export const selectUserId = (state: IRootState) => state.auth.userId
export const selectAccessToken = (state: IRootState) => state.auth.accessToken

export default authSlice.reducer
