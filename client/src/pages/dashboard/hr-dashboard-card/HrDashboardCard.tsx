import React from 'react'
import { DashboardCard } from '@/pages'
import useAccessStore from '@hooks/useAccessStore'
import { openModal } from '@/store'
import { ESize } from '@/models'
import HrDashboardInfoModal from '../../../components/modals/dashboard/HrDashboardInfoModal'
import { HrDashboardLoginRadialChart } from '@components/charts/hr'

const SmallBadge = ({ color, onClick, count, text }) => {
  return (
    <div
      onClick={onClick}
      style={{ display: 'flex', alignItems: 'center', marginRight: 16, cursor: 'pointer', flexDirection: 'column' }}
    >
      <span style={{ fontSize: 10 }}>{count}</span>
      <span
        style={{
          width: '70px',
          fontSize: 12,
          textAlign: 'center',
          fontFamily: 'Satoshi-Light',
          padding: '0.1rem 0.2rem',
          backgroundColor: color,
          marginTop: 2,
          color: 'white',
          borderRadius: '0.3rem',
          fontWeight: '600'
        }}
      >
        {text}
      </span>
    </div>
  )
}

const HrDashboardCard = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const showHrDashboardInfo = (tab: string) => {
    dispatch(
      openModal({
        id: `hrInfoModal`,
        title: 'HR info',
        body: <HrDashboardInfoModal page={tab} />,
        width: ESize.WLarge,
        maxWidth: ESize.WLarge,
        height: ESize.WXLarge,
        backgroundColor: 'transparent'
      })
    )
  }

  return (
    <DashboardCard
      head={
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
          <SmallBadge
            count={10}
            text="Login"
            color={'#7adad1'}
            onClick={showHrDashboardInfo.bind(this, 'LoginHrTab')}
          />
          <SmallBadge
            count={11}
            text="Mental"
            color={'#3b4b8d'}
            onClick={showHrDashboardInfo.bind(this, 'MentalHrTab')}
          />
          <SmallBadge
            count={12}
            text="Absent"
            color={'#ca5b5b'}
            onClick={showHrDashboardInfo.bind(this, 'AbsentHrTab')}
          />
          <SmallBadge
            count={12}
            text="Vacation"
            color={'#416fc7'}
            onClick={showHrDashboardInfo.bind(this, 'VocationHrTab')}
          />
          <SmallBadge count={13} text="Others" color={'#ccc'} onClick={showHrDashboardInfo.bind(this, 'OthersHrTab')} />
        </div>
      }
    >
      <HrDashboardLoginRadialChart />
    </DashboardCard>
  )
}

export default HrDashboardCard
