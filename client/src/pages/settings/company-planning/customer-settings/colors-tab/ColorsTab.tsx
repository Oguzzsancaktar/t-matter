import {
  ActionButtons,
  CircleColor,
  ConfirmModal,
  CreateColorModal,
  DataTableHeader,
  ItemContainer,
  NoTableData,
  ReadColorModal,
  TableSkeltonLoader,
  UpdateColorModal
} from '@/components'
import { Badge } from '@/components/badge'
import { emptyQueryParams } from '@/constants/queryParams'
import { statusOptions } from '@/constants/statuses'

import useAccessStore from '@/hooks/useAccessStore'
import { ESize, EStatus, IColor } from '@/models'
import {
  useGetColorsQuery,
  useUpdateColorStatusMutation
} from '@/services/settings/company-planning/dynamicVariableService'
import { closeModal, openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import { toastSuccess, toastError } from '@/utils/toastUtil'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'

const ColorsTab = () => {
  const [searchQueryParams, setSearchQueryParams] = useState(emptyQueryParams)

  const { data: colorData, isLoading: colorIsLoading } = useGetColorsQuery(searchQueryParams)
  const [updateColorStatus] = useUpdateColorStatusMutation()

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const columns = [
    {
      name: 'Color',
      selector: row => row.color,
      sortable: true,
      cell: data => <CircleColor cursor="normal" color={data.color} />
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

  const handleRead = (color: IColor) => {
    dispatch(
      openModal({
        id: `readColorModal-${color._id}`,
        title: 'Create Color',
        body: <ReadColorModal color={color} />,
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleEdit = (color: IColor) => {
    dispatch(
      openModal({
        id: `updateColorModal-${color._id}`,
        title: 'Update Color',
        body: <UpdateColorModal color={color} />,
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleDelete = (color: IColor) => {
    dispatch(
      openModal({
        id: `deleteColorModal-${color._id}`,
        title: `Are you sure to inactivate ${color.color}?`,
        body: (
          <ConfirmModal
            modalId={`deleteColorModal-${color._id}`}
            title={`Are you sure to inactivate ${color.color}?`}
            onConfirm={() => handleOnConfirmDelete(color)}
          />
        ),
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleReactive = (color: IColor) => {
    dispatch(
      openModal({
        id: `reactiveColorModal-${color._id}`,
        title: `Are you sure to reactivate ${color.color}?`,
        body: (
          <ConfirmModal
            modalId={`reactiveColorModal-${color._id}`}
            title={`Are you sure to reactivate ${color.color}?`}
            onConfirm={() => handleOnConfirmReactive(color)}
          />
        ),
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleOnConfirmDelete = async (color: IColor) => {
    try {
      await updateColorStatus({ _id: color._id, status: EStatus.Inactive })
      toastSuccess('Color ' + color.color + ' inactivated successfully')
      dispatch(closeModal(`deleteColorModal-${color._id}`))
    } catch (error) {
      toastError('Error inactivating color')
    }
  }

  const handleOnConfirmReactive = async (color: IColor) => {
    try {
      await updateColorStatus({ _id: color._id, status: EStatus.Active })
      toastSuccess('Color ' + color.color + ' reactivated successfully')
      dispatch(closeModal(`reactiveColorModal-${color._id}`))
    } catch (error) {
      toastError('Error reactivating color')
    }
  }

  const openCreateColorModal = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      openModal({
        id: 'createColorModal',
        title: 'Create Reffered By',
        body: <CreateColorModal />,
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
        handleAddNew={openCreateColorModal}
        status={statusOptions.find(status => +status.value === searchQueryParams.status)}
        handleSearch={handleSearch}
        handleStatusFilter={handleStatusFilter}
      />

      <ItemContainer height="calc(100% - 38px - 0.5rem)">
        {colorIsLoading ? (
          <ItemContainer height="100%">
            <TableSkeltonLoader count={13} />
          </ItemContainer>
        ) : colorData && colorData.length > 0 ? (
          <DataTable
            className="data-table"
            fixedHeader
            columns={columns}
            data={colorData || []}
            onRowClicked={handleRead}
          />
        ) : (
          <NoTableData />
        )}
      </ItemContainer>
    </ItemContainer>
  )
}

export default ColorsTab
