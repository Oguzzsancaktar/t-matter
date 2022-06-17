import { userRoleApi } from '@/services/settings/user-planning/userRoleService'
import { salarySettingsApi } from '@/services/settings/company-planning/salarySettings'
import { companyPricingApi } from '@/services/settings/company-planning/companyPricing'
import { userApi } from '@/services/settings/user-planning/userService'
import { authApi } from '@services/authService'
import { workflowApi } from '@/services/settings/workflow-planning/workflowService'

const StoreMiddlewares = [
  authApi.middleware,
  userApi.middleware,
  salarySettingsApi.middleware,
  companyPricingApi.middleware,
  userRoleApi.middleware,
  workflowApi.middleware
]

export default StoreMiddlewares
