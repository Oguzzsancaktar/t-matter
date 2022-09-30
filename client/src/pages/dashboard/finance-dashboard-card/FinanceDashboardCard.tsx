import React, { useEffect, useMemo, useState } from 'react'
import { DashboardCard } from '@/pages'
import { FinanceDashboardChart, FinanceInfoModal, IconButton, JustifyCenterRow, ReadCustomerModal } from '@/components'
import { FcAdvertising, FcBearish, FcHighPriority, FcMoneyTransfer, FcBullish } from 'react-icons/fc'
import colors from '@constants/colors'
import {
  useGetAdditionalTimePassedCustomersQuery,
  useGetInstallmentDashboardChartQuery,
  useGetNonBillablePassedCustomersQuery
} from '@services/settings/finance-planning/financePlanningService'
import moment from 'moment'
import { FaBell } from 'react-icons/fa'
import { PERIODS } from '@constants/dates'
import useAccessStore from '@hooks/useAccessStore'
import { openModal } from '@/store'
import { ESize } from '@/models'

interface IGroupedInstallment {
  unpaidCount: number
  paidCount: number
  paidAmount: number
  unpaidAmount: number
  totalAmount: number
  totalCount: number
  _id: string
}

interface IProps {}

const Head: React.FC<IProps> = props => {
  const { data: nonBillablePassedCustomers } = useGetNonBillablePassedCustomersQuery()
  const { data: additionalTimePassedCustomers } = useGetAdditionalTimePassedCustomersQuery()

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const handleShowFinanceInfoModal = page => {
    dispatch(
      openModal({
        id: `financeInfoModal`,
        title: 'Finance Info',
        body: <FinanceInfoModal page={page} />,
        width: ESize.WLarge,
        maxWidth: ESize.WLarge,
        height: ESize.WXLarge,
        backgroundColor: 'transparent'
      })
    )
  }

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        height: '100%'
      }}
    >
      <div
        onClick={handleShowFinanceInfoModal.bind(this, 'NonBillableTab')}
        style={{ display: 'flex', alignItems: 'center', marginRight: 16, cursor: 'pointer' }}
      >
        <FaBell />
        <span style={{ marginLeft: 4 }}>{nonBillablePassedCustomers?.length}</span>
      </div>
      <div
        onClick={handleShowFinanceInfoModal.bind(this, 'AdditionalTimeTab')}
        style={{ display: 'flex', alignItems: 'center', marginRight: 16, cursor: 'pointer' }}
      >
        <FcAdvertising />
        <span style={{ marginLeft: 4 }}>{additionalTimePassedCustomers?.length}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', right: 0 }}>
        {true ? <FcBearish /> : <FcBullish />}
        <span style={{ marginLeft: 4 }}>12%</span>
      </div>
    </div>
  )
}

const FinanceDashboardCard: React.FC<IProps> = props => {
  const {} = props
  const { data } = useGetInstallmentDashboardChartQuery({ period: PERIODS.WEEKLY })
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  if (!data) return <div>...Loading</div>

  const handleSelectBar = (bar: { x: string; y: number }) => {
    dispatch(
      openModal({
        id: `financeInfoModal`,
        title: 'Finance Info',
        body: (
          <FinanceInfoModal
            page="FinanceInfoInstallmentTab"
            dateRange={{ startDate: moment(bar.x).toDate(), endDate: moment(bar.x).toDate() }}
          />
        ),
        width: ESize.WLarge,
        maxWidth: ESize.WLarge,
        height: ESize.WXLarge,
        backgroundColor: 'transparent'
      })
    )
  }

  return (
    <DashboardCard head={<Head />}>
      <FinanceDashboardChart onSelectBar={handleSelectBar} />
    </DashboardCard>
  )
}

export default FinanceDashboardCard
