import React from 'react'
import { JustifyBetweenRow } from '@/components/layout'
import { Button, ItemContainer } from '@/components'

interface IWizzardStep {
  stepName: string
}

interface IProps {
  steps: IWizzardStep[]
  activeStep: number
  actionNext?: () => void
  actionPrevious?: () => void
  actionSubmit?: () => void
}

const WizzardButtons: React.FC<IProps> = ({ steps, activeStep, actionNext, actionPrevious, actionSubmit }) => {
  const firstStep = 0
  const lastStep = steps.length - 1

  return (
    <JustifyBetweenRow>
      {!(firstStep === activeStep) && (
        <ItemContainer width="calc((100% - 1rem)/2)">
          <Button onClick={actionPrevious}>Previous</Button>
        </ItemContainer>
      )}
      {!(lastStep === activeStep) ? (
        <ItemContainer width={firstStep === activeStep ? '100%' : 'calc((100% - 1rem)/2)'}>
          <Button onClick={actionNext}>Next</Button>
        </ItemContainer>
      ) : (
        <ItemContainer width="calc((100% - 1rem)/2)">
          <Button onClick={actionSubmit}>Save</Button>
        </ItemContainer>
      )}
    </JustifyBetweenRow>
  )
}

export default WizzardButtons
