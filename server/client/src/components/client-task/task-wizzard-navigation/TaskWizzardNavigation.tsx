import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenColumn } from '@/components/layout'
import { TabIndex } from '@/components/tab'
import colors from '@/constants/colors'
import { ICustomerTask } from '@/models'
import React from 'react'

interface IProps {
  taskData: ICustomerTask
  activeStep: number
  onStepChange: (step: number) => void
}
const TaskWizzardNavigation: React.FC<IProps> = ({ taskData, activeStep, onStepChange }) => {
  return (
    <ItemContainer height="100%" backgroundColor={colors.white.secondary} padding="1rem">
      <JustifyBetweenColumn height="100%">
        {taskData.steps.map((task, index) => (
          <ItemContainer key={index} onClick={() => onStepChange(index)} cursorType="pointer">
            <TabIndex index={index} isActive={activeStep === index} />
          </ItemContainer>
        ))}
      </JustifyBetweenColumn>
    </ItemContainer>
  )
}

export default TaskWizzardNavigation
