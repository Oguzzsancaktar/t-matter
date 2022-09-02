import React from 'react'
import { Column, H1, ItemContainer, JustifyBetweenRow, ProgressBar, Row, UserImage } from '@/components'
import colors from '@/constants/colors'

const TaskTrackingProgress = () => {
  return (
    <ItemContainer borderRadius="0.3rem">
      <JustifyBetweenRow>
        <ItemContainer height="30px" width="30px" margin=" 0 0.5rem 0 0">
          <UserImage />
        </ItemContainer>
        <Column>
          <ItemContainer>
            <JustifyBetweenRow>
              <Row>
                <H1 width="auto" color={colors.text.primary}>
                  Task Name
                </H1>
              </Row>
              {/* <ItemContainer width="40px">
                <H1>1/4</H1>
              </ItemContainer> */}
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
