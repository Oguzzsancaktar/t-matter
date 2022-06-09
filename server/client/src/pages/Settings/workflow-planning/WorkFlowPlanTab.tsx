import {
  ActionButtons,
  Column,
  CreateRoleModal,
  CreateTaskNameModal,
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

const WorkFlowPlan = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const columns = [
    {
      name: 'Workkflow Name',
      selector: row => row.workkflowName,
      sortable: true
    },
    {
      name: 'Total Duration',
      selector: row => row.totalDuration,
      sortable: true
    },
    {
      name: 'Total Price',
      selector: row => row.totalPrice,
      sortable: true,
      cell: data => <div>${data.totalPrice} </div>
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
      workkflowName: 'Workflow Name 1',
      totalDuration: '01:30:00',
      totalPrice: '150',
      status: 'Active'
    },
    {
      id: 2,
      workkflowName: 'Workflow Name 2',
      totalDuration: '01:00:00',
      totalPrice: '100',
      status: 'Inactive'
    }
  ]

  const openCreateRoleModal = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      openModal({
        id: 'createTaskNameModal',
        title: 'Create Task Name',
        body: <CreateTaskNameModal />,
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

export default WorkFlowPlan
