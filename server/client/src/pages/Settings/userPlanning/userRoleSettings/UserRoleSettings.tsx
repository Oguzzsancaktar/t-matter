import {
  ActionButtons,
  Column,
  ConfirmModal,
  CreateRoleModal,
  DataTableHeader,
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterColumn,
  ReadRoleModal,
  UpdateRoleModal
} from '@/components'
import { Badge } from '@/components/badge'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize, EStatus, IRole } from '@/models'
import { useGetRolesQuery } from '@/services/settings/user-planning/userRoleService'
import { closeModal, openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import { toastSuccess } from '@/utils/toastUtil'
import React from 'react'
import DataTable from 'react-data-table-component'

const UserRoleSettings = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const { data: roleData, isLoading: roleLoading, error: roleError } = useGetRolesQuery()

  console.log(roleData)

  const columns = [
    {
      name: 'Role',
      selector: row => row.name,
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
      right: true,
      cell: data => (
        <ActionButtons
          onRead={() => handleRead(data)}
          onEdit={() => handleEdit(data)}
          onHistory={function (): void {
            throw new Error('Function not implemented.')
          }}
          onDelete={() => handleDelete(data)}
        />
      )
    }
  ]

  const handleRead = (role: IRole) => {
    dispatch(
      openModal({
        id: `readRoleModal-${role._id}`,
        title: 'Create Role',
        body: <ReadRoleModal role={role} />,
        size: ESize.Small
      })
    )
  }

  const handleEdit = (role: IRole) => {
    dispatch(
      openModal({
        id: `updateRoleModal-${role._id}`,
        title: 'Update Role',
        body: <UpdateRoleModal role={role} />,
        size: ESize.Small
      })
    )
  }

  const handleCloseDeleteModal = (_id: IRole['_id']) => {
    console.log(_id)
    dispatch(closeModal(`deleteRoleModal-${_id}`))
  }

  const handleOnConfirm = async (role: IRole) => {
    // await patchRole({ _id: role._id, name: role.name })
    toastSuccess('Role ' + role.name + ' updated successfully')
    handleCloseDeleteModal(role._id)
  }

  const handleDelete = (role: IRole) => {
    dispatch(
      openModal({
        id: `deleteRoleModal-${role._id}`,
        title: `Are you sure to inactivate ${role.name}?`,
        body: (
          <ConfirmModal
            title={`Are you sure to inactivate ${role.name}?`}
            onCancel={() => handleCloseDeleteModal(role._id)}
            onConfirm={() => handleOnConfirm(role)}
          />
        ),
        size: ESize.Small
      })
    )
  }

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
        <DataTable fixedHeader columns={columns} data={roleData || []} />
      </Column>
    </JustifyBetweenColumn>
  )
}

export default UserRoleSettings
