import { combineReducers } from 'redux'
import { ModalReducer } from '@store/modal/index'
import { AuthReducer } from '@store/auth/index'
import { authApi } from '@services/authService'
import { userApi } from '@services/userService'

const rootReducer = combineReducers({
  auth: AuthReducer,
  modal: ModalReducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer
})

export default rootReducer
