import { ItemContainer } from '@/components/item-container'
import { Row } from '@/components/layout'
import { TaskEventSection, TaskInformations, TaskWizzardNavigation } from '@/components'
import React, { useState } from 'react'
import { ModalHeader } from '../types'
import colors from '@/constants/colors'
import { useGetTaskByTaskIdQuery } from '@/services/customers/taskService'

interface IProps {
  taskId: string
}
const CustomerTaskModal: React.FC<IProps> = ({ taskId }) => {
  const { data: taskData, isLoading: taskIsLoading } = useGetTaskByTaskIdQuery(taskId)
  const [activeStep, setActiveStep] = useState<number>(0)

  const handleStepChange = (step: number) => {
    setActiveStep(step)
  }

  return (
    <ItemContainer minHeight="750px">
      <ModalHeader>asdf</ModalHeader>
      <ItemContainer height="calc(100% - 52px)">
        {!taskIsLoading && taskData && (
          <Row height="100%">
            <ItemContainer width="auto" height="100%">
              <TaskWizzardNavigation activeStep={activeStep} taskData={taskData} onStepChange={handleStepChange} />
            </ItemContainer>

            <ItemContainer width="400px" height="100%" padding="0 2rem" backgroundColor={colors.white.primary}>
              <TaskInformations activeStep={activeStep} taskData={taskData} />
            </ItemContainer>

            <ItemContainer
              width="calc(100% - 400px)"
              height="100%"
              padding="0 2rem"
              backgroundColor={colors.white.secondary}
            >
              <TaskEventSection />
            </ItemContainer>
          </Row>
        )}
      </ItemContainer>
    </ItemContainer>
  )
}

export default CustomerTaskModal
