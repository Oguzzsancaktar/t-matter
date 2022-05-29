import {
  ActionButtons,
  Column,
  CreateRoleModal,
  DataTableHeader,
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterColumn
} from '@/components'
import { Badge } from '@/components/badge'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize, EStatus } from '@/models'
import { openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import React from 'react'
import DataTable from 'react-data-table-component'

const UserRoleSettings = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const columns = [
    {
      name: 'Role',
      selector: row => row.title,
      sortable: true
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      cell: data => <Badge color={selectColorForStatus(EStatus[data.status])}>{data.status} </Badge>
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
      title: 'Beetlejuice',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Ghostbusters',
      status: 'Inactive'
    }
  ]

  const openCreateRoleModal = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      openModal({
        id: 'createRoleModal',
        title: 'Create Role',
        body: <CreateRoleModal />,
        size: ESize.Small
      })
    )
  }

  return (
    <JustifyBetweenColumn height="100%">
      <JustifyBetweenRow height="200px" margin="0 0 1rem 0">
        <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
        <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
        <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
      </JustifyBetweenRow>
      <Column height="calc(100% - 200px)">
        <DataTableHeader handleAddNew={openCreateRoleModal} />
        <DataTable fixedHeader columns={columns} data={data} />
      </Column>
    </JustifyBetweenColumn>
  )
}

export default UserRoleSettings
