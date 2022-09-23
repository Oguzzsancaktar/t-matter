import React from 'react'
import { DashboardCard } from '@/pages'
import { JustifyBetweenRow } from '@/components'
import { FaWallet } from 'react-icons/fa'
interface IProps {}

const Head = () => {
  return (
    <JustifyBetweenRow width="100%">
      <FaWallet />
    </JustifyBetweenRow>
  )
}

const financeDashboardCard: React.FC<IProps> = props => {
  const {} = props
  return <DashboardCard head={<Head />}>incoming chart</DashboardCard>
}

export default financeDashboardCard
