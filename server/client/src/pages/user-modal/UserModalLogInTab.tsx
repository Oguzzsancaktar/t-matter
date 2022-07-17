import {
  ActionButtons,
  Column,
  CreateUserModal,
  DataTableHeader,
  InnerWrapper,
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterColumn
} from '@/components'
import { ModalHeader, ModalBody } from '@/components/modals/types'
import UserReadModal from '@/components/modals/user-planning/userPageSettings/ReadUserModal'
import useAccessStore from '@/hooks/useAccessStore'
import { EStatus, ESize } from '@/models'

import { useGetUserLogsByIdQuery } from '@/services/userLogService'
import { openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

interface IProps {
  userId: string
}

const UserModalLogInTab: React.FC<IProps> = ({ userId }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const { data: userTimeLogData, isLoading: userTimeLogIsLoading } = useGetUserLogsByIdQuery(userId)

  const columns = [
    {
      name: 'Date',
      selector: row => row.date,
      sortable: true
    },
    {
      name: 'Log In',
      selector: row => moment(row.login).format('MMMM-DD-YYYY'),
      sortable: true
    },
    {
      name: 'Log Out',
      selector: row => moment(row.logout).format('MMMM-DD-YYYY'),
      sortable: true
    },
    {
      name: 'Total Time',
      selector: row => row.totalTime,
      sortable: true,
      cell: data => data.totalTime
    }
    // {
    //   name: 'Actions',
    //   selector: row => row.year,
    //   right: true,
    //   header: ({ title }) => <div style={{ textAlign: 'center', color: 'red' }}>{title}</div>,
    //   cell: data => (
    //     <ActionButtons
    //       onRead={() => console.log('not implemented')}
    //       onEdit={function (): void {
    //         throw new Error('Function not implemented.')
    //       }}
    //       onHistory={function (): void {
    //         throw new Error('Function not implemented.')
    //       }}
    //       onDelete={function (): void {
    //         throw new Error('Function not implemented.')
    //       }}
    //     />
    //   )
    // }
  ]

  return (
    <InnerWrapper>
      <JustifyBetweenColumn height="100%">
        <JustifyBetweenRow height="200px" margin="0 0 1rem 0">
          <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
          <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
          <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
        </JustifyBetweenRow>
        <Column height="calc(100% - 200px)">
          <DataTableHeader handleAddNew={() => console.log('not implemented')} />
          <DataTable
            fixedHeader
            columns={columns}
            style={{ height: 'calc(100% - 56px)' }}
            pagination={true}
            paginationPerPage={5}
            data={userTimeLogData || []}
          />
        </Column>
      </JustifyBetweenColumn>
    </InnerWrapper>
  )
}

export default UserModalLogInTab
