import React from 'react'
import {
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterColumn,
  Column,
  DataTableHeader,
  ActionButtons,
  CreateRoleModal,
  PageWrapper,
  CreateCustomerModal
} from '@/components'
import DataTable from 'react-data-table-component'
import { Badge, RoleBadge, UserBadge } from '@/components/badge'
import useAccessStore from '@/hooks/useAccessStore'
import { EStatus, ESize } from '@/models'
import { openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import { UserCheck } from 'react-feather'

const CustomersPage = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const columns = [
    {
      name: 'Customer',
      selector: row => row.task,
      sortable: true,
      cell: data => (
        <UserBadge userEmail={data.customer.email} userImage={data.customer.photo} userName={data.customer.name} />
      )
    },
    {
      name: 'Type',
      selector: row => row.role,
      sortable: true,
      cell: data => <RoleBadge roleColor="#ff0000" roleIcon={<UserCheck size={16} />} roleName={data.role} />
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
      selector: row => row.status,
      sortable: true,
      cell: data => <Badge color={selectColorForStatus(EStatus[data.status])}>{data.status} </Badge>
    },
    {
      name: 'Actions',
      selector: row => row.year,
      right: true,
      header: ({ title }) => <div style={{ textAlign: 'center', color: 'red' }}>{title}</div>,
      cell: data => (
        <ActionButtons
          onRead={function (): void {
            throw new Error('Function not implemented.')
          }}
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

  const data = [
    {
      id: 1,
      customer: {
        name: 'User Name 1',
        photo: 'https://via.placeholder.com/150',
        email: 'user1@email.com'
      },
      refferedBy: {
        name: 'Facebook',
        color: '#6898ff'
      },
      role: 'Client',
      phone: '+(44) 545 567 56 56',
      status: 'Active'
    },
    {
      id: 2,
      customer: {
        name: 'User Name 2',
        photo: 'https://via.placeholder.com/150',
        email: 'user2@email.com'
      },
      refferedBy: {
        name: 'Youtube',
        color: '#ff0000'
      },
      role: 'Contact',
      phone: '+(90) 543 333 22 22',
      status: 'Inactive'
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
          <DataTable fixedHeader columns={columns} data={data} />
        </Column>
      </JustifyBetweenColumn>
    </PageWrapper>
  )
}

export default CustomersPage
