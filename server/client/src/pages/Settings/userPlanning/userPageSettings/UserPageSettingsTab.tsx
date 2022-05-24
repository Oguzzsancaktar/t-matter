import {
  ActionButtons,
  Column,
  CreateRoleModal,
  CreateUserModal,
  DataTableHeader,
  JustifyBetweenRow,
  JustifyCenterColumn
} from '@/components'
import { Badge, RoleBadge, UserBadge } from '@/components/badge'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize, EStatus } from '@/models'
import { openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import React from 'react'
import DataTable from 'react-data-table-component'
import { UserCheck } from 'react-feather'

const UserPageSettingsTab = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const columns = [
    {
      name: 'User',
      selector: row => row.task,
      sortable: true,
      cell: data => <UserBadge userEmail={data.user.email} userImage={data.user.photo} userName={data.user.name} />
    },
    {
      name: 'Role',
      selector: row => row.role,
      sortable: true,
      cell: data => <RoleBadge roleColor="#ff0000" roleIcon={<UserCheck size={16} />} roleName={data.role} />
    },
    {
      name: 'Phone',
      selector: row => row.phone,
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
      user: {
        name: 'User Name 1',
        photo: 'https://via.placeholder.com/150',
        email: 'user1@email.com'
      },
      role: 'Admin',
      phone: '+(44) 545 567 56 56',
      status: 'Active'
    },
    {
      id: 2,
      user: {
        name: 'User Name 2',
        photo: 'https://via.placeholder.com/150',
        email: 'user2@email.com'
      },
      role: 'User',
      phone: '+(90) 543 333 22 22',
      status: 'Inactive'
    }
  ]

  const openCreateRoleModal = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      openModal({
        id: 'createUserModal',
        title: 'Create User',
        body: <CreateUserModal />,
        size: ESize.Small
      })
    )
  }

  return (
    <Column>
      <JustifyBetweenRow height="200px" margin="0 0 1rem 0">
        <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
        <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
        <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
      </JustifyBetweenRow>
      <Column>
        <DataTableHeader handleAddNew={openCreateRoleModal} />
        <DataTable fixedHeader columns={columns} data={data} />
      </Column>
    </Column>
  )
}

export default UserPageSettingsTab
