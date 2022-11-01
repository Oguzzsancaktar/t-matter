import {
  ActionButtons,
  CircleColor,
  ConfirmModal,
  CreateRefferedByModal,
  DataTableHeader,
  ItemContainer,
  NoTableData,
  ReadRefferedByModal,
  TableSkeltonLoader,
  UpdateRefferedByModal
} from '@/components'
import { Badge } from '@/components/badge'
import { emptyQueryParams } from '@/constants/queryParams'
import { statusOptions } from '@/constants/statuses'

import useAccessStore from '@/hooks/useAccessStore'
import { ESize, EStatus, IRefferedBy } from '@/models'
import {
  useGetRefferedBysQuery,
  useUpdateRefferedByStatusMutation
} from '@/services/settings/company-planning/dynamicVariableService'
import { closeModal, openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import { toastSuccess, toastError } from '@/utils/toastUtil'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'

const RefferedByTab = () => {
  const [searchQueryParams, setSearchQueryParams] = useState(emptyQueryParams)

  const { data: refferedByData, isLoading: refferedByIsLoading } = useGetRefferedBysQuery(searchQueryParams)
  const [updateRefferedByStatus] = useUpdateRefferedByStatusMutation()

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const columns = [
    {
      name: 'Refffered By Name',
      selector: row => row.name,
      sortable: true,
      cell: data => <div>{data.name} </div>
    },
    {
      name: 'Color',
      width: '120px',
      selector: row => row.color,
      sortable: true,
      cell: data => <CircleColor cursor="normal" color={data.color.color} />
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

  const handleRead = (refferedBy: IRefferedBy) => {
    dispatch(
      openModal({
        id: `readRefferedByModal-${refferedBy._id}`,
        title: 'Create RefferedBy',
        body: <ReadRefferedByModal refferedBy={refferedBy} />,
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleEdit = (refferedBy: IRefferedBy) => {
    dispatch(
      openModal({
        id: `updateRefferedByModal-${refferedBy._id}`,
        title: 'Update RefferedBy',
        body: <UpdateRefferedByModal refferedBy={refferedBy} />,
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleDelete = (refferedBy: IRefferedBy) => {
    dispatch(
      openModal({
        id: `deleteRefferedByModal-${refferedBy._id}`,
        title: `Are you sure to inactivate ${refferedBy.name}?`,
        body: (
          <ConfirmModal
            modalId={`deleteRefferedByModal-${refferedBy._id}`}
            title={`Are you sure to inactivate ${refferedBy.name}?`}
            onConfirm={() => handleOnConfirmDelete(refferedBy)}
          />
        ),
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleReactive = (refferedBy: IRefferedBy) => {
    dispatch(
      openModal({
        id: `reactiveRefferedByModal-${refferedBy._id}`,
        title: `Are you sure to reactivate ${refferedBy.name}?`,
        body: (
          <ConfirmModal
            modalId={`reactiveRefferedByModal-${refferedBy._id}`}
            title={`Are you sure to reactivate ${refferedBy.name}?`}
            onConfirm={() => handleOnConfirmReactive(refferedBy)}
          />
        ),
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleOnConfirmDelete = async (refferedBy: IRefferedBy) => {
    try {
      await updateRefferedByStatus({ _id: refferedBy._id, status: EStatus.Inactive })
      toastSuccess('RefferedBy ' + refferedBy.name + ' inactivated successfully')
      dispatch(closeModal(`deleteRefferedByModal-${refferedBy._id}`))
    } catch (error) {
      toastError('Error inactivating refferedBy')
    }
  }

  const handleOnConfirmReactive = async (refferedBy: IRefferedBy) => {
    try {
      await updateRefferedByStatus({ _id: refferedBy._id, status: EStatus.Active })
      toastSuccess('RefferedBy ' + refferedBy.name + ' reactivated successfully')
      dispatch(closeModal(`reactiveRefferedByModal-${refferedBy._id}`))
    } catch (error) {
      toastError('Error reactivating refferedBy')
    }
  }

  const openCreateRefferedByModal = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      openModal({
        id: 'createRefferedByModal',
        title: 'Create Reffered By',
        body: <CreateRefferedByModal />,
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
        handleAddNew={openCreateRefferedByModal}
        status={statusOptions.find(status => +status.value === searchQueryParams.status)}
        handleSearch={handleSearch}
        handleStatusFilter={handleStatusFilter}
      />

      <ItemContainer height="calc(100% - 38px - 0.5rem)">
        {refferedByIsLoading ? (
          <ItemContainer height="100%">
            <TableSkeltonLoader count={13} />
          </ItemContainer>
        ) : refferedByData && refferedByData.length > 0 ? (
          <DataTable
            className="data-table"
            fixedHeader
            columns={columns}
            data={refferedByData || []}
            onRowClicked={handleRead}
          />
        ) : (
          <NoTableData />
        )}
      </ItemContainer>
    </ItemContainer>
  )
}

export default RefferedByTab
