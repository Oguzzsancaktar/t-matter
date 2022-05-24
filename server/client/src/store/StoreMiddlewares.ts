import { salarySettingsApi } from '@/services/settings/company-panning/salarySettings'
import { userApi } from '@services/userService'
import { authApi } from '@services/authService'

const StoreMiddlewares = [authApi.middleware, userApi.middleware, salarySettingsApi.middleware]

export default StoreMiddlewares
