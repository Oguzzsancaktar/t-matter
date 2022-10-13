import * as React from 'react'
import useAccessStore from '@hooks/useAccessStore'
import { useEffect, useMemo, useState } from 'react'
import moment from 'moment/moment'
import { useGetTaskStepsQuery } from '@services/customers/taskService'
import {
  Button,
  Checkbox,
  CustomerTaskModal,
  DatePicker,
  ItemContainer,
  JustifyBetweenRow,
  JustifyCenterColumn,
  JustifyCenterRow,
  NoTableData,
  SelectInput,
  TableSkeltonLoader,
  TaskStepMostlyAddedUser,
  TaskStepWorkFlowDonutChart,
  TaskStepYearlyCountBarChart
} from '@/components'
import { INSTALLMENT_STATUS_OPTIONS } from '@constants/finance'
import colors from '@constants/colors'
import DataTable, { TableColumn } from 'react-data-table-component'
import { ITaskStep } from '@models/Entities/workflow/task/ICustomerTask'
import { TASK_CONDITION_OPTIONS } from '@constants/task'
import {
  filterTaskStepsByCondition,
  filterTaskStepsByTaskCategory,
  filterTaskStepsByWorkflowType,
  filterTransferTaskSteps,
  isExpireCondition,
  isPostponeCondition,
  isTimerCondition,
  taskStepConditionSelector
} from '@utils/taskUtil'
import { FcClock, FcExpired, FcLeave } from 'react-icons/fc'
import { openModal } from '@/store'
import { ESize } from '@/models'
import { uniqBy } from 'lodash'
import { pipe } from '@utils/pipe'
import { useGetUsersQuery } from '@services/settings/user-planning/userService'
import { emptyQueryParams } from '@constants/queryParams'

const CompletedTasksTab = props => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const [dateRange, setDateRange] = useState({
    startDate: props.dateRange ? props.dateRange.startDate : moment().startOf('month').toDate(),
    endDate: props.dateRange ? props.dateRange.endDate : moment().endOf('month').toDate()
  })

  const [selectedCondition, setSelectedCondition] = useState('ALL')
  const [selectedWorkflowType, setSelectedWorkflowType] = useState('ALL')
  const [selectedTaskCategory, setSelectedTaskCategory] = useState('ALL')
  const [selectedToUser, setSelectedToUser] = useState('ALL')

  const [taskSteps, setTaskSteps] = useState<ITaskStep[]>([])
  const [yearlyTaskSteps, setYearlyTaskSteps] = useState<ITaskStep[]>([])
  const { data, isLoading } = useGetTaskStepsQuery(dateRange)
  const { data: yearlyData } = useGetTaskStepsQuery({
    startDate: moment().startOf('year').toDate(),
    endDate: moment().endOf('year').toDate()
  })
  const { data: users, isLoading: isUsersLoading } = useGetUsersQuery(emptyQueryParams)

  useEffect(() => {
    if (data) {
      setTaskSteps(
        filterTaskStepsByTaskCategory(
          filterTaskStepsByWorkflowType(
            filterTransferTaskSteps(filterTaskStepsByCondition(data, selectedCondition), 140),
            selectedWorkflowType
          ),
          selectedTaskCategory
        )
      )
      setYearlyTaskSteps(filterTransferTaskSteps(yearlyData, 140))
    }
  }, [data, selectedCondition, selectedWorkflowType, selectedTaskCategory])

  const columns: TableColumn<ITaskStep>[] = useMemo(() => {
    return [
      {
        name: '',
        cell: row => {
          return (
            <div
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                const taskStepsCopy = JSON.parse(JSON.stringify(taskSteps))
                const taskStepIndex = taskStepsCopy.findIndex(taskStep => taskStep._id === row._id)
                taskStepsCopy[taskStepIndex].isChecked = !taskStepsCopy[taskStepIndex].isChecked
                setTaskSteps(taskStepsCopy)
              }}
            >
              <Checkbox isChecked={row.isChecked || false} onChange={() => {}} />
            </div>
          )
        }
      },
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
        cell: d => {
          return (
            <JustifyBetweenRow>
              <JustifyCenterRow>{isTimerCondition(d) && <FcLeave />}</JustifyCenterRow>
              <JustifyCenterRow>{isPostponeCondition(d) && <FcClock />}</JustifyCenterRow>
              <JustifyCenterRow>{isExpireCondition(d) && <FcExpired />}</JustifyCenterRow>
            </JustifyBetweenRow>
          )
        }
      }
    ]
  }, [taskSteps])

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

  const handleTransfer = () => {}

  const workflowTypes = [
    ...uniqBy(
      yearlyData?.map(step => ({ label: step.workflow.name, value: step.workflow._id })),
      x => x.value
    ),
    { label: 'All', value: 'ALL' }
  ]
  const selectedWfType = workflowTypes.find(x => x.value === selectedWorkflowType)

  const taskCategories = [
    ...uniqBy(
      yearlyData?.map(step => ({ label: step.steps.category.name, value: step.steps.category._id })),
      x => x.value
    ),
    { label: 'All', value: 'ALL' }
  ]
  const selectedTC = taskCategories.find(x => x.value === selectedTaskCategory)

  const userOptions = users?.map(({ _id, firstname }) => ({ value: _id, label: firstname })) || []
  const selectedUser = userOptions.find(x => x.value === selectedToUser)
  return (
    <ItemContainer padding="1rem" height="100%">
      <JustifyBetweenRow height="200px" margin="0 0 1rem 0">
        <JustifyCenterColumn width="280px">
          <TaskStepWorkFlowDonutChart taskSteps={taskSteps} />
        </JustifyCenterColumn>
        <JustifyCenterColumn>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <TaskStepYearlyCountBarChart
              onSelectBar={(month: number) => {
                setDateRange({
                  startDate: moment().month(month).startOf('month').toDate(),
                  endDate: moment().month(month).endOf('month').toDate()
                })
              }}
              dateRange={{ startDate: moment().startOf('year').toDate(), endDate: moment().endOf('year').toDate() }}
              taskSteps={yearlyTaskSteps}
            />
            <div
              style={{
                position: 'absolute',
                color: colors.text.primary,
                fontSize: 11,
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            >
              This chart shows yearly not related below date range
            </div>
          </div>
        </JustifyCenterColumn>
        <JustifyCenterColumn width="280px">
          <TaskStepMostlyAddedUser taskSteps={taskSteps} />
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
        <div style={{ minWidth: 120, marginLeft: 8, marginRight: 8 }}>
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
        <div style={{ minWidth: 120, marginLeft: 8, marginRight: 8 }}>
          <SelectInput
            onChange={o => setSelectedWorkflowType(o.value)}
            labelText="Workflows"
            name="workflowTypes"
            options={workflowTypes}
            selectedOption={selectedWfType ? [selectedWfType] : [{ label: 'All', value: 'ALL' }]}
          />
        </div>
        <div style={{ minWidth: 120, marginLeft: 8, marginRight: 8 }}>
          <SelectInput
            onChange={o => setSelectedTaskCategory(o.value)}
            labelText="Task Categories"
            name="taskCategories"
            options={taskCategories}
            selectedOption={selectedTC ? [selectedTC] : [{ label: 'All', value: 'ALL' }]}
          />
        </div>
        <div style={{ minWidth: 120, marginLeft: 8, marginRight: 8 }}>
          <SelectInput
            onChange={o => setSelectedToUser(o.value)}
            labelText="To User"
            name="toUser"
            options={userOptions}
            selectedOption={selectedUser ? [selectedUser] : [{ label: 'All', value: 'ALL' }]}
          />
        </div>
        <div style={{ alignItems: 'flex-end', display: 'flex', height: '100%', position: 'relative', bottom: 4 }}>
          <Button height="36px" onClick={handleTransfer}>
            Apply
          </Button>
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

export default CompletedTasksTab
