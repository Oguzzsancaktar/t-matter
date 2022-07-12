import {
  ActionButtons,
  CircleColor,
  ConfirmModal,
  CreateRefferedByModal,
  DataTableHeader,
  InnerWrapper,
  ReadRefferedByModal,
  UpdateRefferedByModal
} from '@/components'
import { Badge } from '@/components/badge'

import useAccessStore from '@/hooks/useAccessStore'
import { ESize, EStatus, IRefferedBy } from '@/models'
import {
  useGetRefferedBysQuery,
  useUpdateRefferedByStatusMutation
} from '@/services/settings/company-planning/dynamicVariableService'
import { closeModal, openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import { toastSuccess, toastError } from '@/utils/toastUtil'
import React from 'react'
import DataTable from 'react-data-table-component'

const RefferedByTab = () => {
  const { data: refferedByData } = useGetRefferedBysQuery()
  const [updateRefferedByStatus] = useUpdateRefferedByStatusMutation()

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const columns = [
    {
      name: 'Refffered By Name',
      selector: row => row.name,
      sortable: true,
      cell: data => <div>{data.name} </div>
    },
    {
      name: 'Color',
      selector: row => row.color,
      sortable: true,
      cell: data => <CircleColor cursor="normal" color={data.color} />
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
          status={data.status}
          onRead={() => handleRead(data)}
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

  const handleRead = (refferedBy: IRefferedBy) => {
    dispatch(
      openModal({
        id: `readRefferedByModal-${refferedBy._id}`,
        title: 'Create RefferedBy',
        body: <ReadRefferedByModal refferedBy={refferedBy} />,
        size: ESize.Small
      })
    )
  }

  const handleEdit = (refferedBy: IRefferedBy) => {
    dispatch(
      openModal({
        id: `updateRefferedByModal-${refferedBy._id}`,
        title: 'Update RefferedBy',
        body: <UpdateRefferedByModal refferedBy={refferedBy} />,
        size: ESize.Small
      })
    )
  }

  const handleDelete = (refferedBy: IRefferedBy) => {
    dispatch(
      openModal({
        id: `deleteRefferedByModal-${refferedBy._id}`,
        title: `Are you sure to inactivate ${refferedBy.name}?`,
        body: (
          <ConfirmModal
            modalId={`deleteRefferedByModal-${refferedBy._id}`}
            title={`Are you sure to inactivate ${refferedBy.name}?`}
            onConfirm={() => handleOnConfirmDelete(refferedBy)}
          />
        ),
        size: ESize.Small
      })
    )
  }

  const handleReactive = (refferedBy: IRefferedBy) => {
    dispatch(
      openModal({
        id: `reactiveRefferedByModal-${refferedBy._id}`,
        title: `Are you sure to reactivate ${refferedBy.name}?`,
        body: (
          <ConfirmModal
            modalId={`reactiveRefferedByModal-${refferedBy._id}`}
            title={`Are you sure to reactivate ${refferedBy.name}?`}
            onConfirm={() => handleOnConfirmReactive(refferedBy)}
          />
        ),
        size: ESize.Small
      })
    )
  }

  const handleOnConfirmDelete = async (refferedBy: IRefferedBy) => {
    try {
      await updateRefferedByStatus({ _id: refferedBy._id, status: EStatus.Inactive })
      toastSuccess('RefferedBy ' + refferedBy.name + ' inactivated successfully')
      dispatch(closeModal(`deleteRefferedByModal-${refferedBy._id}`))
    } catch (error) {
      toastError('Error inactivating refferedBy')
    }
  }

  const handleOnConfirmReactive = async (refferedBy: IRefferedBy) => {
    try {
      await updateRefferedByStatus({ _id: refferedBy._id, status: EStatus.Active })
      toastSuccess('RefferedBy ' + refferedBy.name + ' reactivated successfully')
      dispatch(closeModal(`reactiveRefferedByModal-${refferedBy._id}`))
    } catch (error) {
      toastError('Error reactivating refferedBy')
    }
  }

  const openCreateRefferedByModal = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      openModal({
        id: 'createRefferedByModal',
        title: 'Company RefferedBys',
        body: <CreateRefferedByModal />,
        size: ESize.Small
      })
    )
  }
  const openCreateRoleModal = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      openModal({
        id: 'createRefferedByModal',
        title: 'Create Reffered By',
        body: <CreateRefferedByModal />,
        size: ESize.Small
      })
    )
  }

  return (
    <InnerWrapper>
      <DataTableHeader handleAddNew={openCreateRoleModal} />
      <DataTable fixedHeader columns={columns} data={refferedByData || []} />
    </InnerWrapper>
  )
}

export default RefferedByTab
