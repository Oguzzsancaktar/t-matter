import { ItemContainer, JustifyBetweenRow, Row } from '@/components'
import { SummaryCardText, SummaryCardValue } from '@/shared'
import React from 'react'

const SummaryChecklistItem = () => {
  return (
    <JustifyBetweenRow height="100%">
      <SummaryCardText>Checklist</SummaryCardText>
      <ItemContainer width="auto" maxWidth="120px">
        <Row>
          <ItemContainer margin="0 0.5rem 0 0" width="auto">
            <SummaryCardValue>Price</SummaryCardValue>
          </ItemContainer>
          <SummaryCardValue>Time</SummaryCardValue>
        </Row>
      </ItemContainer>
    </JustifyBetweenRow>
  )
}

export default SummaryChecklistItem
