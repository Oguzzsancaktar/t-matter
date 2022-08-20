import {
  ActionButtons,
  Column,
  ConfirmModal,
  CreateWorkflowPlanModal,
  DataTableHeader,
  ItemContainer,
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterColumn,
  NoTableData,
  ReadWorkflowPlanModal,
  TableSkeltonLoader,
  UpdateWorkflowPlanModal
} from '@/components'
import { Badge } from '@/components/badge'
import emptyQueryParams from '@/constants/queryParams'

import { statusOptions } from '@/constants/statuses'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize, EStatus, IWorkflow } from '@/models'
import { useGetPlansQuery, useUpdatePlanStatusMutation } from '@/services/settings/workflow-planning/workflowService'
import { closeModal, openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import { secondsToHourMin } from '@/utils/timeUtils'
import { toastSuccess, toastError } from '@/utils/toastUtil'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'

const WorkflowPlan = () => {
  const [searchQueryParams, setSearchQueryParams] = useState(emptyQueryParams)
  const { data: workflowPlans, isLoading: workflowPlanIsLoading } = useGetPlansQuery(searchQueryParams)

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [updatePlanStatus] = useUpdatePlanStatusMutation()

  const columns = [
    {
      name: 'Workkflow Name',
      selector: row => row.name,
      sortable: true
    },
    {
      name: 'Total Duration',
      selector: row => secondsToHourMin(row.duration, true),
      sortable: true
    },
    {
      name: 'Total Price',
      selector: row => row.price,
      sortable: true,
      cell: data => <div>${data.price.toFixed(2)} </div>
    },
    {
      name: 'Status',
      width: '120px',
      selector: row => row.status,
      sortable: true,
      cell: data => <Badge color={selectColorForStatus(data.status)}>{EStatus[data.status]} </Badge>
    },
    {
      name: 'Actions',
      width: '120px',
      selector: row => row.year,
      right: true,
      header: ({ title }) => <div style={{ textAlign: 'center', color: 'red' }}>{title}</div>,
      cell: data => (
        <ActionButtons
          status={data.status}
          onEdit={() => handleEdit(data)}
          onHistory={function (): void {
            throw new Error('Function not implemented.')
          }}
          onDelete={() => handleDelete(data)}
          onReactive={() => handleReactive(data)}
        />
      )
    }
  ]

  const handleRead = (workflow: IWorkflow) => {
    dispatch(
      openModal({
        id: `readWorkflowPlanModal-${workflow._id}`,
        title: 'Create Plan',
        body: <ReadWorkflowPlanModal workflow={workflow} />,
        width: ESize.WSmall,
        height: ESize.HSmall
      })
    )
  }

  const handleEdit = (workflow: IWorkflow) => {
    dispatch(
      openModal({
        id: `updateWorkflowPlanModal-${workflow._id}`,
        title: 'Update Plan',
        body: <UpdateWorkflowPlanModal workflow={workflow} />,
        width: ESize.WXLarge,
        height: ESize.HLarge
      })
    )
  }

  const handleDelete = (workflow: IWorkflow) => {
    dispatch(
      openModal({
        id: `deleteWorkflowPlanModal-${workflow._id}`,
        title: `Are you sure to inactivate ${workflow.name}?`,
        body: (
          <ConfirmModal
            modalId={`deleteWorkflowPlanModal-${workflow._id}`}
            title={`Are you sure to inactivate ${workflow.name}?`}
            onConfirm={() => handleOnConfirmDelete(workflow)}
          />
        ),
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleReactive = (workflow: IWorkflow) => {
    dispatch(
      openModal({
        id: `reactiveWorkflowPlanModal-${workflow._id}`,
        title: `Are you sure to reactivate ${workflow.name}?`,
        body: (
          <ConfirmModal
            modalId={`reactiveWorkflowPlanModal-${workflow._id}`}
            title={`Are you sure to reactivate ${workflow.name}?`}
            onConfirm={() => handleOnConfirmReactive(workflow)}
          />
        ),
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleOnConfirmDelete = async (workflow: IWorkflow) => {
    try {
      await updatePlanStatus({ _id: workflow._id, status: EStatus.Inactive })
      toastSuccess('Plan ' + workflow.name + ' inactivated successfully')
      dispatch(closeModal(`deleteWorkflowPlanModal-${workflow._id}`))
    } catch (error) {
      toastError('Error inactivating workflow')
    }
  }

  const handleOnConfirmReactive = async (workflow: IWorkflow) => {
    try {
      await updatePlanStatus({ _id: workflow._id, status: EStatus.Active })
      toastSuccess('Plan ' + workflow.name + ' reactivated successfully')
      dispatch(closeModal(`reactiveWorkflowPlanModal-${workflow._id}`))
    } catch (error) {
      toastError('Error reactivating workflow')
    }
  }

  const openCreateRoleModal = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      openModal({
        id: 'createWorkflowPlanModal',
        title: 'Create Customer Task ',
        body: <CreateWorkflowPlanModal />,
        width: ESize.WXLarge,
        height: ESize.HLarge,
        backgroundColor: '#fff'
      })
    )
  }

  const handleStatusFilter = (status: EStatus) => {
    setSearchQueryParams({ ...searchQueryParams, status })
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQueryParams({ ...searchQueryParams, search: event.target.value })
  }

  return (
    <JustifyBetweenColumn height="100%">
      <JustifyBetweenRow height="200px" margin="0 0 1rem 0">
        <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
        <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
        <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
      </JustifyBetweenRow>
      <Column height="calc(100% - 200px - 1rem)">
        <DataTableHeader
          handleAddNew={openCreateRoleModal}
          status={statusOptions.find(status => +status.value === searchQueryParams.status)}
          handleSearch={handleSearch}
          handleStatusFilter={handleStatusFilter}
        />

        <ItemContainer height="calc(100% - 38px - 0.5rem)">
          {workflowPlanIsLoading ? (
            <ItemContainer height="100%">
              <TableSkeltonLoader count={13} />
            </ItemContainer>
          ) : workflowPlans && workflowPlans.length > 0 ? (
            <DataTable fixedHeader columns={columns} data={workflowPlans || []} onRowClicked={handleRead} />
          ) : (
            <NoTableData />
          )}
        </ItemContainer>
      </Column>
    </JustifyBetweenColumn>
  )
}

export default WorkflowPlan
