import React, { useMemo, useState } from 'react'
import { DashboardCard } from '@/pages'
import { FinanceDashboardChart, IconButton, JustifyCenterRow } from '@/components'
import { RiWallet3Fill, RiWallet3Line } from 'react-icons/ri'
import { BsTriangleFill } from 'react-icons/bs'
import colors from '@constants/colors'
import { useGetInstallmentDashboardChartQuery } from '@services/settings/finance-planning/financePlanningService'
import moment from 'moment'
import { BiReset } from 'react-icons/bi'

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
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>
}> = props => {
  const { unpaidCount, paidCount, paidAmount, totalCount } = props.data
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
      <div data-tip="Reset selected day to today" style={{ position: 'absolute', left: 0 }}>
        <IconButton
          onClick={props.setSelectedDate.bind(this, '')}
          bgColor={colors.background.gray.light}
          width="25px"
          height="25px"
        >
          <BiReset />
        </IconButton>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginRight: 16 }}>
        <span style={{ marginRight: 4 }}>{unpaidCount}</span>
        <RiWallet3Line />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginRight: 16 }}>
        <span style={{ marginRight: 4 }}>{paidCount}</span>
        <RiWallet3Fill />
      </div>
      {/*<div style={{ display: 'flex', alignItems: 'center' }}>*/}
      {/*  <span style={{ marginRight: 4 }}>{percent}%</span>*/}
      {/*  <BsTriangleFill*/}
      {/*    fill={percent > 0 ? colors.green.primary : colors.red.primary}*/}
      {/*    style={{ transform: percent > 0 ? 'rotate(0deg)' : 'rotate(180deg)' }}*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  )
}

const FinanceDashboardCard: React.FC<IProps> = props => {
  const {} = props
  const { data } = useGetInstallmentDashboardChartQuery()
  const [selectedDate, setSelectedDate] = useState('')

  const selectedData: IGroupedInstallment = useMemo(() => {
    const d = data?.find(i => i._id === (selectedDate ? moment().format('YYYY-MM-DD') : selectedDate))
    return (
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
  }, [data, selectedDate])

  if (!data) return <div>...Loading</div>

  const handleSelectBar = (date: string) => {
    setSelectedDate(date)
  }

  return (
    <DashboardCard head={<Head data={selectedData} setSelectedDate={setSelectedDate} />}>
      <FinanceDashboardChart onSelectBar={handleSelectBar} />
    </DashboardCard>
  )
}

export default FinanceDashboardCard
