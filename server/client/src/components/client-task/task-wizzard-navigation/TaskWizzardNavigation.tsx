import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenColumn } from '@/components/layout'
import { TabIndex } from '@/components/tab'
import colors from '@/constants/colors'
import React from 'react'

interface IProps {
  workflowData: any
  activeStep: number
  onStepChange: (step: number) => void
}
const TaskWizzardNavigation: React.FC<IProps> = ({ workflowData, activeStep, onStepChange }) => {
  return (
    <ItemContainer height="100%" backgroundColor={colors.white.secondary} padding="1rem">
      <JustifyBetweenColumn height="100%">
        {workflowData.map((task, index) => (
          <ItemContainer key={index} onClick={() => onStepChange(index)} cursorType="pointer">
            <TabIndex index={index} isActive={activeStep === index} />
          </ItemContainer>
        ))}
      </JustifyBetweenColumn>
    </ItemContainer>
  )
}

export default TaskWizzardNavigation
