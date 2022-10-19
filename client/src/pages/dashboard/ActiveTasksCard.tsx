import { Column, ItemContainer } from '@/components'

import { TaskTrackingProgress } from '@/components/task-tracking-progress'
import React, { useEffect, useState } from 'react'

import DashboardCard from './DashboardCard'
import OfflineUsers from './OfflineUsers'
import { IActiveTaskStep } from '@models/Entities/workflow/task/ICustomerTask'
import useAccessStore from '@hooks/useAccessStore'

const ActiveTasksCard = () => {
  const [activeTaskSteps, setActiveTaskSteps] = useState<IActiveTaskStep[]>([])
  const { useAppSelector } = useAccessStore()
  const socket = useAppSelector(state => state.socketGlobal.socket)

  useEffect(() => {
    if (!socket) {
      return
    }
    socket.on('activeTaskSteps', (data: IActiveTaskStep[]) => {
      setActiveTaskSteps(data)
    })
    return () => {
      socket.off('activeTaskSteps')
    }
  }, [])

  return (
    <DashboardCard head={<OfflineUsers />}>
      <Column height="100%">
        {activeTaskSteps.map(activeTaskStep => (
          <TaskTrackingProgress activeTaskStep={activeTaskStep} />
        ))}
      </Column>
    </DashboardCard>
  )
}

export default ActiveTasksCard
