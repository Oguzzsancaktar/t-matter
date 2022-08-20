import { Column, ItemContainer } from '@/components'

import { TaskTrackingProgress } from '@/components/task-tracking-progress'
import React from 'react'

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
