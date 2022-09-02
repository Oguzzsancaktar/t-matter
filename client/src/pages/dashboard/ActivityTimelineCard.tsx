import { JustifyBetweenColumn, ItemContainer, ActivityFilter } from '@/components'
import ActivityItem from '@/components/activity/ActivityItem'
import { useGetActivitiesQuery } from '@/services/activityService'
import React, { useEffect } from 'react'
import ReactTooltip from 'react-tooltip'
import DashboardCard from './DashboardCard'

const ActivityTimeline = () => {
  const { data, isLoading } = useGetActivitiesQuery({})

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [data])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <DashboardCard head={<ActivityFilter />}>
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
