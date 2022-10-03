import * as React from 'react'
import { DashboardCard } from '@/pages'
import useAccessStore from '@hooks/useAccessStore'
import { FcTodoList } from 'react-icons/fc'
import { openModal } from '@/store'
import { ESize } from '@/models'
import TaskDashboardInfoModal from '@components/modals/dashboard/TaskDashboardInfoModal'

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
      <div
        onClick={handleShowTaskDashboardInfoModal.bind(this, 'NewTasksTab')}
        style={{ display: 'flex', alignItems: 'center', marginRight: 16, cursor: 'pointer' }}
      >
        <FcTodoList />
        <span style={{ marginLeft: 4 }}>111</span>
      </div>
    </div>
  )
}

const TaskDashboardCard = Props => {
  return <DashboardCard head={<Head />}>yarin</DashboardCard>
}

export default TaskDashboardCard
