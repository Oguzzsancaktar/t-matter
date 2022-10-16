import * as React from 'react'
import { DashboardCard } from '@/pages'
import useAccessStore from '@hooks/useAccessStore'
import { openModal } from '@/store'
import { ESize } from '@/models'
import TaskDashboardInfoModal from '@components/modals/dashboard/TaskDashboardInfoModal'
import { TaskStepMonthlyAnalysisDashboardChart } from '@/components'
import { useGetTaskStepsQuery } from '@services/customers/taskService'
import {
  filterCancelledTaskSteps,
  filterCompletedTaskSteps,
  filterNewTaskSteps,
  filterTaskStepsByConditions,
  filterTransferTaskSteps,
  taskStepConditionSelector
} from '@utils/taskUtil'
import { useEffect, useState } from 'react'
import { groupBy } from 'lodash'
import moment from 'moment'

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
          width: '70px',
          fontSize: 12,
          textAlign: 'center',
          fontFamily: 'Satoshi-Light',
          padding: '0.1rem 0.2rem',
          backgroundColor: color,
          marginTop: 2,
          color: 'white',
          borderRadius: '0.3rem',
          fontWeight: '600'
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
  const { data, isLoading } = useGetTaskStepsQuery({
    startDate: moment().startOf('year').toDate(),
    endDate: moment().endOf('year').toDate()
  })
  const [counts, setCounts] = useState<{
    new: number
    completed: number
    cancelled: number
    transfer: number
    condition: number
  }>({
    condition: 0,
    new: 0,
    cancelled: 0,
    completed: 0,
    transfer: 0
  })

  useEffect(() => {
    if (data) {
      const tasks = filterNewTaskSteps(groupBy(data, d => moment(d.steps.startDate).month())[moment().month()])

      setCounts({
        condition: filterTaskStepsByConditions(data).filter(d => !d.steps.seen?.condition).length,
        new: filterNewTaskSteps(data).filter(d => !d.steps.seen?.new).length,
        completed: filterCompletedTaskSteps(data.filter(d => !d.steps.seen?.completed)).length,
        cancelled: filterCancelledTaskSteps(data.filter(d => !d.steps.seen?.cancelled)).length,
        transfer: filterTransferTaskSteps(
          tasks.filter(d => !d.steps.seen?.transfer),
          140
        ).length
      })
    }
  }, [data])

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
        count={counts.condition}
        text="Conditions"
        color={'#ff7b00'}
        onClick={handleShowTaskDashboardInfoModal.bind(this, 'ConditionTasksTab')}
      />
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
        count={counts.transfer}
        text="Transfer"
        color={'#ccc'}
        onClick={handleShowTaskDashboardInfoModal.bind(this, 'TransferTasksTab')}
      />
    </div>
  )
}

const TaskDashboardCard = Props => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  return (
    <DashboardCard head={<Head />}>
      <TaskStepMonthlyAnalysisDashboardChart
        onSelectBar={x => {
          dispatch(
            openModal({
              id: `taskInfoModal`,
              title: 'Tasks info',
              body: <TaskDashboardInfoModal page="NewTasksTab" />,
              width: ESize.WLarge,
              maxWidth: ESize.WLarge,
              height: ESize.WXLarge,
              backgroundColor: 'transparent'
            })
          )
        }}
      />
    </DashboardCard>
  )
}

export default TaskDashboardCard
