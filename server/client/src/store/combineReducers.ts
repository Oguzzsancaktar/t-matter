import { combineReducers } from 'redux'
import { ModalReducer } from '@store/modal/index'
import { AuthReducer } from '@store/auth/index'
import { authApi } from '@services/authService'
import { userApi } from '@/services/settings/user-planning/userService'
import { companyPricingApi } from '@/services/settings/company-planning/companyPricingService'
import { salarySettingsApi } from '@/services/settings/company-planning/salarySettingsService'
import { userRoleApi } from '@/services/settings/user-planning/userRoleService'
import { workflowApi } from '@/services/settings/workflow-planning/workflowService'
import { locationApi } from '@/services/settings/company-planning/dynamicVariableService'
import { logsApi } from '@/services/userLogService'

const rootReducer = combineReducers({
  auth: AuthReducer,
  modal: ModalReducer,
  [salarySettingsApi.reducerPath]: salarySettingsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [companyPricingApi.reducerPath]: companyPricingApi.reducer,
  [userRoleApi.reducerPath]: userRoleApi.reducer,
  [workflowApi.reducerPath]: workflowApi.reducer,
  [locationApi.reducerPath]: locationApi.reducer,
  [logsApi.reducerPath]: logsApi.reducer
})

export default rootReducer
