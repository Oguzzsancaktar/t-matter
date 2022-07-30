import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenColumn } from '@/components/layout'
import colors from '@/constants/colors'
import { ICustomerTask } from '@/models'
import React from 'react'
import styled from 'styled-components'
import { workerData } from 'worker_threads'
import { TaskChecklistCard, TaskDeadlineCard, TaskPostponeCard, TaskTimerCard, TaskUserCard } from '.'

interface IProps {
  taskData: ICustomerTask
  activeStep: number
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
const TaskInformations: React.FC<IProps> = ({ taskData, activeStep }) => {
  return (
    <ItemContainer height="100%">
      <JustifyBetweenColumn height="100%">
        <InformationCard height="100px">
          <TaskUserCard />
        </InformationCard>

        <InformationCard height="80px">
          <TaskDeadlineCard />
        </InformationCard>

        <InformationCard height="80px">
          <TaskPostponeCard />
        </InformationCard>

        <InformationCard height="80px">
          <TaskTimerCard />
        </InformationCard>

        <InformationCard height="calc(100% - 100px - 80px - 80px - 80px - 6rem)">
          <TaskChecklistCard checklistData={taskData[activeStep].checklistItems} />
        </InformationCard>
      </JustifyBetweenColumn>
    </ItemContainer>
  )
}

export default TaskInformations
