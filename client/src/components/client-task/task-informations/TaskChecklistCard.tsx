import { InfoCard } from '@/components/card'
import { ItemContainer } from '@/components/item-container'
import { Column, JustifyBetweenColumn, JustifyBetweenRow, Row } from '@/components/layout'
import { useAuth } from '@/hooks/useAuth'
import { ETaskStatus, ITaskChecklist, ITaskItem } from '@/models'
import { SummaryCardTitle } from '@/shared'
import React from 'react'
import styled from 'styled-components'
import TaskChecklistItem from './TaskChecklistItem'

interface IProps {
  checklistData: ITaskChecklist[]
  taskActiveStep: ITaskItem
  handleCheckboxClick: (checklistItem: ITaskChecklist, index: number) => void
}

const ChecklistList = styled.ul``

const TaskChecklistCard: React.FC<IProps> = ({ checklistData, taskActiveStep, handleCheckboxClick }) => {
  const { loggedUser } = useAuth()

  const isResponsibleUserCurrentLoggedUser = taskActiveStep.responsibleUser._id === loggedUser.user?._id
  const isStepStatusProcess: boolean = taskActiveStep.stepStatus === ETaskStatus['Progress']
  const canChecklistCheck: boolean = isStepStatusProcess && isResponsibleUserCurrentLoggedUser

  const handleOnCheckboxClick = (checklistItem: ITaskChecklist, index: number) => {
    handleCheckboxClick(checklistItem, index)
  }

  return (
    <ItemContainer height="100%">
      <ItemContainer>
        <JustifyBetweenColumn height="100%">
          <ItemContainer>
            <JustifyBetweenRow>
              <SummaryCardTitle>Checklist</SummaryCardTitle>
              <ItemContainer width="auto">
                <Row>
                  <SummaryCardTitle>Time</SummaryCardTitle>
                </Row>
              </ItemContainer>
            </JustifyBetweenRow>
          </ItemContainer>

          <ItemContainer>
            <ChecklistList>
              {checklistData?.map((item, index) => (
                <TaskChecklistItem
                  disabled={!canChecklistCheck}
                  key={index}
                  checklistItem={item}
                  onCheckboxClick={item => handleOnCheckboxClick(item, index)}
                />
              ))}
            </ChecklistList>
          </ItemContainer>
        </JustifyBetweenColumn>
      </ItemContainer>
    </ItemContainer>
  )
}

export default TaskChecklistCard
