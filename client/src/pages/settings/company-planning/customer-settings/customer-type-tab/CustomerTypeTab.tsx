import {
  ActionButtons,
  CircleColor,
  ConfirmModal,
  CreateCustomerTypeModal,
  DataTableHeader,
  H1,
  ItemContainer,
  NoTableData,
  ReadCustomerTypeModal,
  TableSkeltonLoader,
  UpdateCustomerTypeModal
} from '@/components'
import { Badge } from '@/components/badge'
import colors from '@/constants/colors'
import { emptyQueryParams } from '@/constants/queryParams'
import { statusOptions } from '@/constants/statuses'

import useAccessStore from '@/hooks/useAccessStore'
import { ESize, EStatus, ICustomerType } from '@/models'
import {
  useGetCustomerTypesQuery,
  useUpdateCustomerTypeStatusMutation
} from '@/services/settings/company-planning/dynamicVariableService'
import { closeModal, openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import { toastSuccess, toastError } from '@/utils/toastUtil'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'

const CustomerTypeTab = () => {
  const [searchQueryParams, setSearchQueryParams] = useState(emptyQueryParams)

  const { data: customerTypeData, isLoading: customerTypeIsLoading } = useGetCustomerTypesQuery(searchQueryParams)
  const [updateCustomerTypeStatus] = useUpdateCustomerTypeStatusMutation()

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const columns = [
    {
      name: 'Type',
      selector: row => row.customerType,
      sortable: true,
      cell: data => <H1 color={colors.text.primary}>{data.name}</H1>
    },
    {
      name: 'Color',
      width: '100px',
      selector: row => row.customerType,
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
          onDelete={
            data._id !== '636108d115070e01a633c57d' && data._id !== '636108db15070e01a633c583'
              ? () => handleDelete(data)
              : undefined
          }
          onReactive={
            data._id !== '636108d115070e01a633c57d' && data._id !== '636108db15070e01a633c583'
              ? () => handleReactive(data)
              : undefined
          }
        />
      )
    }
  ]

  const handleRead = (customerType: ICustomerType) => {
    dispatch(
      openModal({
        id: `readCustomerTypeModal-${customerType._id}`,
        title: 'Create CustomerType',
        body: <ReadCustomerTypeModal customerType={customerType} />,
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleEdit = (customerType: ICustomerType) => {
    dispatch(
      openModal({
        id: `updateCustomerTypeModal-${customerType._id}`,
        title: 'Update CustomerType',
        body: <UpdateCustomerTypeModal customerType={customerType} />,
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleDelete = (customerType: ICustomerType) => {
    dispatch(
      openModal({
        id: `deleteCustomerTypeModal-${customerType._id}`,
        title: `Are you sure to inactivate ${customerType.name}?`,
        body: (
          <ConfirmModal
            modalId={`deleteCustomerTypeModal-${customerType._id}`}
            title={`Are you sure to inactivate ${customerType.name}?`}
            onConfirm={() => handleOnConfirmDelete(customerType)}
          />
        ),
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleReactive = (customerType: ICustomerType) => {
    dispatch(
      openModal({
        id: `reactiveCustomerTypeModal-${customerType._id}`,
        title: `Are you sure to reactivate ${customerType.name}?`,
        body: (
          <ConfirmModal
            modalId={`reactiveCustomerTypeModal-${customerType._id}`}
            title={`Are you sure to reactivate ${customerType.name}?`}
            onConfirm={() => handleOnConfirmReactive(customerType)}
          />
        ),
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleOnConfirmDelete = async (customerType: ICustomerType) => {
    try {
      await updateCustomerTypeStatus({ _id: customerType._id, status: EStatus.Inactive })
      toastSuccess('CustomerType ' + customerType.name + ' inactivated successfully')
      dispatch(closeModal(`deleteCustomerTypeModal-${customerType._id}`))
    } catch (error) {
      toastError('Error inactivating customerType')
    }
  }

  const handleOnConfirmReactive = async (customerType: ICustomerType) => {
    try {
      await updateCustomerTypeStatus({ _id: customerType._id, status: EStatus.Active })
      toastSuccess('CustomerType ' + customerType.name + ' reactivated successfully')
      dispatch(closeModal(`reactiveCustomerTypeModal-${customerType._id}`))
    } catch (error) {
      toastError('Error reactivating customerType')
    }
  }

  const openCreateCustomerTypeModal = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      openModal({
        id: 'createCustomerTypeModal',
        title: 'Create Customer Type',
        body: <CreateCustomerTypeModal />,
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
        handleAddNew={openCreateCustomerTypeModal}
        status={statusOptions.find(status => +status.value === searchQueryParams.status)}
        handleSearch={handleSearch}
        handleStatusFilter={handleStatusFilter}
      />

      <ItemContainer height="calc(100% - 38px - 0.5rem)">
        {customerTypeIsLoading ? (
          <ItemContainer height="100%">
            <TableSkeltonLoader count={13} />
          </ItemContainer>
        ) : customerTypeData && customerTypeData.length > 0 ? (
          <DataTable
            className="data-table"
            fixedHeader
            columns={columns}
            data={customerTypeData || []}
            onRowClicked={handleRead}
          />
        ) : (
          <NoTableData />
        )}
      </ItemContainer>
    </ItemContainer>
  )
}

export default CustomerTypeTab
