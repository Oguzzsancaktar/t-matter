import { Checkbox } from '@/components/input'
import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenRow, Row } from '@/components/layout'
import { ITaskChecklist } from '@/models'
import { useGetCompanyPricingQuery } from '@/services/settings/company-planning/companyPricingService'
import { SummaryCardText, SummaryCardValue } from '@/shared'
import { secondsToHourMin } from '@/utils/timeUtils'
import { toastError } from '@/utils/toastUtil'
import React, { useState } from 'react'

interface IProps {
  checklistItem: ITaskChecklist
  disabled?: boolean
  onCheckboxClick: (checklistItem: ITaskChecklist) => void
}

const TaskChecklistItem: React.FC<IProps> = ({ checklistItem, disabled, onCheckboxClick }) => {
  const { data: companyPricingData, isLoading: isCompanyPricingDataLoading } = useGetCompanyPricingQuery()

  const handleOnCheckboxClick = (checklistItem: ITaskChecklist) => {
    if (!disabled) {
      onCheckboxClick(checklistItem)
    } else {
      toastError('You cant check checklist item right now!')
    }
  }

  return (
    <JustifyBetweenRow height="100%" onClick={() => handleOnCheckboxClick(checklistItem)} cursorType="pointer">
      <ItemContainer>
        <Row>
          <Checkbox isChecked={checklistItem.isChecked} onChange={(e: any) => console.log('checkbox changed', e)} />
          <SummaryCardText>{checklistItem?.name}</SummaryCardText>
        </Row>
      </ItemContainer>
      <ItemContainer width="auto" maxWidth="120px">
        <SummaryCardValue>{secondsToHourMin(checklistItem?.duration, true)}</SummaryCardValue>
      </ItemContainer>
    </JustifyBetweenRow>
  )
}

export default TaskChecklistItem
