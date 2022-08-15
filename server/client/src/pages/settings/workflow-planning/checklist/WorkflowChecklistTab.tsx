import {
  ActionButtons,
  Column,
  ConfirmModal,
  CreateWorkflowChecklistModal,
  DataTableHeader,
  ItemContainer,
  NoTableData,
  ReadWorkflowChecklistModal,
  TableSkeltonLoader,
  UpdateWorkflowChecklistModal
} from '@/components'
import { Badge } from '@/components/badge'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize, EStatus, ITaskChecklist } from '@/models'
import {
  useGetChecklistsQuery,
  useUpdateChecklistStatusMutation
} from '@/services/settings/workflow-planning/workflowService'
import { closeModal, openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import { secondsToHourMin } from '@/utils/timeUtils'
import { toastError, toastSuccess } from '@/utils/toastUtil'
import React from 'react'
import DataTable from 'react-data-table-component'

const WorkflowChecklist = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [updateChecklistStatus] = useUpdateChecklistStatusMutation()
  const { data: checklistsData, isLoading: isChecklistsLoading } = useGetChecklistsQuery()

  const columns = [
    {
      name: 'Checklist Name',
      selector: row => row.name,
      sortable: true
    },
    {
      name: 'Checklist Point',
      selector: row => row.point + 'point',
      sortable: true
    },
    {
      name: 'Checklist Duration',
      selector: row => secondsToHourMin(row.duration),
      sortable: true
    },
    {
      name: 'Checklist Price',
      selector: row => row.price.toFixed(2) + '$',
      sortable: true
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

  const handleRead = (checklist: ITaskChecklist) => {
    dispatch(
      openModal({
        id: `readWorkflowChecklistModal-${checklist._id}`,
        title: 'Create Checklist',
        body: <ReadWorkflowChecklistModal checklist={checklist} />,
        width: ESize.Small,
        height: ESize.Small
      })
    )
  }

  const handleEdit = (checklist: ITaskChecklist) => {
    dispatch(
      openModal({
        id: `updateWorkflowChecklistModal-${checklist._id}`,
        title: 'Update Checklist',
        body: <UpdateWorkflowChecklistModal checklist={checklist} />,
        width: ESize.Small,
        height: ESize.Small
      })
    )
  }

  const handleDelete = (checklist: ITaskChecklist) => {
    dispatch(
      openModal({
        id: `deleteWorkflowChecklistModal-${checklist._id}`,
        title: `Are you sure to inactivate ${checklist.name}?`,
        body: (
          <ConfirmModal
            modalId={`deleteWorkflowChecklistModal-${checklist._id}`}
            title={`Are you sure to inactivate ${checklist.name}?`}
            onConfirm={() => handleOnConfirmDelete(checklist)}
          />
        ),
        width: ESize.Large,
        height: ESize.Auto,
        maxWidth: ESize.Small
      })
    )
  }

  const handleReactive = (checklist: ITaskChecklist) => {
    dispatch(
      openModal({
        id: `reactiveWorkflowChecklistModal-${checklist._id}`,
        title: `Are you sure to reactivate ${checklist.name}?`,
        body: (
          <ConfirmModal
            modalId={`reactiveWorkflowChecklistModal-${checklist._id}`}
            title={`Are you sure to reactivate ${checklist.name}?`}
            onConfirm={() => handleOnConfirmReactive(checklist)}
          />
        ),
        width: ESize.Large,
        height: ESize.Auto,
        maxWidth: ESize.Small
      })
    )
  }

  const handleOnConfirmDelete = async (checklist: ITaskChecklist) => {
    try {
      await updateChecklistStatus({ _id: checklist._id, status: EStatus.Inactive })
      toastSuccess('Checklist ' + checklist.name + ' inactivated successfully')
      dispatch(closeModal(`deleteWorkflowChecklistModal-${checklist._id}`))
    } catch (error) {
      toastError('Error inactivating checklist')
    }
  }

  const handleOnConfirmReactive = async (checklist: ITaskChecklist) => {
    try {
      await updateChecklistStatus({ _id: checklist._id, status: EStatus.Active })
      toastSuccess('Checklist ' + checklist.name + ' reactivated successfully')
      dispatch(closeModal(`reactiveWorkflowChecklistModal-${checklist._id}`))
    } catch (error) {
      toastError('Error reactivating checklist')
    }
  }

  const openCreateRoleModal = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      openModal({
        id: 'createWorkflowChecklistModal',
        title: 'Create Workflow Checklist',
        body: <CreateWorkflowChecklistModal />,
        width: ESize.Small,
        height: ESize.Small
      })
    )
  }

  return (
    <Column>
      <DataTableHeader handleAddNew={openCreateRoleModal} />
      <ItemContainer height="calc(100% - 38px - 0.5rem)">
        {isChecklistsLoading ? (
          <ItemContainer height="100%">
            <TableSkeltonLoader count={13} />
          </ItemContainer>
        ) : checklistsData && checklistsData.length > 0 ? (
          <DataTable fixedHeader columns={columns} data={checklistsData || []} onRowClicked={handleRead} />
        ) : (
          <NoTableData />
        )}
      </ItemContainer>
    </Column>
  )
}

export default WorkflowChecklist
