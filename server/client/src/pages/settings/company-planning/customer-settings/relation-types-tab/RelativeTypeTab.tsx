import {
  ActionButtons,
  CircleColor,
  ConfirmModal,
  CreateRelativeTypeModal,
  DataTableHeader,
  InnerWrapper,
  ItemContainer,
  ReadRelativeTypeModal,
  UpdateRelativeTypeModal
} from '@/components'
import { Badge } from '@/components/badge'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize, EStatus, IRelativeType } from '@/models'
import {
  useGetRelativeTypesQuery,
  useUpdateRelativeTypeStatusMutation
} from '@/services/settings/company-planning/dynamicVariableService'
import { closeModal, openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import { toastSuccess, toastError } from '@/utils/toastUtil'
import React from 'react'
import DataTable from 'react-data-table-component'

const LocationsTab = () => {
  const { data: relativeTypeData } = useGetRelativeTypesQuery()
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
        size: ESize.Small
      })
    )
  }

  const handleEdit = (relativeType: IRelativeType) => {
    dispatch(
      openModal({
        id: `updateRelativeTypeModal-${relativeType._id}`,
        title: 'Update RelativeType',
        body: <UpdateRelativeTypeModal relativeType={relativeType} />,
        size: ESize.Small
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
        size: ESize.Small
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
        size: ESize.Small
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
        size: ESize.Small
      })
    )
  }

  return (
    <ItemContainer height="100%">
      <DataTableHeader handleAddNew={openCreateRelativeTypeModal} />
      <DataTable fixedHeader columns={columns} data={relativeTypeData || []} onRowClicked={handleRead} />
    </ItemContainer>
  )
}

export default LocationsTab
