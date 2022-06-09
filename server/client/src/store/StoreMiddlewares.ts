import { userRoleApi } from '@/services/settings/user-planning/userRoleService'
import { salarySettingsApi } from '@/services/settings/company-panning/salarySettings'
import { companyPricingApi } from '@/services/settings/company-panning/companyPricing'
import { userApi } from '@/services/settings/user-planning/userService'
import { authApi } from '@services/authService'

const StoreMiddlewares = [
  authApi.middleware,
  userApi.middleware,
  salarySettingsApi.middleware,
  companyPricingApi.middleware,
  userRoleApi.middleware
]

export default StoreMiddlewares
