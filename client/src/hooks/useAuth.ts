import { selectAccessToken, selectUserId, logout as handleLogout, selectUser } from '@store/auth/authSlice'
import useAccessStore from '@hooks/useAccessStore'
import { useEffect, useMemo } from 'react'
import { useLoginMutation, useLogoutMutation } from '@services/authService'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
  const { useAppDispatch, useAppSelector } = useAccessStore()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const accessToken = useAppSelector(selectAccessToken)
  const userId = useAppSelector(selectUserId)
  const user = useAppSelector(selectUser)

  useEffect(() => {
    sessionStorage.setItem('accessToken', accessToken)
    sessionStorage.setItem('userId', userId)
    sessionStorage.setItem('user', JSON.stringify(user || {}))
  }, [accessToken, userId, user])

  const [logoutMutation, { isLoading: isLoadingLogout }] = useLogoutMutation()

  const [login, { isError: isLoginRejected, isSuccess: isLoginSuccessfull, isLoading: isLoginLoading }] =
    useLoginMutation()

  useEffect(() => {
    if (isLoginSuccessfull) {
      navigate('/dashboard')
    }
  }, [isLoginSuccessfull])

  const logout = async () => {
    await logoutMutation({}).unwrap()
    sessionStorage.clear()
    dispatch(handleLogout())
    navigate('/login')
  }

  return {
    loggedUser: useMemo(
      () => ({
        accessToken,
        user
      }),
      [accessToken, user]
    ),
    tryLogin: { login, isLoginRejected, isLoginSuccessfull, isLoginLoading },
    logout
  }
}
