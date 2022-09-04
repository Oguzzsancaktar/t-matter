import React, { useEffect } from 'react'
import { Column, JustifyBetweenRow } from '@components/layout'
import styled from 'styled-components'
import colors from '@constants/colors'
import { Button } from '@/components'
import { ITaskChecklist } from '@/models'
import { useGetChecklistsQuery } from '@/services/settings/workflow-planning/workflowService'
import { secondsToHourMin } from '@/utils/timeUtils'
import { emptyQueryParams } from '@/constants/queryParams'

const Text = styled.h3`
  font-size: 0.8rem;
`
const Value = styled.h3`
  font-size: 0.8rem;
  width: 80px;
  text-align: center;
  border-left: 1px solid ${colors.blue.primary};
`

interface IProps {
  checklistIdArr: Pick<ITaskChecklist, '_id'>[]
}

const WorkflowPlanSummaryFooter: React.FC<IProps> = ({ checklistIdArr }) => {
  const { data: checklistsData, isLoading: isChecklistsLoading } = useGetChecklistsQuery(emptyQueryParams)

  const calculateStepTotals = () => {
    let totalDuration = 0
    let totalPrice = 0

    if (checklistsData) {
      checklistIdArr.forEach(({ _id }) => {
        const checklistDetail = checklistsData.find(checklist => checklist._id === _id)
        if (checklistDetail) {
          totalDuration += checklistDetail?.duration
          totalPrice += checklistDetail?.price
        }
      })
    }

    return {
      totalDuration,
      totalPrice
    }
  }

  return (
    <JustifyBetweenRow>
      <Text>Totals</Text>
      <Value>${calculateStepTotals().totalPrice.toFixed(2)}</Value>
      <Value>{secondsToHourMin(calculateStepTotals().totalDuration, true)}</Value>
    </JustifyBetweenRow>
  )
}

export default WorkflowPlanSummaryFooter
