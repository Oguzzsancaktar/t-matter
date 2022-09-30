import {
  ActionButtons,
  Column,
  ConfirmModal,
  CreateRoleModal,
  DataTableHeader,
  ItemContainer,
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterColumn,
  NoTableData,
  ReadRoleModal,
  TableSkeltonLoader,
  UpdateRoleModal
} from '@/components'
import { Badge } from '@/components/badge'
import { emptyQueryParams } from '@/constants/queryParams'
import { statusOptions } from '@/constants/statuses'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize, EStatus, IRole } from '@/models'
import { useGetRolesQuery, useUpdateRoleStatusMutation } from '@/services/settings/user-planning/userRoleService'
import { closeModal, openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import { toastError, toastSuccess } from '@/utils/toastUtil'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'

const UserRoleSettings = () => {
  const [searchQueryParams, setSearchQueryParams] = useState(emptyQueryParams)

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const { data: roleData, isLoading: roleLoading } = useGetRolesQuery(searchQueryParams)
  const [updateRoleStatus] = useUpdateRoleStatusMutation()

  const columns = [
    {
      name: 'Role',
      selector: row => row.name,
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
      right: true,
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

  const handleRead = (role: IRole) => {
    dispatch(
      openModal({
        id: `readRoleModal-${role._id}`,
        title: 'Create Role',
        body: <ReadRoleModal role={role} />,
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleEdit = (role: IRole) => {
    dispatch(
      openModal({
        id: `updateRoleModal-${role._id}`,
        title: 'Update Role',
        body: <UpdateRoleModal role={role} />,
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleDelete = (role: IRole) => {
    dispatch(
      openModal({
        id: `deleteRoleModal-${role._id}`,
        title: `Are you sure to inactivate ${role.name}?`,
        body: (
          <ConfirmModal
            modalId={`deleteRoleModal-${role._id}`}
            title={`Are you sure to inactivate ${role.name}?`}
            onConfirm={() => handleOnConfirmDelete(role)}
          />
        ),
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleReactive = (role: IRole) => {
    dispatch(
      openModal({
        id: `reactiveRoleModal-${role._id}`,
        title: `Are you sure to reactivate ${role.name}?`,
        body: (
          <ConfirmModal
            modalId={`reactiveRoleModal-${role._id}`}
            title={`Are you sure to reactivate ${role.name}?`}
            onConfirm={() => handleOnConfirmReactive(role)}
          />
        ),
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleOnConfirmDelete = async (role: IRole) => {
    try {
      await updateRoleStatus({ _id: role._id, status: EStatus.Inactive })
      toastSuccess('Role ' + role.name + ' inactivated successfully')
      dispatch(closeModal(`deleteRoleModal-${role._id}`))
    } catch (error) {
      toastError('Error inactivating role')
    }
  }

  const handleOnConfirmReactive = async (role: IRole) => {
    try {
      await updateRoleStatus({ _id: role._id, status: EStatus.Active })
      toastSuccess('Role ' + role.name + ' reactivated successfully')
      dispatch(closeModal(`reactiveRoleModal-${role._id}`))
    } catch (error) {
      toastError('Error reactivating role')
    }
  }

  const openCreateRoleModal = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      openModal({
        id: 'createRoleModal',
        title: 'Create Role',
        body: <CreateRoleModal />,
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleStatusFilter = (status: EStatus) => {
    setSearchQueryParams({ ...searchQueryParams, status })
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQueryParams({ ...searchQueryParams, search: event.target.value })
  }

  return (
    <JustifyBetweenColumn height="100%">
      <JustifyBetweenRow height="200px" margin="0 0 1rem 0">
        <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
        <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
        <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
      </JustifyBetweenRow>
      <Column height="calc(100% - 200px - 1rem)">
        <DataTableHeader
          handleAddNew={openCreateRoleModal}
          status={statusOptions.find(status => +status.value === searchQueryParams.status)}
          handleSearch={handleSearch}
          handleStatusFilter={handleStatusFilter}
        />

        <ItemContainer height="calc(100% - 40px - 0.5rem)">
          {roleLoading ? (
            <ItemContainer height="100%">
              <TableSkeltonLoader count={13} />
            </ItemContainer>
          ) : roleData && roleData.length > 0 ? (
            <DataTable
              className="data-table"
              fixedHeader
              columns={columns}
              data={roleData || []}
              onRowClicked={handleRead}
            />
          ) : (
            <NoTableData />
          )}
        </ItemContainer>
      </Column>
    </JustifyBetweenColumn>
  )
}

export default UserRoleSettings
