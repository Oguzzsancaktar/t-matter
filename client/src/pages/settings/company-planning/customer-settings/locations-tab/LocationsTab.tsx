import {
  ActionButtons,
  ConfirmModal,
  CreateLocationModal,
  DataTableHeader,
  ItemContainer,
  NoTableData,
  ReadLocationModal,
  TableSkeltonLoader,
  UpdateLocationModal
} from '@/components'
import { Badge } from '@/components/badge'
import { emptyQueryParams } from '@/constants/queryParams'
import { statusOptions } from '@/constants/statuses'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize, EStatus, ILocation } from '@/models'
import {
  useGetLocationsQuery,
  useUpdateLocationStatusMutation
} from '@/services/settings/company-planning/dynamicVariableService'
import { closeModal, openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import { toastSuccess, toastError } from '@/utils/toastUtil'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'

const LocationsTab = () => {
  const [searchQueryParams, setSearchQueryParams] = useState(emptyQueryParams)

  const { data: locationsData, isLoading: locationsDataIsLoading } = useGetLocationsQuery(searchQueryParams)
  const [updateLocationStatus] = useUpdateLocationStatusMutation()

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const columns = [
    {
      name: 'Location Name',
      selector: row => row.name,
      sortable: true,
      cell: data => <div>{data.name} </div>
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

  const handleRead = (location: ILocation) => {
    dispatch(
      openModal({
        id: `readLocationModal-${location._id}`,
        title: 'Create Location',
        body: <ReadLocationModal location={location} />,
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleEdit = (location: ILocation) => {
    dispatch(
      openModal({
        id: `updateLocationModal-${location._id}`,
        title: 'Update Location',
        body: <UpdateLocationModal location={location} />,
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleDelete = (location: ILocation) => {
    dispatch(
      openModal({
        id: `deleteLocationModal-${location._id}`,
        title: `Are you sure to inactivate ${location.name}?`,
        body: (
          <ConfirmModal
            modalId={`deleteLocationModal-${location._id}`}
            title={`Are you sure to inactivate ${location.name}?`}
            onConfirm={() => handleOnConfirmDelete(location)}
          />
        ),
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleReactive = (location: ILocation) => {
    dispatch(
      openModal({
        id: `reactiveLocationModal-${location._id}`,
        title: `Are you sure to reactivate ${location.name}?`,
        body: (
          <ConfirmModal
            modalId={`reactiveLocationModal-${location._id}`}
            title={`Are you sure to reactivate ${location.name}?`}
            onConfirm={() => handleOnConfirmReactive(location)}
          />
        ),
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleOnConfirmDelete = async (location: ILocation) => {
    try {
      await updateLocationStatus({ _id: location._id, status: EStatus.Inactive })
      toastSuccess('Location ' + location.name + ' inactivated successfully')
      dispatch(closeModal(`deleteLocationModal-${location._id}`))
    } catch (error) {
      toastError('Error inactivating location')
    }
  }

  const handleOnConfirmReactive = async (location: ILocation) => {
    try {
      await updateLocationStatus({ _id: location._id, status: EStatus.Active })
      toastSuccess('Location ' + location.name + ' reactivated successfully')
      dispatch(closeModal(`reactiveLocationModal-${location._id}`))
    } catch (error) {
      toastError('Error reactivating location')
    }
  }

  const openCreateLocationModal = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      openModal({
        id: 'createLocationModal',
        title: 'Company Locations',
        body: <CreateLocationModal />,
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
    <ItemContainer height="100%">
      <DataTableHeader
        handleAddNew={openCreateLocationModal}
        status={statusOptions.find(status => +status.value === searchQueryParams.status)}
        handleSearch={handleSearch}
        handleStatusFilter={handleStatusFilter}
      />

      <ItemContainer height="calc(100% - 38px - 0.5rem)">
        {locationsDataIsLoading ? (
          <ItemContainer height="100%">
            <TableSkeltonLoader count={13} />
          </ItemContainer>
        ) : locationsData && locationsData.length > 0 ? (
          <DataTable fixedHeader columns={columns} data={locationsData || []} onRowClicked={handleRead} />
        ) : (
          <NoTableData />
        )}
      </ItemContainer>
    </ItemContainer>
  )
}

export default LocationsTab
