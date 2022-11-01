import React, { useMemo, useState } from 'react'
import {
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterColumn,
  Column,
  DataTableHeader,
  ActionButtons,
  CreateCustomerModal,
  ReadCustomerModal,
  UpdateCustomerModal,
  ItemContainer,
  TableSkeltonLoader,
  NoTableData,
  ChangeCustomerTypeModal,
  CustomerTypesDonutChart,
  CustomerRefferedByDonutChart,
  CustomerMonthlyCustomerTypeBarChart
} from '@/components'
import DataTable from 'react-data-table-component'
import { Badge, RoleBadge, UserBadge } from '@/components/badge'
import useAccessStore from '@/hooks/useAccessStore'
import { EStatus, ESize, ICustomer } from '@/models'
import { closeModal, openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import { UserCheck } from 'react-feather'
import { useGetCustomersQuery, useUpdateCustomerStatusMutation } from '@/services/customers/customerService'
import { toastSuccess, toastError } from '@/utils/toastUtil'
import { emptyQueryParams } from '@/constants/queryParams'
import { CUSTOMER_HISTORY_TYPES } from '@/constants/customerHistoryTypes'
import { useAuth } from '@/hooks/useAuth'
import { useCreateCustomerHistoryMutation } from '@/services/customers/customerHistoryService'
import { useGetCustomerTypesQuery } from '@/services/settings/company-planning/dynamicVariableService'

const CustomersPage = () => {
  const { loggedUser } = useAuth()
  const [createCustomerHistory] = useCreateCustomerHistoryMutation()

  const [searchQueryParams, setSearchQueryParams] = useState({ ...emptyQueryParams, status: '-9' })
  const { data: customersData, isLoading: customersIsLoading } = useGetCustomersQuery(searchQueryParams)

  const { data: customerTypeData, isLoading: customerTypeIsLoading } = useGetCustomerTypesQuery(emptyQueryParams)

  const customerTypeOptions = useMemo(() => {
    if (customerTypeData) {
      return [{ value: '-9', label: 'All' }].concat(
        customerTypeData.map(customerType => ({
          label: customerType.name,
          value: customerType._id
        }))
      )
    }
    return [{ value: '-9', label: 'All' }]
  }, [customerTypeData])

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
      name: 'Type',
      width: '250px',
      selector: row => row.customerType,
      sortable: true,
      cell: data => (
        <ItemContainer onClick={() => handleRead(data)} cursorType="pointer">
          <RoleBadge
            roleColor={data.customerType.color.color}
            roleIcon={<UserCheck size={16} />}
            roleName={data.customerType.name}
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
          onCustomType={() => handleCustomerTypeChange(data)}
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

  const handleCustomerTypeChange = (customer: ICustomer) => {
    dispatch(
      openModal({
        id: `changeCustomerType-${customer._id}`,
        title: `Are you sure to change ${customer.firstname + ' ' + customer.lastname} type?`,
        body: (
          <ChangeCustomerTypeModal
            modalId={`changeCustomerType-${customer._id}`}
            title={`Are you sure to inactivate ${customer.firstname + ' ' + customer.lastname}?`}
            onConfirm={customerType => handleOnConfirmTypeChange(customer, customerType)}
          />
        ),
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleOnConfirmTypeChange = async (customer: ICustomer, customerType: string) => {
    try {
      await updateCustomerStatus({ _id: customer._id, customerType: customerType })
      toastSuccess('Customer ' + customer.firstname + ' ' + customer.lastname + ' type changed successfully')
      await createCustomerHistory({
        customer: customer._id,
        responsible: loggedUser.user?._id || '',
        type: CUSTOMER_HISTORY_TYPES.CUSTOMER_STATUS_CHANGED
      })

      dispatch(closeModal(`changeCustomerType-${customer._id}`))
    } catch (error) {
      toastError('Error customer type change')
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
  const handleStatusFilter = (status: number | string) => {
    setSearchQueryParams({ ...searchQueryParams, status: status.toString() })
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQueryParams({ ...searchQueryParams, search: event.target.value })
  }
  return (
    <JustifyBetweenColumn height="100%">
      <JustifyBetweenRow height="200px" margin="0 0 1rem 0">
        <JustifyCenterColumn width="250px">
          <CustomerRefferedByDonutChart />
        </JustifyCenterColumn>
        <JustifyCenterColumn>
          <CustomerMonthlyCustomerTypeBarChart />
        </JustifyCenterColumn>
        <JustifyCenterColumn width="250px">
          <CustomerTypesDonutChart />
        </JustifyCenterColumn>
      </JustifyBetweenRow>
      <Column height="calc(100% - 200px - 1rem)">
        <DataTableHeader
          filterStatusOptions={customerTypeOptions}
          handleAddNew={openCreateCustomerModal}
          status={customerTypeOptions.find(status => status.value.toString() === searchQueryParams.status?.toString())}
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
