import React from 'react'
import { JustifyBetweenColumn, JustifyBetweenRow, Row } from '@components/layout'
import { ItemContainer } from '@/components'
import { SummaryCardTitle } from '@/shared'
import styled from 'styled-components'
import SummaryChecklistItem from './SummaryChecklistItem'

interface IProps {}

const tempArr = ['Checklist', 'Price', 'Time']

const ChecklistList = styled.ul``
const WorkflowPlanSummaryBody: React.FC<IProps> = ({}) => {
  return (
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
            {tempArr.map((item, index) => (
              <SummaryChecklistItem key={index} />
            ))}
          </ChecklistList>
        </ItemContainer>
      </JustifyBetweenColumn>
    </ItemContainer>
  )
}

export default WorkflowPlanSummaryBody
