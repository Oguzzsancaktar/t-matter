import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenColumn } from '@/components/layout'
import colors from '@/constants/colors'

import { ETaskStatus, ICustomerTask, ITaskChecklist, IUser } from '@/models'
import React, { useState } from 'react'
import styled from 'styled-components'
import { TaskChecklistCard, TaskDeadlineCard, TaskPostponeCard, TaskTimerCard, TaskUserCard } from '.'

interface IProps {
  taskData: ICustomerTask
  activeStep: number
  handleCheckboxClick: (checklistItem: ITaskChecklist, index: number) => void
  handleResponsibleChange: (responsible: IUser) => void
  handlePostponeChange: (value: Date[], dateText: string) => void
}

const InformationCard = styled(ItemContainer)`
  border-radius: 0.3rem;
  background: ${colors.white.secondary};
  padding: 1rem;
  margin: 1rem 0;

  &:not(:first-child) {
    margin-top: 0;
  }
`
const TaskInformations: React.FC<IProps> = ({
  taskData,
  activeStep,
  handleCheckboxClick,
  handleResponsibleChange,
  handlePostponeChange
}) => {
  console.log(taskData.steps[activeStep], activeStep)
  return (
    <ItemContainer height="100%">
      {taskData && taskData.steps[activeStep] ? (
        <JustifyBetweenColumn height="100%">
          <InformationCard height="100px">
            <TaskUserCard taskActiveStep={taskData.steps[activeStep]} onResponsibleChange={handleResponsibleChange} />
          </InformationCard>

          <InformationCard height="80px">
            <TaskDeadlineCard taskActiveStep={taskData.steps[activeStep]} />
          </InformationCard>

          <InformationCard height="80px">
            <TaskPostponeCard taskActiveStep={taskData.steps[activeStep]} onPostponeChange={handlePostponeChange} />
          </InformationCard>

          <InformationCard height="80px">
            <TaskTimerCard taskActiveStep={taskData.steps[activeStep]} />
          </InformationCard>

          <InformationCard height="calc(100% - 100px - 80px - 80px - 80px - 6rem)">
            <TaskChecklistCard
              handleCheckboxClick={handleCheckboxClick}
              checklistData={taskData.steps[activeStep]?.checklistItems}
            />
          </InformationCard>
        </JustifyBetweenColumn>
      ) : (
        <div>Loading</div>
      )}
    </ItemContainer>
  )
}

export default TaskInformations
