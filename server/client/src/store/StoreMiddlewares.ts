import { userRoleApi } from '@/services/settings/user-planning/userRoleService'
import { salarySettingsApi } from '@/services/settings/company-planning/salarySettings'
import { companyPricingApi } from '@/services/settings/company-planning/companyPricing'

import { userApi } from '@/services/settings/user-planning/userService'
import { authApi } from '@services/authService'
import { workflowApi } from '@/services/settings/workflow-planning/workflowService'
import { locationApi } from '@/services/settings/company-planning/dynamicVariableService'

const StoreMiddlewares = [
  authApi.middleware,
  userApi.middleware,
  salarySettingsApi.middleware,
  companyPricingApi.middleware,
  userRoleApi.middleware,
  workflowApi.middleware,
  locationApi.middleware
]

export default StoreMiddlewares
