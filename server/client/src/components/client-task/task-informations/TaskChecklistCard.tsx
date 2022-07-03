import { InfoCard } from '@/components/card'
import { ItemContainer } from '@/components/item-container'
import { Column, JustifyBetweenColumn, JustifyBetweenRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import { ITaskChecklist } from '@/models'
import SummaryChecklistItem from '@/pages/Settings/workflow-planning/plan/SummaryChecklistItem'
import { SummaryCardTitle } from '@/shared'
import React from 'react'
import styled from 'styled-components'


interface IProps {
  checklistData: Pick<ITaskChecklist, '_id'>[]
}

const ChecklistList = styled.ul``

const TaskChecklistCard: React.FC<IProps> = ({ checklistData }) => {
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
              {checklistData.map((item, index) => (
                <SummaryChecklistItem key={index} checklistItem={item} />
              ))}
            </ChecklistList>
          </ItemContainer>
        </JustifyBetweenColumn>
      </ItemContainer>
    </ItemContainer>
  )
}

export default TaskChecklistCard
