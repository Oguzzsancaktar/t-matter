import {
  ActionButtons,
  CircleColor,
  ConfirmModal,
  CreateJobTitleModal,
  DataTableHeader,
  ItemContainer,
  NoTableData,
  ReadJobTitleModal,
  TableSkeltonLoader,
  UpdateJobTitleModal
} from '@/components'
import { Badge } from '@/components/badge'
import { emptyQueryParams } from '@/constants/queryParams'
import { statusOptions } from '@/constants/statuses'

import useAccessStore from '@/hooks/useAccessStore'
import { ESize, EStatus, IJobTitle } from '@/models'
import {
  useGetJobTitlesQuery,
  useUpdateJobTitleStatusMutation
} from '@/services/settings/company-planning/dynamicVariableService'
import { closeModal, openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import { toastSuccess, toastError } from '@/utils/toastUtil'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'

const JobTitleTab = () => {
  const [searchQueryParams, setSearchQueryParams] = useState(emptyQueryParams)

  const { data: jobTitleData, isLoading: jobTitleIsLoading } = useGetJobTitlesQuery(searchQueryParams)
  const [updateJobTitleStatus] = useUpdateJobTitleStatusMutation()

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

  const handleRead = (jobTitle: IJobTitle) => {
    dispatch(
      openModal({
        id: `readJobTitleModal-${jobTitle._id}`,
        title: 'Create JobTitle',
        body: <ReadJobTitleModal jobTitle={jobTitle} />,
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleEdit = (jobTitle: IJobTitle) => {
    dispatch(
      openModal({
        id: `updateJobTitleModal-${jobTitle._id}`,
        title: 'Update JobTitle',
        body: <UpdateJobTitleModal jobTitle={jobTitle} />,
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleDelete = (jobTitle: IJobTitle) => {
    dispatch(
      openModal({
        id: `deleteJobTitleModal-${jobTitle._id}`,
        title: `Are you sure to inactivate ${jobTitle.name}?`,
        body: (
          <ConfirmModal
            modalId={`deleteJobTitleModal-${jobTitle._id}`}
            title={`Are you sure to inactivate ${jobTitle.name}?`}
            onConfirm={() => handleOnConfirmDelete(jobTitle)}
          />
        ),
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleReactive = (jobTitle: IJobTitle) => {
    dispatch(
      openModal({
        id: `reactiveJobTitleModal-${jobTitle._id}`,
        title: `Are you sure to reactivate ${jobTitle.name}?`,
        body: (
          <ConfirmModal
            modalId={`reactiveJobTitleModal-${jobTitle._id}`}
            title={`Are you sure to reactivate ${jobTitle.name}?`}
            onConfirm={() => handleOnConfirmReactive(jobTitle)}
          />
        ),
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleOnConfirmDelete = async (jobTitle: IJobTitle) => {
    try {
      await updateJobTitleStatus({ _id: jobTitle._id, status: EStatus.Inactive })
      toastSuccess('JobTitle ' + jobTitle.name + ' inactivated successfully')
      dispatch(closeModal(`deleteJobTitleModal-${jobTitle._id}`))
    } catch (error) {
      toastError('Error inactivating jobTitle')
    }
  }

  const handleOnConfirmReactive = async (jobTitle: IJobTitle) => {
    try {
      await updateJobTitleStatus({ _id: jobTitle._id, status: EStatus.Active })
      toastSuccess('JobTitle ' + jobTitle.name + ' reactivated successfully')
      dispatch(closeModal(`reactiveJobTitleModal-${jobTitle._id}`))
    } catch (error) {
      toastError('Error reactivating jobTitle')
    }
  }

  const openCreateJobTitleModal = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      openModal({
        id: 'createJobTitleModal',
        title: 'Create Reffered By',
        body: <CreateJobTitleModal />,
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleStatusFilter = (status: number | string) => {
    setSearchQueryParams({ ...searchQueryParams, status: +status })
  }
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQueryParams({ ...searchQueryParams, search: event.target.value })
  }

  return (
    <ItemContainer height="100%">
      <DataTableHeader
        handleAddNew={openCreateJobTitleModal}
        status={statusOptions.find(status => +status.value === searchQueryParams.status)}
        handleSearch={handleSearch}
        handleStatusFilter={handleStatusFilter}
      />

      <ItemContainer height="calc(100% - 38px - 0.5rem)">
        {jobTitleIsLoading ? (
          <ItemContainer height="100%">
            <TableSkeltonLoader count={13} />
          </ItemContainer>
        ) : jobTitleData && jobTitleData.length > 0 ? (
          <DataTable
            className="data-table"
            fixedHeader
            columns={columns}
            data={jobTitleData || []}
            onRowClicked={handleRead}
          />
        ) : (
          <NoTableData />
        )}
      </ItemContainer>
    </ItemContainer>
  )
}

export default JobTitleTab
