import {
  ActionButtons,
  Column,
  ConfirmModal,
  CreateUserModal,
  DataTableHeader,
  ItemContainer,
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterColumn,
  NoTableData,
  ReadUserModal,
  TableSkeltonLoader,
  UpdateUserModal
} from '@/components'
import { Badge, RoleBadge, UserBadge } from '@/components/badge'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize, EStatus, IUser } from '@/models'
import { useGetUsersQuery, useUpdateUserStatusMutation } from '@/services/settings/user-planning/userService'
import { closeModal, openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import { toastSuccess, toastError } from '@/utils/toastUtil'
import React from 'react'
import DataTable from 'react-data-table-component'
import { UserCheck } from 'react-feather'

const UserPageSettingsTab = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const [updateUserStatus] = useUpdateUserStatusMutation()

  const { data: usersData, isLoading: isUsersDataLoading } = useGetUsersQuery()

  const columns = [
    {
      name: 'User',
      selector: row => row.task,
      sortable: true,
      cell: data => (
        <UserBadge userEmail={data.email} userImage={data.photo} userName={data.firstname + ' ' + data.lastname} />
      )
    },

    {
      name: 'Role',
      selector: row => row.role,
      sortable: true,
      cell: data => <RoleBadge roleColor="#ff0000" roleIcon={<UserCheck size={16} />} roleName={data.role[0].name} />
    },
    {
      name: 'Phone',
      selector: row => row.phone,
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

  const handleRead = (user: IUser) => {
    dispatch(
      openModal({
        id: `userDetailModal-${user._id}`,
        title: 'User / ' + user.firstname + ' ' + user.lastname,
        body: <ReadUserModal userId={user._id} />,
        width: ESize.XLarge,
        height: ESize.Large,
        backgroundColor: 'transparent'
      })
    )
  }

  const handleEdit = (user: IUser) => {
    dispatch(
      openModal({
        id: `updateUserModal-${user._id}`,
        title: 'Update User / ' + user.firstname + ' ' + user.lastname,
        body: <UpdateUserModal user={user} />,
        width: ESize.Small,
        height: ESize.Small
      })
    )
  }

  const handleDelete = (user: IUser) => {
    dispatch(
      openModal({
        id: `deleteUserModal-${user._id}`,
        title: `Are you sure to inactivate ${user.firstname + ' ' + user.lastname}?`,
        body: (
          <ConfirmModal
            modalId={`deleteUserModal-${user._id}`}
            title={`Are you sure to inactivate ${user.firstname + ' ' + user.lastname}?`}
            onConfirm={() => handleOnConfirmDelete(user)}
          />
        ),
        width: ESize.Large,
        height: ESize.Auto,
        maxWidth: ESize.Small
      })
    )
  }

  const handleReactive = (user: IUser) => {
    dispatch(
      openModal({
        id: `reactiveUserModal-${user._id}`,
        title: `Are you sure to reactivate ${user.firstname + ' ' + user.lastname}?`,
        body: (
          <ConfirmModal
            modalId={`reactiveUserModal-${user._id}`}
            title={`Are you sure to reactivate ${user.firstname + ' ' + user.lastname}?`}
            onConfirm={() => handleOnConfirmReactive(user)}
          />
        ),
        width: ESize.Large,
        height: ESize.Auto,
        maxWidth: ESize.Small
      })
    )
  }

  const handleOnConfirmDelete = async (user: IUser) => {
    try {
      await updateUserStatus({ _id: user._id, status: EStatus.Inactive })
      toastSuccess('User ' + user.firstname + ' ' + user.lastname + ' inactivated successfully')
      dispatch(closeModal(`deleteUserModal-${user._id}`))
    } catch (error) {
      toastError('Error inactivating user')
    }
  }

  const handleOnConfirmReactive = async (user: IUser) => {
    try {
      await updateUserStatus({ _id: user._id, status: EStatus.Active })
      toastSuccess('User ' + user.firstname + ' ' + user.lastname + ' reactivated successfully')
      dispatch(closeModal(`reactiveUserModal-${user._id}`))
    } catch (error) {
      toastError('Error reactivating user')
    }
  }

  const openCreateUserModal = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      openModal({
        id: 'createUserModal',
        title: 'Create User',
        body: <CreateUserModal />,
        width: ESize.XLarge,
        height: ESize.Large
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
        <DataTableHeader handleAddNew={openCreateUserModal} />

        <ItemContainer height="calc(100% - 38px - 0.5rem)">
          {isUsersDataLoading ? (
            <ItemContainer height="100%">
              <TableSkeltonLoader count={13} />
            </ItemContainer>
          ) : usersData && usersData.length > 0 ? (
            <DataTable fixedHeader columns={columns} data={usersData || []} onRowClicked={handleRead} />
          ) : (
            <NoTableData />
          )}
        </ItemContainer>
      </Column>
    </JustifyBetweenColumn>
  )
}

export default UserPageSettingsTab
