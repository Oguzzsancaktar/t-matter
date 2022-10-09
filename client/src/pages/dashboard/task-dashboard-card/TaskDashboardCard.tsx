import * as React from 'react'
import { DashboardCard } from '@/pages'
import useAccessStore from '@hooks/useAccessStore'
import { openModal } from '@/store'
import { ESize } from '@/models'
import TaskDashboardInfoModal from '@components/modals/dashboard/TaskDashboardInfoModal'
import { TaskStepMonthlyAnalysisDashboardChart } from '@/components'
import { useGetTaskStepsQuery } from '@services/customers/taskService'
import { filterCancelledTaskSteps, filterCompletedTaskSteps, filterNewTaskSteps } from '@utils/taskUtil'
import { useEffect, useState } from 'react'

interface Props {}

const SmallBadge = ({ color, onClick, count, text }) => {
  return (
    <div
      onClick={onClick}
      style={{ display: 'flex', alignItems: 'center', marginRight: 16, cursor: 'pointer', flexDirection: 'column' }}
    >
      <span style={{ fontSize: 10 }}>{count}</span>
      <span
        style={{
          fontSize: 11,
          padding: '1px 2px',
          backgroundColor: color,
          marginTop: 2,
          color: 'white',
          borderRadius: 2
        }}
      >
        {text}
      </span>
    </div>
  )
}

const Head = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const { data, isLoading } = useGetTaskStepsQuery({})
  const [counts, setCounts] = useState<{ new: number; completed: number; cancelled: number }>({
    new: 0,
    cancelled: 0,
    completed: 0
  })

  useEffect(() => {
    if (data) {
      setCounts({
        new: filterNewTaskSteps(data).length,
        completed: filterCompletedTaskSteps(data).length,
        cancelled: filterCancelledTaskSteps(data).length
      })
    }
  }, [])

  const handleShowTaskDashboardInfoModal = page => {
    dispatch(
      openModal({
        id: `taskInfoModal`,
        title: 'Tasks info',
        body: <TaskDashboardInfoModal page={page} />,
        width: ESize.WLarge,
        maxWidth: ESize.WLarge,
        height: ESize.WXLarge,
        backgroundColor: 'transparent'
      })
    )
  }

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        height: '100%'
      }}
    >
      <SmallBadge
        count={counts.new}
        text="New tasks"
        color={'#7adad1'}
        onClick={handleShowTaskDashboardInfoModal.bind(this, 'NewTasksTab')}
      />
      <SmallBadge
        count={counts.completed}
        text="Completed"
        color={'#3b4b8d'}
        onClick={handleShowTaskDashboardInfoModal.bind(this, 'CompletedTasksTab')}
      />
      <SmallBadge
        count={counts.cancelled}
        text="Cancelled"
        color={'#ca5b5b'}
        onClick={handleShowTaskDashboardInfoModal.bind(this, 'CancelledTasksTab')}
      />
      <SmallBadge
        count={242}
        text="Transfer"
        color={'#ccc'}
        onClick={handleShowTaskDashboardInfoModal.bind(this, 'TransferTasksTab')}
      />
    </div>
  )
}

const TaskDashboardCard = Props => {
  return (
    <DashboardCard head={<Head />}>
      <TaskStepMonthlyAnalysisDashboardChart />
    </DashboardCard>
  )
}

export default TaskDashboardCard
