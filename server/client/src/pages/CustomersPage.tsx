import React from 'react'
import {
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterColumn,
  Column,
  DataTableHeader,
  ActionButtons,
  PageWrapper,
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
import ReactTooltip from 'react-tooltip'

const CustomersPage = () => {
  const [updateCustomerStatus] = useUpdateCustomerStatusMutation()
  const { data: customersData, isLoading: customersIsLoading } = useGetCustomersQuery()

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const columns = [
    {
      name: 'Customer',
      selector: row => row.task,
      sortable: true,
      cell: data => (
        <UserBadge userEmail={data.email} userImage={data.photo} userName={data.firstname + ' ' + data.lastname} />
      )
    },
    {
      name: 'Type',
      selector: row => row.customerType,
      sortable: true,
      cell: data => (
        <RoleBadge roleColor="#ff0000" roleIcon={<UserCheck size={16} />} roleName={ECustomerType[data.customerType]} />
      )
    },
    {
      name: 'Phone',
      selector: row => row.phone,
      sortable: true
    },
    {
      name: 'Reffered By',
      selector: row => row.refferedBy,
      sortable: true,
      cell: data => <Badge color={data.refferedBy.color}>{data.refferedBy.name} </Badge>
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

  const handleRead = (customer: ICustomer) => {
    console.log(customer)
    dispatch(
      openModal({
        id: `customerDetailModal-${customer._id}`,
        title: 'Customer / ' + customer.firstname + ' ' + customer.lastname,
        body: <ReadCustomerModal customer={customer} />,
        width: ESize.XLarge,
        height: ESize.Large,
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
        width: ESize.XLarge,
        height: ESize.Large
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
        width: ESize.Large,
        height: ESize.Auto,
        maxWidth: ESize.Small
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
        width: ESize.Large,
        height: ESize.Auto,
        maxWidth: ESize.Small
      })
    )
  }

  const handleOnConfirmDelete = async (customer: ICustomer) => {
    try {
      await updateCustomerStatus({ _id: customer._id, status: EStatus.Inactive })
      toastSuccess('Customer ' + customer.firstname + ' ' + customer.lastname + ' inactivated successfully')
      dispatch(closeModal(`deleteCustomerModal-${customer._id}`))
    } catch (error) {
      toastError('Error inactivating customer')
    }
  }

  const handleOnConfirmReactive = async (customer: ICustomer) => {
    try {
      await updateCustomerStatus({ _id: customer._id, status: EStatus.Active })
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
        width: ESize.Small,
        height: ESize.Small
      })
    )
  }

  return (
    <PageWrapper>
      <JustifyBetweenColumn height="100%">
        <JustifyBetweenRow height="200px" margin="0 0 1rem 0">
          <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
          <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
          <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
        </JustifyBetweenRow>
        <Column height="calc(100% - 200px)">
          <DataTableHeader handleAddNew={openCreateCustomerModal} />

          <ItemContainer height="calc(100% - 38px - 0.5rem)">
            {customersIsLoading ? (
              <ItemContainer height="100%">
                <TableSkeltonLoader count={13} />
              </ItemContainer>
            ) : customersData && customersData.length > 0 ? (
              <DataTable fixedHeader columns={columns} data={customersData || []} onRowClicked={handleRead} />
            ) : (
              <NoTableData />
            )}
          </ItemContainer>
        </Column>
      </JustifyBetweenColumn>
    </PageWrapper>
  )
}

export default CustomersPage
