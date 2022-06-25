import {
  ActionButtons,
  CircleColor,
  CreateRefferedByModal,
  CreateRoleModal,
  CreateTaskCategoryModal,
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

const RefferedByTab = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const columns = [
    {
      name: 'Refffered By Name',
      selector: row => row.name,
      sortable: true,
      cell: data => <div>{data.name} </div>
    },
    {
      name: 'Color',
      selector: row => row.color,
      sortable: true,
      cell: data => <CircleColor cursor="normal" color={data.color} />
    },
    {
      name: 'Status',
      right: true,
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
      name: 'Youtube',
      color: '#007bff',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Facebook',
      color: '#6610f2',
      status: 'Inactive'
    }
  ]

  const openCreateRoleModal = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      openModal({
        id: 'createRefferedByModal',
        title: 'Create Reffered By',
        body: <CreateRefferedByModal />,
        size: ESize.Small
      })
    )
  }

  return (
    <InnerWrapper>
      <DataTableHeader handleAddNew={openCreateRoleModal} />
      <DataTable fixedHeader columns={columns} data={data} />
    </InnerWrapper>
  )
}

export default RefferedByTab
