import { ItemContainer, JustifyBetweenRow } from '@/components'
import colors from '@/constants/colors'
import React, { useEffect } from 'react'
import { ActiveTasksCard, ActivityTimelineCard } from '.'

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

        <ItemContainer width="35%" height="100%"></ItemContainer>
      </JustifyBetweenRow>
    </ItemContainer>
  )
}

export default DashboardPage
