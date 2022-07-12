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
  console.log('1234', checklistDetailData)
  return (
    <>
      {!checklistDetailDataIsLoading && !checklistDetailDataIsError && checklistDetailData ? (
        <JustifyBetweenRow height="100%">
          <SummaryCardText>{checklistDetailData?.name}</SummaryCardText>
          <ItemContainer width="auto" maxWidth="120px">
            <Row>
              <ItemContainer margin="0 0.5rem 0 0" width="auto">
<<<<<<< HEAD:server/client/src/pages/Settings/workflow-planning/plan/SummaryChecklistItem.tsx
                <SummaryCardValue>{checklistDetailData?.price?.toFixed(2)}$</SummaryCardValue>
=======
                <SummaryCardValue>{(checklistDetailData?.price || 0).toFixed(2)}$</SummaryCardValue>
>>>>>>> 7cd80850ffae2035d8c9e23f626efaaef2bbc009:server/client/src/pages/settings/workflow-planning/plan/SummaryChecklistItem.tsx
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
