import React, { useState } from 'react'
import {
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterColumn,
  Column,
  DataTableHeader,
  ActionButtons,
  CreateCustomerModal,
  ReadCustomerModal,
  ConfirmModal,
  UpdateCustomerModal,
  ItemContainer,
  TableSkeltonLoader,
  NoTableData
} from '@/components'
import DataTable from 'react-data-table-component'
import { Badge, RoleBadge, UserBadge } from '@/components/badge'
import useAccessStore from '@/hooks/useAccessStore'
import { EStatus, ESize, ECustomerType, ICustomer } from '@/models'
import { closeModal, openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import { UserCheck } from 'react-feather'
import { useGetCustomersQuery, useUpdateCustomerStatusMutation } from '@/services/customers/customerService'
import { toastSuccess, toastError } from '@/utils/toastUtil'
import { statusOptions } from '@/constants/statuses'
import { emptyQueryParams } from '@/constants/queryParams'
import { CUSTOMER_HISTORY_TYPES } from '@/constants/customerHistoryTypes'
import { useAuth } from '@/hooks/useAuth'
import { useCreateCustomerHistoryMutation } from '@/services/customers/customerHistoryService'

const CustomersPage = () => {
  const { loggedUser } = useAuth()
  const [createCustomerHistory] = useCreateCustomerHistoryMutation()

  const [searchQueryParams, setSearchQueryParams] = useState(emptyQueryParams)
  const { data: customersData, isLoading: customersIsLoading } = useGetCustomersQuery(searchQueryParams)

  const [updateCustomerStatus] = useUpdateCustomerStatusMutation()

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const columns = [
    {
      name: 'Customer',
      selector: row => row.task,
      sortable: true,
      cell: data => (
        <ItemContainer onClick={() => handleRead(data)} cursorType="pointer">
          <UserBadge
            userEmail={data.email}
            userImage={data.profile_img}
            userName={data.firstname + ' ' + data.lastname}
          />
        </ItemContainer>
      )
    },
    {
      name: 'Phone',
      width: '200px',
      selector: row => row.phone,
      sortable: true
    },
    {
      name: 'Type',
      width: '160px',
      selector: row => row.customerType,
      sortable: true,
      cell: data => (
        <ItemContainer onClick={() => handleRead(data)} cursorType="pointer">
          <RoleBadge
            roleColor="#ff0000"
            roleIcon={<UserCheck size={16} />}
            roleName={ECustomerType[data.customerType]}
          />
        </ItemContainer>
      )
    },

    {
      name: 'Reffered By',
      width: '170px',
      selector: row => row.refferedBy,
      sortable: true,
      cell: data => (
        <ItemContainer onClick={() => handleRead(data)} cursorType="pointer" width="auto">
          <Badge color={data.refferedBy.color.color}>{data.refferedBy.name}</Badge>
        </ItemContainer>
      )
    },
    {
      name: 'Status',
      width: '120px',
      selector: row => row.status,
      sortable: true,
      cell: data => (
        <ItemContainer onClick={() => handleRead(data)} cursorType="pointer" width="auto">
          <Badge color={selectColorForStatus(data.status)}>{EStatus[data.status]} </Badge>
        </ItemContainer>
      )
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

  const handleRead = (customer: ICustomer) => {
    dispatch(
      openModal({
        id: `customerDetailModal-${customer._id}`,
        title: 'Customer / ' + customer.firstname + ' ' + customer.lastname,
        body: <ReadCustomerModal customer={customer} />,
        width: ESize.WXLarge,
        height: `calc(${ESize.HLarge} - 2rem )`,
        backgroundColor: 'transparent'
      })
    )
  }

  const handleEdit = (customer: ICustomer) => {
    dispatch(
      openModal({
        id: `updateCustomerModal-${customer._id}`,
        title: 'Update Customer / ' + customer.firstname + ' ' + customer.lastname,
        body: <UpdateCustomerModal customerId={customer._id} />,
        width: ESize.WXLarge,
        height: ESize.HLarge
      })
    )
  }

  const handleDelete = (customer: ICustomer) => {
    dispatch(
      openModal({
        id: `deleteCustomerModal-${customer._id}`,
        title: `Are you sure to inactivate ${customer.firstname + ' ' + customer.lastname}?`,
        body: (
          <ConfirmModal
            modalId={`deleteCustomerModal-${customer._id}`}
            title={`Are you sure to inactivate ${customer.firstname + ' ' + customer.lastname}?`}
            onConfirm={() => handleOnConfirmDelete(customer)}
          />
        ),
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleReactive = (customer: ICustomer) => {
    dispatch(
      openModal({
        id: `reactiveCustomerModal-${customer._id}`,
        title: `Are you sure to reactivate ${customer.firstname + ' ' + customer.lastname}?`,
        body: (
          <ConfirmModal
            modalId={`reactiveCustomerModal-${customer._id}`}
            title={`Are you sure to reactivate ${customer.firstname + ' ' + customer.lastname}?`}
            onConfirm={() => handleOnConfirmReactive(customer)}
          />
        ),
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleOnConfirmDelete = async (customer: ICustomer) => {
    try {
      await updateCustomerStatus({ _id: customer._id, status: EStatus.Inactive })
      toastSuccess('Customer ' + customer.firstname + ' ' + customer.lastname + ' inactivated successfully')
      await createCustomerHistory({
        customer: customer._id,
        responsible: loggedUser.user?._id || '',
        type: CUSTOMER_HISTORY_TYPES.CUSTOMER_STATUS_CHANGED
      })

      dispatch(closeModal(`deleteCustomerModal-${customer._id}`))
    } catch (error) {
      toastError('Error inactivating customer')
    }
  }

  const handleOnConfirmReactive = async (customer: ICustomer) => {
    try {
      await updateCustomerStatus({ _id: customer._id, status: EStatus.Active })

      await createCustomerHistory({
        customer: customer._id,
        responsible: loggedUser.user?._id || '',
        type: CUSTOMER_HISTORY_TYPES.CUSTOMER_STATUS_CHANGED
      })

      toastSuccess('Customer ' + customer.firstname + ' ' + customer.lastname + ' reactivated successfully')
      dispatch(closeModal(`reactiveCustomerModal-${customer._id}`))
    } catch (error) {
      toastError('Error reactivating customer')
    }
  }

  const openCreateCustomerModal = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      openModal({
        id: 'createCustomerModal',
        title: 'Create Customer',
        body: <CreateCustomerModal />,
        maxWidth: ESize.WLarge,
        width: ESize.WLarge,
        height: ESize.HSmall
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
          handleAddNew={openCreateCustomerModal}
          status={statusOptions.find(status => +status.value === searchQueryParams.status)}
          handleSearch={handleSearch}
          handleStatusFilter={handleStatusFilter}
        />

        <ItemContainer height="calc(100% - 40px - 0.5rem)">
          {customersIsLoading ? (
            <ItemContainer height="100%">
              <TableSkeltonLoader count={13} />
            </ItemContainer>
          ) : customersData && customersData.length > 0 ? (
            <DataTable
              className="data-table"
              fixedHeader
              columns={columns}
              data={customersData || []}
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

export default CustomersPage
