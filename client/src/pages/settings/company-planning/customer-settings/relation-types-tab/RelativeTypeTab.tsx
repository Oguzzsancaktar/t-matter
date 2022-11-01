import {
  ActionButtons,
  ConfirmModal,
  CreateRelativeTypeModal,
  DataTableHeader,
  ItemContainer,
  NoTableData,
  ReadRelativeTypeModal,
  TableSkeltonLoader,
  UpdateRelativeTypeModal
} from '@/components'
import { Badge } from '@/components/badge'
import { emptyQueryParams } from '@/constants/queryParams'
import { statusOptions } from '@/constants/statuses'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize, EStatus, IRelativeType } from '@/models'
import {
  useGetRelativeTypesQuery,
  useUpdateRelativeTypeStatusMutation
} from '@/services/settings/company-planning/dynamicVariableService'
import { closeModal, openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import { toastSuccess, toastError } from '@/utils/toastUtil'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'

const LocationsTab = () => {
  const [searchQueryParams, setSearchQueryParams] = useState(emptyQueryParams)

  const { data: relativeTypeData, isLoading: relativeTypeIsLoading } = useGetRelativeTypesQuery(searchQueryParams)
  const [updateRelativeTypeStatus] = useUpdateRelativeTypeStatusMutation()

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const columns = [
    {
      name: 'Relate From',
      selector: row => row.relateFrom,
      sortable: true,
      cell: data => <div>{data.relateFrom} </div>
    },
    {
      name: 'Relate To',
      selector: row => row.relateTo,
      sortable: true,
      cell: data => <div>{data.relateTo} </div>
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

  const handleRead = (relativeType: IRelativeType) => {
    dispatch(
      openModal({
        id: `readRelativeTypeModal-${relativeType._id}`,
        title: 'Create RelativeType',
        body: <ReadRelativeTypeModal relativeType={relativeType} />,
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleEdit = (relativeType: IRelativeType) => {
    dispatch(
      openModal({
        id: `updateRelativeTypeModal-${relativeType._id}`,
        title: 'Update RelativeType',
        body: <UpdateRelativeTypeModal relativeType={relativeType} />,
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleDelete = (relativeType: IRelativeType) => {
    dispatch(
      openModal({
        id: `deleteRelativeTypeModal-${relativeType._id}`,
        title: `Are you sure to inactivate ${relativeType.relateFrom}  - ${relativeType.relateTo} ?`,
        body: (
          <ConfirmModal
            modalId={`deleteRelativeTypeModal-${relativeType._id}`}
            title={`Are you sure to inactivate ${relativeType.relateFrom} - ${relativeType.relateTo} ?`}
            onConfirm={() => handleOnConfirmDelete(relativeType)}
          />
        ),
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleReactive = (relativeType: IRelativeType) => {
    dispatch(
      openModal({
        id: `reactiveRelativeTypeModal-${relativeType._id}`,
        title: `Are you sure to reactivate  ${relativeType.relateFrom} - ${relativeType.relateTo} ?`,
        body: (
          <ConfirmModal
            modalId={`reactiveRelativeTypeModal-${relativeType._id}`}
            title={`Are you sure to reactivate  ${relativeType.relateFrom} - ${relativeType.relateTo} ?`}
            onConfirm={() => handleOnConfirmReactive(relativeType)}
          />
        ),
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleOnConfirmDelete = async (relativeType: IRelativeType) => {
    try {
      await updateRelativeTypeStatus({ _id: relativeType._id, status: EStatus.Inactive })
      toastSuccess(
        'RelativeType ' + relativeType.relateFrom + ' - ' + relativeType.relateTo + ' inactivated successfully'
      )
      dispatch(closeModal(`deleteRelativeTypeModal-${relativeType._id}`))
    } catch (error) {
      toastError('Error inactivating relativeType')
    }
  }

  const handleOnConfirmReactive = async (relativeType: IRelativeType) => {
    try {
      await updateRelativeTypeStatus({ _id: relativeType._id, status: EStatus.Active })
      toastSuccess(
        'RelativeType ' + relativeType.relateFrom + ' - ' + relativeType.relateTo + ' reactivated successfully'
      )
      dispatch(closeModal(`reactiveRelativeTypeModal-${relativeType._id}`))
    } catch (error) {
      toastError('Error reactivating relativeType')
    }
  }

  const openCreateRelativeTypeModal = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      openModal({
        id: 'createRelativeTypeModal',
        title: 'Company RelativeTypes',
        body: <CreateRelativeTypeModal />,
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleStatusFilter = (status: number | string) => {
    setSearchQueryParams({ ...searchQueryParams, status: +status })
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQueryParams({ ...searchQueryParams, search: event.target.value })
  }

  return (
    <ItemContainer height="100%">
      <DataTableHeader
        status={statusOptions.find(status => +status.value === searchQueryParams.status)}
        handleAddNew={openCreateRelativeTypeModal}
        handleSearch={handleSearch}
        handleStatusFilter={handleStatusFilter}
      />
      <ItemContainer height="calc(100% - 38px - 0.5rem)">
        {relativeTypeIsLoading ? (
          <ItemContainer height="100%">
            <TableSkeltonLoader count={13} />
          </ItemContainer>
        ) : relativeTypeData && relativeTypeData.length > 0 ? (
          <DataTable
            className="data-table"
            fixedHeader
            columns={columns}
            data={relativeTypeData || []}
            onRowClicked={handleRead}
          />
        ) : (
          <NoTableData />
        )}
      </ItemContainer>
    </ItemContainer>
  )
}

export default LocationsTab
