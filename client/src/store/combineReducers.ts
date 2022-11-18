import { customerActivityApi } from '@/services/customers/customerActivityService'
import { combineReducers } from 'redux'
import { ModalReducer } from '@store/modal/index'
import { AuthReducer } from '@store/auth/index'
import { SocketGlobalReducer } from '@store/online-users'

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
import { companyInfoApi } from '@services/settings/company-info/companyInfoService'

import { historyApi } from '@services/historyService'
import { customerHistoryApi } from '@/services/customers/customerHistoryService'
import { hrTaskApi } from '@services/hrTaskService'

import { websiteSettingsApi } from '@/services/settings/website-settings/websiteSettingsService'

const rootReducer = combineReducers({
  auth: AuthReducer,
  modal: ModalReducer,
  socketGlobal: SocketGlobalReducer,
  [salarySettingsApi.reducerPath]: salarySettingsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [companyPricingApi.reducerPath]: companyPricingApi.reducer,
  [companyInfoApi.reducerPath]: companyInfoApi.reducer,
  [userRoleApi.reducerPath]: userRoleApi.reducer,
  [workflowApi.reducerPath]: workflowApi.reducer,
  [dynamicVariablesApi.reducerPath]: dynamicVariablesApi.reducer,
  [logsApi.reducerPath]: logsApi.reducer,
  [customerApi.reducerPath]: customerApi.reducer,
  [taskApi.reducerPath]: taskApi.reducer,
  [activityApi.reducerPath]: activityApi.reducer,
  [historyApi.reducerPath]: historyApi.reducer,
  [financePlanningApi.reducerPath]: financePlanningApi.reducer,
  [customerActivityApi.reducerPath]: customerActivityApi.reducer,
  [customerHistoryApi.reducerPath]: customerHistoryApi.reducer,
<<<<<<< HEAD
  [websiteSettingsApi.reducerPath]: websiteSettingsApi.reducer
=======
  [hrTaskApi.reducerPath]: hrTaskApi.reducer
>>>>>>> refs/remotes/origin/master
})

export default rootReducer
