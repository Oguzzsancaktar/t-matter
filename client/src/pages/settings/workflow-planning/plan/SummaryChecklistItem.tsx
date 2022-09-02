import { ItemContainer, JustifyBetweenRow, Row } from '@/components'
import { ITaskChecklist } from '@/models'
import { useGetChecklistByIdQuery } from '@/services/settings/workflow-planning/workflowService'
import { SummaryCardText, SummaryCardValue } from '@/shared'
import { secondsToHourMin } from '@/utils/timeUtils'
import React from 'react'

interface IProps {
  checklistItem: Pick<ITaskChecklist, '_id'>
}
const SummaryChecklistItem: React.FC<IProps> = ({ checklistItem }) => {
  const {
    data: checklistDetailData,
    isLoading: checklistDetailDataIsLoading,
    isError: checklistDetailDataIsError
  } = useGetChecklistByIdQuery(checklistItem._id)

  return (
    <>
      {!checklistDetailDataIsLoading && !checklistDetailDataIsError && checklistDetailData ? (
        <JustifyBetweenRow height="100%">
          <SummaryCardText>{checklistDetailData?.name}</SummaryCardText>
          <ItemContainer width="auto" maxWidth="120px">
            <Row>
              <ItemContainer margin="0 0.5rem 0 0" width="auto">
                <SummaryCardValue>{checklistDetailData?.price?.toFixed(2)}$</SummaryCardValue>
              </ItemContainer>
              <SummaryCardValue>{secondsToHourMin(checklistDetailData?.duration, true)}</SummaryCardValue>
            </Row>
          </ItemContainer>
        </JustifyBetweenRow>
      ) : (
        <div>Loading....</div>
      )}
    </>
  )
}

export default SummaryChecklistItem
