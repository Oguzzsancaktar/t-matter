import {
  ActionButtons,
  Badge,
  Column,
  CreateUserModal,
  DataTableHeader,
  InnerWrapper,
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterColumn,
  JustifyCenterRow,
  ReadUserModal,
  RoleBadge,
  Tab,
  UserBadge
} from '@/components'
import { ModalHeader, ModalBody } from '@/components/modals/types'
import UserReadModal from '@/components/modals/UserPlanning/userPageSettings/ReadUserModal'
import useAccessStore from '@/hooks/useAccessStore'
import { EStatus, ESize } from '@/models'
import { openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { UserCheck } from 'react-feather'
import { UserRoleSettings, UserTaskSettingsTab, UserPageSettingsTab } from '../Settings'

const UserModalLogInTab = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const columns = [
    {
      name: 'Date',
      selector: row => row.date,
      sortable: true
    },
    {
      name: 'Log In',
      selector: row => row.logIn,
      sortable: true
    },
    {
      name: 'Log Out',
      selector: row => row.logOut,
      sortable: true
    },
    {
      name: 'Total Time',
      selector: row => row.status,
      sortable: true,
      cell: data => data.totalTime
    },
    {
      name: 'Actions',
      selector: row => row.year,
      right: true,
      header: ({ title }) => <div style={{ textAlign: 'center', color: 'red' }}>{title}</div>,
      cell: data => (
        <ActionButtons
          onRead={() => console.log('not implemented')}
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
      id: '1',
      date: 'Sep/11/2022',
      logIn: '09:00 am',
      logOut: '05:00 pm',
      totalTime: '10:00'
    },
    {
      id: '2',
      date: 'Sep/11/2022',
      logIn: '09:00 am',
      logOut: '05:00 pm',
      totalTime: '10:00'
    }
  ]

  const openCreateRoleModal = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      openModal({
        id: 'createUserModal',
        title: 'Create User',
        body: <CreateUserModal />,
        size: ESize.Medium
      })
    )
  }

  return (
    <InnerWrapper>
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
    </InnerWrapper>
  )
}

export default UserModalLogInTab
