import { Checkbox } from '@/components/input'
import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenRow, Row } from '@/components/layout'
import { ITaskChecklist } from '@/models'
import { useGetCompanyPricingQuery } from '@/services/settings/company-planning/companyPricingService'
import { SummaryCardText, SummaryCardValue } from '@/shared'
import { secondsToHourMin } from '@/utils/timeUtils'
import React, { useState } from 'react'

interface IProps {
  checklistItem: ITaskChecklist
  onCheckboxClick: (checklistItem: ITaskChecklist) => void
}

const TaskChecklistItem: React.FC<IProps> = ({ checklistItem, onCheckboxClick }) => {
  const { data: companyPricingData, isLoading: isCompanyPricingDataLoading } = useGetCompanyPricingQuery()

  return (
    <JustifyBetweenRow height="100%" onClick={() => onCheckboxClick(checklistItem)} cursorType="pointer">
      <ItemContainer>
        <Row>
          <Checkbox isChecked={checklistItem.isChecked} onChange={(e: any) => console.log('checkbox changed', e)} />
          <SummaryCardText>{checklistItem?.name}</SummaryCardText>
        </Row>
      </ItemContainer>
      <ItemContainer width="auto" maxWidth="120px">
        <Row>
          <ItemContainer margin="0 0.5rem 0 0" width="auto">
            <SummaryCardValue>
              {((checklistItem.duration / 60 / 60) * (companyPricingData?.summary.hourlyCompanyFee || -1)).toFixed(2)}$
            </SummaryCardValue>
          </ItemContainer>
          <SummaryCardValue>{secondsToHourMin(checklistItem?.duration, true)}</SummaryCardValue>
        </Row>
      </ItemContainer>
    </JustifyBetweenRow>
  )
}

export default TaskChecklistItem
