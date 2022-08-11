import {
  ActionButtons,
  ConfirmModal,
  CreateLocationModal,
  DataTableHeader,
  ItemContainer,
  ReadLocationModal,
  UpdateLocationModal
} from '@/components'
import { Badge } from '@/components/badge'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize, EStatus, ILocation } from '@/models'
import {
  useGetLocationsQuery,
  useUpdateLocationStatusMutation
} from '@/services/settings/company-planning/dynamicVariableService'
import { closeModal, openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import { toastSuccess, toastError } from '@/utils/toastUtil'
import React from 'react'
import DataTable from 'react-data-table-component'

const LocationsTab = () => {
  const { data: locationsData, isLoading: locationsDataIsLoading } = useGetLocationsQuery()
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
        size: ESize.Small
      })
    )
  }

  const handleEdit = (location: ILocation) => {
    dispatch(
      openModal({
        id: `updateLocationModal-${location._id}`,
        title: 'Update Location',
        body: <UpdateLocationModal location={location} />,
        size: ESize.Small
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
        size: ESize.Small
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
        size: ESize.Small
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
        size: ESize.Small
      })
    )
  }

  return (
    <ItemContainer height="100%">
      <DataTableHeader handleAddNew={openCreateLocationModal} />
      {!locationsDataIsLoading && locationsData && (
        <ItemContainer height="calc(100% - 38px - 0.5rem)">
          <DataTable fixedHeader columns={columns} data={locationsData || []} onRowClicked={handleRead} />
        </ItemContainer>
      )}
    </ItemContainer>
  )
}

export default LocationsTab
