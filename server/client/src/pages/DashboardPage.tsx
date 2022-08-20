import { ItemContainer, JustifyBetweenColumn, JustifyBetweenRow } from '@/components'
import colors from '@/constants/colors'
import React from 'react'
import { ActiveTasksCard, ActivityTimelineCard, DashboardCard } from '.'

const DashboardPage: React.FC = () => {
  return (
    <ItemContainer padding="1rem" height="100%" backgroundColor={colors.white.primary}>
      <JustifyBetweenRow height="100%">
        <ItemContainer width="35%" height="100%">
          <ActivityTimelineCard />
        </ItemContainer>

        <ItemContainer width="30%" height="100%" margin="0 1rem">
          <ActiveTasksCard />
        </ItemContainer>

        <ItemContainer width="35%" height="100%">
          <JustifyBetweenColumn height="100%">
            <ItemContainer width="100%" height="100%">
              <DashboardCard head={'test'}>incoming chart</DashboardCard>
            </ItemContainer>

            <ItemContainer width="100%" height="100%" margin="1rem 0">
              <DashboardCard head={'test'}>incoming chart</DashboardCard>
            </ItemContainer>

            <ItemContainer width="100%" height="100%">
              <DashboardCard head={'test'}>incoming chart</DashboardCard>
            </ItemContainer>
          </JustifyBetweenColumn>
        </ItemContainer>
      </JustifyBetweenRow>
    </ItemContainer>
  )
}

export default DashboardPage
