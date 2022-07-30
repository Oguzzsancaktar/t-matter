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

const StoreMiddlewares = [
  authApi.middleware,
  userApi.middleware,
  salarySettingsApi.middleware,
  companyPricingApi.middleware,
  userRoleApi.middleware,
  workflowApi.middleware,
  dynamicVariablesApi.middleware,
  logsApi.middleware,
  customerApi.middleware,
  taskApi.middleware
]

export default StoreMiddlewares
