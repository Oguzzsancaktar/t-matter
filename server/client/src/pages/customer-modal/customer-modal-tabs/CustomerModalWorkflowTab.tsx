import {
  ActionButtons,
  Column,
  CustomerTaskModal,
  DataTableHeader,
  ItemContainer,
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterColumn,
  NoTableData,
  SelectTaskWorkflowModal,
  TableSkeltonLoader,
  TaskProgress
} from '@/components'
import { TaskActiveStepUser } from '@/components/client-task/task-active-step-user'
import colors from '@/constants/colors'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize, ICustomer } from '@/models'
import { useGetTasksByCustomerIdQuery } from '@/services/customers/taskService'
import { openModal } from '@/store'
import moment from 'moment'
import React from 'react'
import DataTable from 'react-data-table-component'

interface IProps {
  customer: ICustomer
}

const CustomerModalWorkflowTab: React.FC<IProps> = ({ customer }) => {
  const { data: customerTasksData, isLoading: customerTasksIsLoading } = useGetTasksByCustomerIdQuery(customer._id)

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const columns = [
    {
      name: 'Start Date',
      selector: row => moment(row.startDate).format('MMMM/DD/YYYY'),
      sortable: true
    },
    {
      name: 'Workflow Name',
      selector: row => row.name,
      sortable: true
    },
    {
      name: 'Steps',
      selector: row => row.name,
      sortable: true,
      cell: data => <TaskProgress taskSteps={data.steps} />
    },
    {
      name: 'User',
      selector: row => row.steps,
      sortable: true,
      cell: data => <TaskActiveStepUser taskSteps={data.steps} />
    },

    {
      name: 'Actions',
      width: '120px',
      selector: row => row.year,
      right: true,
      header: ({ title }) => <div style={{ textAlign: 'center', color: 'red' }}>{title}</div>,
      cell: data => (
        <ActionButtons
          onEdit={function (): void {
            throw new Error('Function not implemented.')
          }}
          onHistory={function (): void {
            throw new Error('Function not implemented.')
          }}
          onDelete={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      )
    }
  ]

  const openCustomerTaskModal = taskId => {
    dispatch(
      openModal({
        id: 'customerTaksModal' + taskId,
        title: 'Customer Task',
        body: <CustomerTaskModal taskId={taskId} />,
        width: ESize.WXLarge,
        height: ESize.HLarge,
        backgroundColor: colors.gray.light
      })
    )
  }

  const openSelectTaskWorkflowModal = () => {
    dispatch(
      openModal({
        id: 'selectTaskWorkflowModal-' + customer._id,
        title: 'Customer Task',
        body: <SelectTaskWorkflowModal customer={customer} />,
        width: ESize.WSmall,
        height: ESize.HMedium,
        maxWidth: ESize.WSmall,
        backgroundColor: colors.gray.light
      })
    )
  }

  return (
    <ItemContainer>
      <JustifyBetweenColumn height="100%">
        <JustifyBetweenRow height="200px" margin="0 0 1rem 0">
          <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
          <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
          <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
        </JustifyBetweenRow>
        <Column height="calc(100% - 200px - 1rem)">
          <DataTableHeader handleAddNew={() => openSelectTaskWorkflowModal()} />

          <ItemContainer height="calc(100% - 38px - 0.5rem)">
            {customerTasksIsLoading ? (
              <ItemContainer height="100%">
                <TableSkeltonLoader count={13} />
              </ItemContainer>
            ) : customerTasksData && customerTasksData.length > 0 ? (
              <DataTable
                fixedHeader
                columns={columns}
                data={customerTasksData || []}
                onRowClicked={data => openCustomerTaskModal(data._id)}
              />
            ) : (
              <NoTableData />
            )}
          </ItemContainer>
        </Column>
      </JustifyBetweenColumn>
    </ItemContainer>
  )
}

export default CustomerModalWorkflowTab
