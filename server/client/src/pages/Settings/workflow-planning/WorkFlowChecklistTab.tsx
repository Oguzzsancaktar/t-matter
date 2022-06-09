import {
  ActionButtons,
  Column,
  CreateRoleModal,
  CreateTaskTitleModal,
  CreateWorkflowChecklistModal,
  DataTableHeader,
  InnerWrapper
} from '@/components'
import { Badge } from '@/components/badge'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize, EStatus } from '@/models'
import { openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import React from 'react'
import DataTable from 'react-data-table-component'

const WorkFlowChecklist = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const columns = [
    {
      name: 'Checklist Name',
      selector: row => row.checklistName,
      sortable: true
    },
    {
      name: 'Checklist Point',
      selector: row => row.point,
      sortable: true
    },
    {
      name: 'Checklist Time',
      selector: row => row.time,
      sortable: true
    },
    {
      name: 'Checklist Duration',
      selector: row => row.duration,
      sortable: true
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      cell: data => <Badge color={selectColorForStatus(data.status)}>{data.status} </Badge>
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

  const data = [
    {
      id: 1,
      checklistName: 'Checklist 1',
      point: 'Point 1',
      time: 'Time 1',
      duration: 'Duration 1',
      status: 'Active'
    },
    {
      id: 2,
      checklistName: 'Checklist 2',
      point: 'Point 2',
      time: 'Time 2',
      duration: 'Duration 2',
      status: 'Inactive'
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
      <DataTable fixedHeader columns={columns} data={data} />
    </Column>
  )
}

export default WorkFlowChecklist
