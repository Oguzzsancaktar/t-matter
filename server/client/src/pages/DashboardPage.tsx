import { UserBadge } from '@/components'
import { useAuth } from '@hooks/useAuth'
import React from 'react'

const DashboardPage: React.FC = () => {
  const { loggedUser, logout } = useAuth()
  const handleLogout = () => {
    logout()
  }
  return (
    <div>
      {loggedUser.user && (
        <UserBadge
          userImage={'https://source.unsplash.com/user/c_v_r/100x100'}
          userName={loggedUser.user?.firstname + loggedUser.user?.lastname}
          userEmail={loggedUser.user?.email}
        />
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default DashboardPage
