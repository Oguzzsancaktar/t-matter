import { RouteProps, useNavigate } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { useEffect } from 'react'

export const PrivateRoute = ({ children }: RouteProps) => {
  const {
    loggedUser: { accessToken, user }
  } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (!accessToken || !user) {
      navigate('/login')
    }
  }, [accessToken, user])

  return <>{children}</>
}
