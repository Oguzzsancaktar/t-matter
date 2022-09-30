import {
  ActionButtons,
  Column,
  ConfirmModal,
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
import colors from '@/constants/colors'
import { emptyQueryParams } from '@/constants/queryParams'
import { taskStatusOptions } from '@/constants/statuses'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize, EStatus, ETaskStatus, ICustomer, ITask } from '@/models'
import { useDeleteTaskMutation, useGetTasksByCustomerIdQuery } from '@/services/customers/taskService'
import { closeModal, openModal } from '@/store'
import { toastError, toastSuccess } from '@/utils/toastUtil'
import moment from 'moment'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'

interface IProps {
  customer: ICustomer
}

const CustomerModalWorkflowTab: React.FC<IProps> = ({ customer }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [deleteTask] = useDeleteTaskMutation()

  const [searchQueryParams, setSearchQueryParams] = useState({ ...emptyQueryParams, status: -9 })
  const { data: customerTasksData, isLoading: customerTasksIsLoading } = useGetTasksByCustomerIdQuery({
    ...searchQueryParams,
    customerId: customer._id
  })

  const columns = [
    {
      name: 'Start Date',
      width: '200px',
      selector: row => moment(row.startDate).format('MMM - DD - YYYY'),
      sortable: true
    },

    {
      name: 'Steps',
      selector: row => row.name,
      sortable: true,
      cell: data => (
        <ItemContainer onClick={() => openCustomerTaskModal(data._id)}>
          <TaskProgress
            workflowStatus={data.status}
            workflowName={data.name}
            taskId={data._id}
            taskStatus={data.status}
            taskSteps={data.steps}
          />
        </ItemContainer>
      )
    },

    {
      name: 'Actions',
      width: '120px',
      selector: row => row.year,
      right: true,
      header: ({ title }) => <div style={{ textAlign: 'center', color: 'red' }}>{title}</div>,
      cell: data => (
        <>
          {data.status === ETaskStatus.Not_Started ? (
            <ActionButtons
              status={data.status === ETaskStatus.Not_Started ? 1 : 0}
              onHistory={function (): void {
                throw new Error('Function not implemented.')
              }}
              onDelete={() => handleDelete(data)}
            />
          ) : (
            <ActionButtons
              status={data.status === ETaskStatus.Not_Started ? 1 : 0}
              onHistory={function (): void {
                throw new Error('Function not implemented.')
              }}
            />
          )}
        </>
      )
    }
  ]

  const openCustomerTaskModal = taskId => {
    dispatch(
      openModal({
        id: 'customerTaksModal' + taskId,
        title: 'Customer Task',
        body: <CustomerTaskModal customer={customer} customerId={customer._id} taskId={taskId} />,
        width: ESize.WXLarge,
        height: ESize.HLarge,
        maxWidth: ESize.WXLarge,
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

  const handleDelete = (task: ITask) => {
    dispatch(
      openModal({
        id: `deleteCustomerTaskModal-${task._id}`,
        title: `Are you sure to delete ${task.name}?`,
        body: (
          <ConfirmModal
            modalId={`deleteCustomerTaskModal-${task._id}`}
            title={`Are you sure to delete ${task.name}?`}
            onConfirm={() => handleOnConfirmDelete(task)}
          />
        ),
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleOnConfirmDelete = async (task: ITask) => {
    console.log('task', task)
    try {
      await deleteTask(task._id)
      toastSuccess('Plan ' + task.name + ' inactivated successfully')
      dispatch(closeModal(`deleteCustomerTaskModal-${task._id}`))
    } catch (error) {
      toastError('Error removing task')
    }
  }

  console.log(customerTasksData)
  const handleStatusFilter = (status: EStatus) => {
    setSearchQueryParams({ ...searchQueryParams, status })
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQueryParams({ ...searchQueryParams, search: event.target.value })
  }

  return (
    <ItemContainer height="100%" padding="0 1rem">
      <JustifyBetweenColumn height="100%">
        <JustifyBetweenRow height="200px" margin="0 0 1rem 0">
          <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
          <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
          <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
        </JustifyBetweenRow>
        <Column height="calc(100% - 200px - 1rem)">
          <DataTableHeader
            filterStatusOptions={taskStatusOptions}
            handleAddNew={() => openSelectTaskWorkflowModal()}
            status={taskStatusOptions.find(status => +status.value === searchQueryParams.status)}
            handleSearch={handleSearch}
            handleStatusFilter={handleStatusFilter}
          />

          <ItemContainer height="calc(100% - 38px - 0.5rem)">
            {customerTasksIsLoading ? (
              <ItemContainer height="100%">
                <TableSkeltonLoader count={13} />
              </ItemContainer>
            ) : customerTasksData && customerTasksData.length > 0 ? (
              <DataTable
                className="data-table"
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
