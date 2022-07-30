import {
  ActionButtons,
  Badge,
  Column,
  CreateUserModal,
  CustomerTaskModal,
  DataTableHeader,
  InnerWrapper,
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterColumn,
  SelectTaskWorkflowModal,
  UserBadge
} from '@/components'
import { ModalHeader, ModalBody } from '@/components/modals/types'
import UserReadModal from '@/components/modals/user-planning/userPageSettings/ReadUserModal'
import colors from '@/constants/colors'
import useAccessStore from '@/hooks/useAccessStore'
import { EStatus, ESize } from '@/models'
import { useCreateTaskMutation, useGetTaskByCustomerIdQuery } from '@/services/customers/taskService'
import { useGetUserLogsByIdQuery } from '@/services/userLogService'
import { openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

interface IProps {
  customerId: string
}

const CustomerModalWorkflowTab: React.FC<IProps> = ({ customerId }) => {
  const { data: customerTasksData, isLoading: customerTasksIsLoading } = useGetTaskByCustomerIdQuery(customerId)

  console.log(customerTasksData)

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const columns = [
    {
      name: 'Start Date',
      selector: row => row.startDate,
      sortable: true
    },
    {
      name: 'Workflow Name',
      selector: row => row.name,
      sortable: true
    },

    {
      name: 'Actions',
      selector: row => row.year,
      right: true,
      header: ({ title }) => <div style={{ textAlign: 'center', color: 'red' }}>{title}</div>,
      cell: data => (
        <ActionButtons
          onRead={() => openCustomerTaskModal(data.id)}
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

  const openCustomerTaskModal = workflowId => {
    dispatch(
      openModal({
        id: 'customerTaksModal' + workflowId,
        title: 'Customer Task',
        body: <CustomerTaskModal taskId={workflowId} />,
        size: ESize.XLarge,
        backgroundColor: colors.gray.light
      })
    )
  }

  const openSelectTaskWorkflowModal = () => {
    dispatch(
      openModal({
        id: 'selectTaskWorkflowModal' + customerId,
        title: 'Customer Task',
        body: <SelectTaskWorkflowModal customerId={customerId} />,
        size: ESize.XLarge,
        backgroundColor: colors.gray.light
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
          <DataTableHeader handleAddNew={() => openSelectTaskWorkflowModal()} />
          {!customerTasksIsLoading && customerTasksData && (
            <DataTable fixedHeader columns={columns} data={customerTasksData || []} />
          )}
        </Column>
      </JustifyBetweenColumn>
    </InnerWrapper>
  )
}

export default CustomerModalWorkflowTab
