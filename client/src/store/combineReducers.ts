import { combineReducers } from 'redux'
import { ModalReducer } from '@store/modal/index'
import { AuthReducer } from '@store/auth/index'
import { authApi } from '@services/authService'
import { userApi } from '@/services/settings/user-planning/userService'
import { companyPricingApi } from '@/services/settings/company-planning/companyPricingService'
import { salarySettingsApi } from '@/services/settings/company-planning/salarySettingsService'
import { userRoleApi } from '@/services/settings/user-planning/userRoleService'
import { workflowApi } from '@/services/settings/workflow-planning/workflowService'
import { dynamicVariablesApi } from '@/services/settings/company-planning/dynamicVariableService'
import { logsApi } from '@/services/userLogService'
import { customerApi } from '@/services/customers/customerService'
import { taskApi } from '@/services/customers/taskService'
import { activityApi } from '@/services/activityService'
import { financePlanningApi } from '@services/settings/finance-planning/financePlanningService'

const rootReducer = combineReducers({
  auth: AuthReducer,
  modal: ModalReducer,
  [salarySettingsApi.reducerPath]: salarySettingsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [companyPricingApi.reducerPath]: companyPricingApi.reducer,
  [userRoleApi.reducerPath]: userRoleApi.reducer,
  [workflowApi.reducerPath]: workflowApi.reducer,
  [dynamicVariablesApi.reducerPath]: dynamicVariablesApi.reducer,
  [logsApi.reducerPath]: logsApi.reducer,
  [customerApi.reducerPath]: customerApi.reducer,
  [taskApi.reducerPath]: taskApi.reducer,
  [activityApi.reducerPath]: activityApi.reducer,
  [financePlanningApi.reducerPath]: financePlanningApi.reducer
})

export default rootReducer
