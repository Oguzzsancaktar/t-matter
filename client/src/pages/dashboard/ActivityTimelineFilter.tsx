import { ItemContainer, JustifyBetweenRow, UserImage } from '@/components'
import React from 'react'

const ActivityTimelineFilter = () => {
  return (
    <ItemContainer>
      <JustifyBetweenRow>
        <ItemContainer>
          <UserImage />
        </ItemContainer>
        <ItemContainer></ItemContainer>
      </JustifyBetweenRow>
    </ItemContainer>
  )
}

export default ActivityTimelineFilter
