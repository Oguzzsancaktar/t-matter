import * as React from 'react'
import { DashboardCard } from '@/pages'
import useAccessStore from '@hooks/useAccessStore'
import { FcBearish, FcBullish, FcTimeline, FcTodoList } from 'react-icons/fc'
import { openModal } from '@/store'
import { ESize } from '@/models'
import TaskDashboardInfoModal from '@components/modals/dashboard/TaskDashboardInfoModal'
import { TaskStepMonthlyAnalysisDashboardChart } from '@/components'

interface Props {}

const Head = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

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
      <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', left: 0 }}>
        <span style={{ marginRight: 2, fontSize: 10 }}>Avg:</span>
        <span style={{ fontSize: 12 }}>$450</span>
      </div>
      <div
        onClick={handleShowTaskDashboardInfoModal.bind(this, 'NewTasksTab')}
        style={{ display: 'flex', alignItems: 'center', marginRight: 16, cursor: 'pointer' }}
      >
        <FcTimeline />
        <span style={{ marginLeft: 4 }}>{222}</span>
      </div>
      <div
        onClick={handleShowTaskDashboardInfoModal.bind(this, 'NewTasksTab')}
        style={{ display: 'flex', alignItems: 'center', marginRight: 16, cursor: 'pointer' }}
      >
        <FcTodoList />
        <span style={{ marginLeft: 4 }}>111</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', right: 0 }}>
        {false ? <FcBearish /> : <FcBullish />}
        <span style={{ marginLeft: 4 }}>21%</span>
      </div>
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
