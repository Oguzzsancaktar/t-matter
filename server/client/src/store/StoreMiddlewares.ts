import { salarySettingsApi } from '@/services/settings/company-panning/salarySettings'
import { companyPricingApi } from '@/services/settings/company-panning/companyPricing'
import { userApi } from '@services/userService'
import { authApi } from '@services/authService'

const StoreMiddlewares = [
  authApi.middleware,
  userApi.middleware,
  salarySettingsApi.middleware,
  companyPricingApi.middleware
]

export default StoreMiddlewares
