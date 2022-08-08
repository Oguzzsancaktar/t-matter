import { Column, ItemContainer, JustifyBetweenColumn } from '@/components'
import ActivityItem from '@/components/activity/ActivityItem'
import { TaskTrackingProgress } from '@/components/task-tracking-progress'
import React from 'react'
import ActivityTimelineFilter from './ActivityTimelineFilter'
import DashboardCard from './DashboardCard'
import OfflineUsers from './OfflineUsers'

const ActiveTasksCard = () => {
  return (
    <DashboardCard head={<OfflineUsers />}>
      <Column height="100%">
        <ItemContainer margin="0.5rem 0">
          <TaskTrackingProgress />
        </ItemContainer>

        <ItemContainer margin="0.5rem 0">
          <TaskTrackingProgress />
        </ItemContainer>
        <ItemContainer margin="0.5rem 0">
          <TaskTrackingProgress />
        </ItemContainer>
      </Column>
    </DashboardCard>
  )
}

export default ActiveTasksCard
