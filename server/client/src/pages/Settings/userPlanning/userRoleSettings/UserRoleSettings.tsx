import {
  Column,
  CreateRoleModal,
  DataTableHeader,
  IconButton,
  JustifyBetweenRow,
  JustifyCenterColumn,
  Row
} from '@/components'
import colors from '@/constants/colors'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize } from '@/models'
import { openModal } from '@/store'
import React from 'react'
import DataTable from 'react-data-table-component'
import { Edit, Eye, FileText, Trash2 } from 'react-feather'

const UserRoleSettings = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const columns = [
    {
      name: 'Role',
      selector: row => row.title,
      sortable: true
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      cell: data => <div>{data.status} </div>
    },
    {
      name: 'Actions',
      selector: row => row.year,
      right: true,
      header: ({ title }) => <div style={{ textAlign: 'center', color: 'red' }}>{title}</div>,
      cell: data => (
        <Row width="auto">
          <IconButton
            bgColor={colors.background.gray.light}
            width="25px"
            height="25px"
            margin="0 .2rem 0 0"
            children={<Eye size={'16px'} color={colors.text.primary} />}
          />
          <IconButton
            bgColor={colors.background.gray.light}
            width="25px"
            height="25px"
            margin="0 .2rem 0 0"
            children={<Edit size={'16px'} color={colors.text.primary} />}
          />
          <IconButton
            bgColor={colors.background.gray.light}
            width="25px"
            height="25px"
            margin="0 .2rem 0 0"
            children={<FileText size={'16px'} color={colors.text.primary} />}
          />
          <IconButton
            bgColor={colors.background.gray.light}
            width="25px"
            height="25px"
            margin="0 0 0 0"
            children={<Trash2 size={'16px'} color={colors.text.primary} />}
          />
        </Row>
      )
    }
  ]

  const data = [
    {
      id: 1,
      title: 'Beetlejuice',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Ghostbusters',
      status: 'Inactive'
    }
  ]

  const openCreateRoleModal = (e: React.MouseEvent) => {
    e.preventDefault()

    dispatch(
      openModal({
        id: 'createRoleModal',
        title: 'Create Role',
        body: <CreateRoleModal />,
        size: ESize.Small
      })
    )
  }

  return (
    <Column>
      <JustifyBetweenRow height="200px" margin="0 0 1rem 0">
        <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
        <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
        <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
      </JustifyBetweenRow>
      <Column>
        <DataTableHeader handleAddNew={openCreateRoleModal} />
        <DataTable fixedHeader columns={columns} data={data} />
      </Column>
    </Column>
  )
}

export default UserRoleSettings
