import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenRow } from '@/components/layout'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import { ITaskCreateDTO } from '@/models'
import { useGetCompanyPricingQuery } from '@/services/settings/company-planning/companyPricingService'
import { secondsToHourMin } from '@/utils/timeUtils'
import React, { useMemo } from 'react'
import styled from 'styled-components'

interface IProps {
  step: ITaskCreateDTO
  index: number
}
const IndexBox = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${colors.secondary.middle};
  border-radius: 0.3rem;
  color: ${colors.white.secondary};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`
const ReadWorkflowPlanAccordeonHeader: React.FC<IProps> = ({ step, index }) => {
  const { data: companyPricingData } = useGetCompanyPricingQuery()

  const stepTotalDuration = useMemo(
    () => step.checklistItems.reduce((previousValue, currentValue) => previousValue + currentValue.duration, 0),
    [step.checklistItems]
  )

  return (
    <ItemContainer>
      <JustifyBetweenRow>
        <ItemContainer width="40px" margin="0 0.5rem">
          <IndexBox>{index}</IndexBox>
        </ItemContainer>
        <ItemContainer>
          <H1 cursor="pointer" color={colors.text.primary}>
            {step.responsibleUser.firstname + ' ' + step.responsibleUser.lastname}
          </H1>
        </ItemContainer>
        <ItemContainer>
          <H1 cursor="pointer" color={colors.text.primary}>
            {step.category.name}
          </H1>
        </ItemContainer>

        <ItemContainer width="120px" margin="0 0.5rem">
          <H1 cursor="pointer" color={colors.text.primary}>
            {' '}
            {secondsToHourMin(stepTotalDuration, true)}
          </H1>
        </ItemContainer>
        <ItemContainer width="100px" margin="0 0.5rem">
          <H1 cursor="pointer" color={colors.text.primary}>
            ${((stepTotalDuration / 60 / 60) * (companyPricingData?.summary.hourlyCompanyFee || -1)).toFixed(2)}
          </H1>
        </ItemContainer>
      </JustifyBetweenRow>
    </ItemContainer>
  )
}

export default ReadWorkflowPlanAccordeonHeader
