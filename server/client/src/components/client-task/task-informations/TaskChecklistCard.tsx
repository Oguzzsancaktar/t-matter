import { InfoCard } from '@/components/card'
import { ItemContainer } from '@/components/item-container'
import { Column, JustifyBetweenColumn, JustifyBetweenRow, Row } from '@/components/layout'
import { ITaskChecklist } from '@/models'
import { SummaryCardTitle } from '@/shared'
import React from 'react'
import styled from 'styled-components'
import TaskChecklistItem from './TaskChecklistItem'

interface IProps {
  checklistData: ITaskChecklist[]
  handleCheckboxClick: (checklistItem: ITaskChecklist) => void
}

const ChecklistList = styled.ul``

const TaskChecklistCard: React.FC<IProps> = ({ checklistData, handleCheckboxClick }) => {
  return (
    <ItemContainer height="100%">
      <ItemContainer>
        <JustifyBetweenColumn height="100%">
          <ItemContainer>
            <JustifyBetweenRow>
              <SummaryCardTitle>Checklist</SummaryCardTitle>
              <ItemContainer width="auto">
                <Row>
                  <ItemContainer margin="0 0.5rem 0 0" width="auto">
                    <SummaryCardTitle>Price</SummaryCardTitle>
                  </ItemContainer>
                  <SummaryCardTitle>Time</SummaryCardTitle>
                </Row>
              </ItemContainer>
            </JustifyBetweenRow>
          </ItemContainer>

          <ItemContainer>
            <ChecklistList>
              {checklistData?.map((item, index) => (
                <TaskChecklistItem key={index} checklistItem={item} onCheckboxClick={handleCheckboxClick} />
              ))}
            </ChecklistList>
          </ItemContainer>
        </JustifyBetweenColumn>
      </ItemContainer>
    </ItemContainer>
  )
}

export default TaskChecklistCard
