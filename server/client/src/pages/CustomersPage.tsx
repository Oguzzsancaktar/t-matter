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
  ReadCustomerModal
} from '@/components'
import DataTable from 'react-data-table-component'
import { Badge, RoleBadge, UserBadge } from '@/components/badge'
import useAccessStore from '@/hooks/useAccessStore'
import { EStatus, ESize } from '@/models'
import { openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import { UserCheck } from 'react-feather'
import { useGetCustomersQuery } from '@/services/customers/customerService'

const CustomersPage = () => {
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
      cell: data => <RoleBadge roleColor="#ff0000" roleIcon={<UserCheck size={16} />} roleName={data.customerType} />
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
      right: true,
      selector: row => row.status,
      sortable: true,
      cell: data => <Badge color={selectColorForStatus(data.status)}>{EStatus[data.status]} </Badge>
    },
    {
      name: 'Actions',
      selector: row => row.year,
      right: true,
      header: ({ title }) => <div style={{ textAlign: 'center', color: 'red' }}>{title}</div>,
      cell: data => (
        <ActionButtons
          onRead={() => handleRead(data.id)}
          onEdit={function (): void {
            throw new Error('Function not implemented.')
          }}
          onHistory={function (): void {
            throw new Error('Function not implemented.')
          }}
          onDelete={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      )
    }
  ]

  const openCreateRoleModal = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      openModal({
        id: 'createCustomerModal',
        title: 'Create Customer',
        body: <CreateCustomerModal />,
        size: ESize.Large
      })
    )
  }

  const handleRead = (id: string) => {
    dispatch(
      openModal({
        id: `customerDetailModal-${id}`,
        title: 'Customer modal' + id,
        body: <ReadCustomerModal customerId={id} />,
        size: ESize.XLarge
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
          <DataTableHeader handleAddNew={openCreateRoleModal} />
          <DataTable fixedHeader columns={columns} data={customersData || []} />
        </Column>
      </JustifyBetweenColumn>
    </PageWrapper>
  )
}

export default CustomersPage
