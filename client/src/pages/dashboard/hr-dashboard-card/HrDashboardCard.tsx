import React from 'react'
import { DashboardCard } from '@/pages'
import useAccessStore from '@hooks/useAccessStore'
import { openModal, selectUser } from '@/store'
import { ESize } from '@/models'
import HrDashboardInfoModal from '../../../components/modals/dashboard/HrDashboardInfoModal'
import {
  HrDashboardLoginRadialChart,
  HrDashboardMentalRadialChart,
  HrDashboardVocationRadialChart,
  HrLoginRadialChart
} from '@components/charts/hr'
import { Row } from '@nextui-org/react'
import { useGetUserByIdQuery } from '@services/settings/user-planning/userService'
import moment from 'moment'
import { useGetUserLogsByIdQuery } from '@services/userLogService'
import { HR_TASK_TYPE_COLORS } from '@constants/hrTask'

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
  const { useAppDispatch, useAppSelector } = useAccessStore()
  const dispatch = useAppDispatch()

  const user = useAppSelector(selectUser)

  const { data } = useGetUserLogsByIdQuery(
    {
      condition: 'ALL',
      startDate: moment().startOf('isoWeek').toISOString(true),
      endDate: moment().endOf('isoWeek').toISOString(true),
      userId: user?._id as string,
      timeOffSet: new Date().getTimezoneOffset()
    },
    {
      skip: user?._id === undefined
    }
  )

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
            color={HR_TASK_TYPE_COLORS.MENTAL}
            onClick={showHrDashboardInfo.bind(this, 'MentalHrTab')}
          />
          <SmallBadge
            count={12}
            text="Absent"
            color={HR_TASK_TYPE_COLORS.ABSENT}
            onClick={showHrDashboardInfo.bind(this, 'AbsentHrTab')}
          />
          <SmallBadge
            count={12}
            text="Vocation"
            color={HR_TASK_TYPE_COLORS.VOCATION}
            onClick={showHrDashboardInfo.bind(this, 'VocationHrTab')}
          />
          <SmallBadge
            count={13}
            text="Others"
            color={HR_TASK_TYPE_COLORS.OTHERS}
            onClick={showHrDashboardInfo.bind(this, 'OthersHrTab')}
          />
        </div>
      }
    >
      <Row>
        <HrLoginRadialChart isSmall data={data} />
        {/*<HrDashboardMentalRadialChart />*/}
        {/*<HrDashboardVocationRadialChart />*/}
      </Row>
    </DashboardCard>
  )
}

export default HrDashboardCard
