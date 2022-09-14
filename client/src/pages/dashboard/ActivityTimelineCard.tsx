import { JustifyBetweenColumn, ItemContainer, ActivityFilter } from '@/components'
import ActivityItem from '@/components/activity/ActivityItem'
import { emptyActivtyFilter } from '@/constants/queryParams'
import { EActivity, IUser } from '@/models'
import { useGetActivitiesQuery } from '@/services/activityService'
import React, { useEffect, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import DashboardCard from './DashboardCard'

const ActivityTimeline = () => {
  const [activityFilter, setActivityFilter] = useState(emptyActivtyFilter)

  const [userFilter, setUserFilter] = useState<IUser>()

  const handleFilterUserChange = (user: IUser) => {
    setActivityFilter({ ...activityFilter, userId: user._id })
    setUserFilter(user)
  }

  const handleTypeFilter = (categoryId: string) => {
    setActivityFilter({ ...activityFilter, categoryId })
  }

  const { data, isLoading } = useGetActivitiesQuery(activityFilter)

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [data])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <DashboardCard
      head={
        <ActivityFilter
          userFilter={userFilter}
          handleFilterUserChange={handleFilterUserChange}
          handleCategoryFilter={handleTypeFilter}
        />
      }
    >
      <JustifyBetweenColumn height="100%">
        {data?.map((activity, index) => (
          <ItemContainer height="auto" key={index}>
            <ActivityItem activity={activity} />
          </ItemContainer>
        ))}
      </JustifyBetweenColumn>
    </DashboardCard>
  )
}

export default ActivityTimeline
