import React from 'react'
import { Column, H1, ItemContainer, JustifyBetweenRow, ProgressBar, Row, TaskProgress, UserImage } from '@/components'
import colors from '@/constants/colors'

const TaskTrackingProgress = () => {
  return (
    <ItemContainer backgroundColor={colors.blue.primary + '40'} padding="0.5rem" borderRadius="0.3rem">
      <JustifyBetweenRow>
        <ItemContainer height="30px" width="30px" margin=" 0 0.5rem 0 0">
          <UserImage />
        </ItemContainer>
        <Column>
          <ItemContainer>
            <JustifyBetweenRow>
              <Row>
                <H1 width="auto">Task Name</H1>
              </Row>
              <ItemContainer width="40px">
                <H1>1/4</H1>
              </ItemContainer>
            </JustifyBetweenRow>
          </ItemContainer>
          <ItemContainer>
            <ProgressBar completionPercentage={0} completionColor={colors.blue.primary} />
          </ItemContainer>
        </Column>
      </JustifyBetweenRow>
    </ItemContainer>
  )
}

export default TaskTrackingProgress
