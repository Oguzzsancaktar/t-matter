import {
  ActionButtons,
  Column,
  CreateRoleModal,
  CreateUserModal,
  DataTableHeader,
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterColumn
} from '@/components'
import { Badge, RoleBadge, UserBadge } from '@/components/badge'
import UserReadModal from '@/components/modals/UserPlanning/userPageSettings/UserReadModal'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize, EStatus } from '@/models'
import { useGetUsersQuery } from '@/services/settings/user-planning/userService'
import { openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import React from 'react'
import DataTable from 'react-data-table-component'
import { UserCheck } from 'react-feather'

const UserPageSettingsTab = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const { data: usersData, isLoading: isUsersDataLoading } = useGetUsersQuery()
  console.log('usersData', usersData)

  const columns = [
    {
      name: 'User',
      selector: row => row.task,
      sortable: true,
      cell: data => (
        <UserBadge userEmail={data.email} userImage={data.photo} userName={data.firstname + data.lastname} />
      )
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
      cell: data => <Badge color={selectColorForStatus(data.status)}>{EStatus[data.status]} </Badge>
    },
    {
      name: 'Actions',
      selector: row => row.year,
      right: true,
      header: ({ title }) => <div style={{ textAlign: 'center', color: 'red' }}>{title}</div>,
      cell: data => (
        <ActionButtons
          onRead={() => handleRead(data.id)}
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

  const handleRead = (id: string) => {
    dispatch(
      openModal({
        id: `userDetailModal-${id}`,
        title: 'user modal' + id,
        body: <UserReadModal userId={id} />,
        size: ESize.XLarge
      })
    )
  }

  const openCreateRoleModal = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      openModal({
        id: 'createUserModal',
        title: 'Create User',
        body: <CreateUserModal />,
        size: ESize.Medium
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
        <DataTable fixedHeader columns={columns} data={usersData || []} />
      </Column>
    </JustifyBetweenColumn>
  )
}

export default UserPageSettingsTab
