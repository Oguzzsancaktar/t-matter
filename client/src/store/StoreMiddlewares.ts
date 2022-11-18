import { websiteSettingsApi } from '@/services/settings/website-settings/websiteSettingsService'
import { userRoleApi } from '@/services/settings/user-planning/userRoleService'
import { salarySettingsApi } from '@/services/settings/company-planning/salarySettingsService'
import { companyPricingApi } from '@/services/settings/company-planning/companyPricingService'

import { userApi } from '@/services/settings/user-planning/userService'
import { authApi } from '@services/authService'
import { workflowApi } from '@/services/settings/workflow-planning/workflowService'
import { dynamicVariablesApi } from '@/services/settings/company-planning/dynamicVariableService'
import { logsApi } from '@/services/userLogService'
import { customerApi } from '@/services/customers/customerService'
import { taskApi } from '@/services/customers/taskService'
import { activityApi } from '@/services/activityService'
import { financePlanningApi } from '@services/settings/finance-planning/financePlanningService'
import { companyInfoApi } from '@services/settings/company-info/companyInfoService'
import { historyApi } from '@services/historyService'
import { customerActivityApi } from '@/services/customers/customerActivityService'
import { customerHistoryApi } from '@/services/customers/customerHistoryService'

const StoreMiddlewares = [
  authApi.middleware,
  userApi.middleware,
  salarySettingsApi.middleware,
  companyPricingApi.middleware,
  companyInfoApi.middleware,
  userRoleApi.middleware,
  workflowApi.middleware,
  dynamicVariablesApi.middleware,
  logsApi.middleware,
  customerApi.middleware,
  customerActivityApi.middleware,
  customerHistoryApi.middleware,
  taskApi.middleware,
  activityApi.middleware,
  historyApi.middleware,
  financePlanningApi.middleware,
  websiteSettingsApi.middleware
]

export default StoreMiddlewares
