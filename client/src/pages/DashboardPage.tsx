import { ItemContainer, JustifyBetweenColumn, JustifyBetweenRow } from '@/components'
import React from 'react'
import { ActiveTasksCard, ActivityTimelineCard, DashboardCard } from '.'
import { FinanceDashboardCard } from '@pages/dashboard/finance-dashboard-card'
import TaskDashboardCard from '@pages/dashboard/task-dashboard-card/TaskDashboardCard'
import { HrDashboardCard } from '@pages/dashboard/hr-dashboard-card'
import colors from '@/constants/colors'

const DashboardPage: React.FC = () => {
  return (
    <ItemContainer padding="1rem" height="100%" backgroundColor={colors.gray.thirth}>
      <JustifyBetweenRow height="100%">
        <ItemContainer width="35%" height="100%" boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px">
          <ActivityTimelineCard />
        </ItemContainer>

        <ItemContainer width="30%" height="100%" margin="0 1rem" boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px">
          <ItemContainer width="100%" height="calc(100% - (100% - 2rem)/3 - 1rem)" margin="0 0 1rem 0">
            <ActiveTasksCard />
          </ItemContainer>

          <ItemContainer width="100%" height="calc((100% - 2rem)/3)">
            <FinanceDashboardCard />
          </ItemContainer>
        </ItemContainer>

        <ItemContainer width="35%" height="100%" boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px">
          <JustifyBetweenColumn height="100%">
            <ItemContainer width="100%" height="100%">
              <TaskDashboardCard />
            </ItemContainer>

            <ItemContainer width="100%" height="100%" margin="1rem 0" boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px">
              <HrDashboardCard />
            </ItemContainer>

            <ItemContainer width="100%" height="100%" boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px">
              <DashboardCard head={'test'}>incoming chart</DashboardCard>
            </ItemContainer>
          </JustifyBetweenColumn>
        </ItemContainer>
      </JustifyBetweenRow>
    </ItemContainer>
  )
}

export default DashboardPage
