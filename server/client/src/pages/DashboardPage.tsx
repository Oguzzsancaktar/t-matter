import { Baloon, UserBadge } from '@/components'
import { useAuth } from '@hooks/useAuth'
import React from 'react'
import { useGetActivitiesQuery } from '@services/activityService'
import ActivityItem from '@components/activity/ActivityItem'

const DashboardPage: React.FC = () => {
  const { loggedUser, logout } = useAuth()
  const { data, isLoading } = useGetActivitiesQuery({})

  const handleLogout = () => {
    logout()
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {data?.map(activity => (
        <ActivityItem activity={activity} />
      ))}
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
