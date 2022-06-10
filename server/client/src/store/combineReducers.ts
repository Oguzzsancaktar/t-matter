import { combineReducers } from 'redux'
import { ModalReducer } from '@store/modal/index'
import { AuthReducer } from '@store/auth/index'
import { authApi } from '@services/authService'
import { userApi } from '@/services/settings/user-planning/userService'
import { companyPricingApi } from '@services/settings/company-panning/companyPricing'
import { salarySettingsApi } from '@/services/settings/company-panning/salarySettings'
import { userRoleApi } from '@/services/settings/user-planning/userRoleService'

const rootReducer = combineReducers({
  auth: AuthReducer,
  modal: ModalReducer,
  [salarySettingsApi.reducerPath]: salarySettingsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [companyPricingApi.reducerPath]: companyPricingApi.reducer,
  [userRoleApi.reducerPath]: userRoleApi.reducer
})

export default rootReducer
