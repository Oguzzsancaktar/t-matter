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

const Head: React.FC<{
  data: IGroupedInstallment
}> = props => {
  const { unpaidCount, paidCount, paidAmount, totalCount } = props.data
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
        width: ESize.WXLarge,
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
        onClick={handleShowFinanceInfoModal.bind(this, 'FinanceInfoInstallmentTab')}
        style={{ display: 'flex', alignItems: 'center', marginRight: 16, cursor: 'pointer' }}
      >
        <FcHighPriority />
        <span style={{ marginLeft: 4 }}>{unpaidCount}</span>
      </div>
      <div
        onClick={handleShowFinanceInfoModal.bind(this, 'FinanceInfoInstallmentTab')}
        style={{ display: 'flex', alignItems: 'center', marginRight: 16, cursor: 'pointer' }}
      >
        <FcMoneyTransfer />
        <span style={{ marginLeft: 4 }}>{paidCount}</span>
      </div>
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
      {/*<div style={{ display: 'flex', alignItems: 'center', position: 'absolute', right: 0 }}>*/}
      {/*  {true ? <FcBearish /> : <FcBullish />}*/}
      {/*  <span style={{ marginLeft: 4 }}>12%</span>*/}
      {/*</div>*/}
    </div>
  )
}

const FinanceDashboardCard: React.FC<IProps> = props => {
  const {} = props
  const { data } = useGetInstallmentDashboardChartQuery({ period: PERIODS.WEEKLY })

  const [selectedData, setSelectedData] = useState<IGroupedInstallment>({
    unpaidCount: 0,
    paidCount: 0,
    paidAmount: 0,
    unpaidAmount: 0,
    totalAmount: 0,
    totalCount: 0,
    _id: ''
  })

  if (!data) return <div>...Loading</div>

  const handleSelectBar = (date: string) => {
    const d = data?.find(i => i._id === (date ? moment().format('YYYY-MM-DD') : date))
    setSelectedData(
      d || {
        unpaidCount: 0,
        paidCount: 0,
        paidAmount: 0,
        unpaidAmount: 0,
        totalAmount: 0,
        totalCount: 0,
        _id: ''
      }
    )
  }

  return (
    <DashboardCard head={<Head data={selectedData} />}>
      <FinanceDashboardChart onSelectBar={handleSelectBar} />
    </DashboardCard>
  )
}

export default FinanceDashboardCard
