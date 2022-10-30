import { selectAccessToken, selectUserId, logout as handleLogout } from '@store/auth/authSlice'
import useAccessStore from '@hooks/useAccessStore'
import { useEffect, useMemo } from 'react'
import { useLoginMutation, useLogoutMutation } from '@services/authService'
import { useGetUserByIdQuery } from '@/services/settings/user-planning/userService'

export const useAuth = () => {
  const { useAppDispatch, useAppSelector } = useAccessStore()
  const dispatch = useAppDispatch()

  const accessToken = useAppSelector(selectAccessToken)
  const userId = useAppSelector(selectUserId)

  useEffect(() => {
    sessionStorage.setItem('accessToken', accessToken)
    sessionStorage.setItem('userId', userId)
  }, [accessToken, userId])

  const {
    data: userData,
    isLoading: isLoadingLoggedUser,
    error,
    isError,
    refetch: refetchLoggedUser
  } = useGetUserByIdQuery(userId ?? '', {
    skip: !userId
  })

  const [logoutMutation, { isLoading: isLoadingLogout }] = useLogoutMutation()

  const [login, { isError: isLoginRejected, isSuccess: isLoginSuccessfull }] = useLoginMutation()

  useEffect(() => {
    if (isLoginSuccessfull) {
      window.location.href = '/'
    }
  }, [isLoginSuccessfull])

  const logout = () => {
    sessionStorage.clear()
    dispatch(handleLogout())
    logoutMutation().unwrap()
    window.location.href = '/'
  }

  return {
    loggedUser: useMemo(
      () => ({
        accessToken,
        user: userData,
        isLoading: isLoadingLoggedUser,
        error,
        isError
      }),
      [accessToken, userData, isLoadingLoggedUser, isError, error]
    ),
    tryLogin: { login, isLoginRejected, isLoginSuccessfull },
    logout
  }
}
