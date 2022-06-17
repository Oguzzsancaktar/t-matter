import { ActionButtons, Column, CreateWorkflowChecklistModal, DataTableHeader } from '@/components'
import { Badge } from '@/components/badge'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize, EStatus } from '@/models'
import { useGetChecklistsQuery } from '@/services/settings/workflow-planning/workflowService'
import { openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import { secondsToHourMin } from '@/utils/timeUtils'
import React from 'react'
import DataTable from 'react-data-table-component'

const WorkflowChecklist = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

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
      selector: row => row.price + '$',
      sortable: true
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      cell: data => <Badge color={selectColorForStatus(+EStatus[data.status])}>{data.status} </Badge>
    },
    {
      name: 'Actions',
      selector: row => row.year,
      right: true,
      header: ({ title }) => <div style={{ textAlign: 'center', color: 'red' }}>{title}</div>,
      cell: data => (
        <ActionButtons
          onRead={function (): void {
            throw new Error('Function not implemented.')
          }}
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

  const openCreateRoleModal = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      openModal({
        id: 'createWorkflowChecklistModal',
        title: 'Create Workflow Checklist',
        body: <CreateWorkflowChecklistModal />,
        size: ESize.Small
      })
    )
  }

  return (
    <Column>
      <DataTableHeader handleAddNew={openCreateRoleModal} />
      <DataTable fixedHeader columns={columns} data={checklistsData || []} />
    </Column>
  )
}

export default WorkflowChecklist
