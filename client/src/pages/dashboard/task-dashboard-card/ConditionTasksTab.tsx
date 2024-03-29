import * as React from 'react'
import useAccessStore from '@hooks/useAccessStore'
import { useEffect, useState } from 'react'
import moment from 'moment/moment'
import { useGetTaskStepsQuery, useUpdateTaskStepsSeenMutation } from '@services/customers/taskService'
import {
  CustomerTaskModal,
  DatePicker,
  ItemContainer,
  JustifyBetweenRow,
  JustifyCenterColumn,
  JustifyCenterRow,
  NoTableData,
  SelectInput,
  TableSkeltonLoader,
  TaskStepWorkFlowDonutChart,
  TaskStepYearlyCountBarChart,
  TaskStepConditionDonutChart,
  TaskStepMostlyAddedUser,
  TaskStepUsers
} from '@/components'
import colors from '@constants/colors'
import DataTable, { TableColumn } from 'react-data-table-component'
import { ITaskStep } from '@models/Entities/workflow/task/ICustomerTask'
import { TASK_CONDITION_OPTIONS } from '@constants/task'
import {
  filterCompletedTaskSteps,
  filterNewTaskSteps,
  filterTaskStepsByCondition,
  filterTaskStepsByConditions,
  isExpireCondition,
  isPostponeCondition,
  isTimerCondition,
  taskStepConditionSelector
} from '@utils/taskUtil'
import { FcClock, FcExpired, FcLeave } from 'react-icons/fc'
import { openModal } from '@/store'
import { ESize } from '@/models'

const ConditionTasksTab = props => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const [dateRange, setDateRange] = useState({
    startDate: props.dateRange ? props.dateRange.startDate : moment().startOf('year').toDate(),
    endDate: props.dateRange ? props.dateRange.endDate : moment().endOf('year').toDate()
  })
  const [selectedCondition, setSelectedCondition] = useState('ALL')
  const [taskSteps, setTaskSteps] = useState<ITaskStep[]>([])
  const { data, isLoading } = useGetTaskStepsQuery(dateRange)
  const [seenUpdate] = useUpdateTaskStepsSeenMutation()

  useEffect(() => {
    if (data) {
      const conditionTasks = filterTaskStepsByConditions(data).filter(d => !d.steps.seen?.condition)
      seenUpdate({
        tasks: conditionTasks.map(d => ({ taskId: d._id, stepIndex: d.stepIndex, name: 'condition' }))
      }).unwrap()
      setTaskSteps(filterTaskStepsByConditions(filterTaskStepsByCondition(data, selectedCondition)))
    }
  }, [data, selectedCondition])

  const columns: TableColumn<ITaskStep>[] = [
    {
      name: 'Added',
      selector: row => {
        if (row.steps.addedFrom) {
          return row.steps.addedFrom?.firstname + ' ' + row.steps.addedFrom?.lastname
        }
        return ''
      },
      sortable: true,
      cell: row => {
        if (row.steps.addedFrom) {
          return row.steps.addedFrom?.firstname + ' ' + row.steps.addedFrom?.lastname
        }
        return ''
      }
    },
    {
      name: 'Date',
      selector: row => moment(row.steps.startDate).toString(),
      sortable: true,
      cell: d => moment(d.steps.startDate).format('MMM/DD/YYYY')
    },
    {
      name: 'Customer',
      selector: row => row.customer.firstname + ' ' + row.customer.lastname,
      sortable: true,
      cell: d => d.customer.firstname + ' ' + d.customer.lastname
    },
    {
      name: 'Task name',
      selector: row => row.name + ' ' + row.steps.category.name,
      sortable: true,
      cell: d => d.name + ' - ' + d.steps.category.name
    },
    {
      name: 'Conditions',
      selector: taskStepConditionSelector,
      sortable: true,
      width: '140px',
      cell: d => {
        return (
          <JustifyBetweenRow>
            <JustifyCenterRow>{isTimerCondition(d) && <FcLeave size="20px" />}</JustifyCenterRow>
            <JustifyCenterRow>{isPostponeCondition(d) && <FcClock size="20px" />}</JustifyCenterRow>
            <JustifyCenterRow>{isExpireCondition(d) && <FcExpired size="20px" />}</JustifyCenterRow>
          </JustifyBetweenRow>
        )
      }
    }
  ]

  const handleRowClicked = (row: ITaskStep) => {
    dispatch(
      openModal({
        id: 'customerTaksModal' + row._id,
        title: 'Customer Task',
        body: <CustomerTaskModal customer={row.customer} customerId={row.customer?._id} taskId={row._id as string} />,
        width: ESize.WXLarge,
        height: ESize.HLarge,
        maxWidth: ESize.WXLarge,
        backgroundColor: colors.gray.light
      })
    )
  }

  return (
    <ItemContainer padding="1rem" height="100%">
      <JustifyBetweenRow height="200px" margin="0 0 1rem 0">
        <JustifyCenterColumn width="280px">
          <TaskStepConditionDonutChart taskSteps={taskSteps} />
        </JustifyCenterColumn>
        <JustifyCenterColumn>
          <TaskStepYearlyCountBarChart
            onSelectBar={(month: number) => {
              setDateRange({
                startDate: moment().month(month).startOf('month').toDate(),
                endDate: moment().month(month).endOf('month').toDate()
              })
            }}
            taskSteps={taskSteps}
            dateRange={dateRange}
          />
        </JustifyCenterColumn>
        <JustifyCenterColumn width="280px">
          <TaskStepUsers taskSteps={taskSteps} />
        </JustifyCenterColumn>
      </JustifyBetweenRow>
      <JustifyBetweenRow height="65px" margin="0 0 0.5rem 0">
        <div style={{ minWidth: 330, display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: 8 }}>
            <DatePicker
              labelText="Start Date"
              name="startDate"
              onChange={(date: Date[]) => setDateRange({ startDate: date[0], endDate: dateRange.endDate })}
              value={dateRange.startDate}
            />
          </div>
          <div>
            <DatePicker
              labelText="End Date"
              name="endDate"
              onChange={(date: Date[]) => setDateRange({ endDate: date[0], startDate: dateRange.startDate })}
              value={dateRange.endDate}
            />
          </div>
        </div>
        <div style={{ minWidth: 200, marginLeft: 8, marginRight: 8 }}>
          <SelectInput
            selectedOption={[...TASK_CONDITION_OPTIONS]?.filter(x => x.value === selectedCondition) || []}
            labelText="Conditions"
            onChange={o => {
              setSelectedCondition(o.value)
            }}
            name="conditions"
            options={[...TASK_CONDITION_OPTIONS]}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', flex: 1, height: '100%', paddingBottom: 3 }}>
          <div
            style={{
              width: '100%',
              padding: '5px 10px',
              backgroundColor: 'rgba(248,245,245,0.82)',
              borderRadius: 3,
              marginRight: 8,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span style={{ color: colors.green.primary, marginRight: 3 }}>incoming -</span>
            <span style={{ color: colors.green.primary }}>section</span>
          </div>
          <div
            style={{
              width: '100%',
              padding: '5px 10px',
              backgroundColor: 'rgba(248,245,245,0.82)',
              borderRadius: 3,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span style={{ color: colors.red.primary, marginRight: 3 }}>incoming -</span>
            <span style={{ color: colors.red.primary }}>section</span>
          </div>
        </div>
      </JustifyBetweenRow>
      <ItemContainer height="calc(100% - 300px)">
        {isLoading ? (
          <ItemContainer height="100%">
            <TableSkeltonLoader count={13} />
          </ItemContainer>
        ) : taskSteps && taskSteps.length > 0 ? (
          <DataTable
            className="data-table"
            fixedHeader
            columns={columns}
            data={taskSteps || []}
            onRowClicked={handleRowClicked}
          />
        ) : (
          <NoTableData />
        )}
      </ItemContainer>
    </ItemContainer>
  )
}

export default ConditionTasksTab
