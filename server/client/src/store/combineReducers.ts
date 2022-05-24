import { combineReducers } from 'redux'
import { ModalReducer } from '@store/modal/index'
import { AuthReducer } from '@store/auth/index'
import { authApi } from '@services/authService'
import { userApi } from '@services/userService'
import { salarySettingsApi } from '@/services/settings/company-panning/salarySettings'

const rootReducer = combineReducers({
  auth: AuthReducer,
  modal: ModalReducer,
  [salarySettingsApi.reducerPath]: salarySettingsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer
})

export default rootReducer
