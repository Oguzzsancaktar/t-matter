import React from 'react'
import { JustifyBetweenColumn } from '../layout'
import WizzardNavigationItem from './WizzardNavigationItem'

interface IWizzardStep {
  stepName: string
}
interface IProps {
  steps: IWizzardStep[]
  activeStep: number
  onStepChange: (index: number) => void
}

const WizzardNavigation: React.FC<IProps> = ({ steps, activeStep, onStepChange }) => {
  return (
    <JustifyBetweenColumn height="100%">
      {steps.map((step, index) => (
        <WizzardNavigationItem
          stepName={step.stepName}
          stepIndex={index}
          isActive={activeStep === index}
          key={index}
          onClick={() => onStepChange(index)}
        />
      ))}
    </JustifyBetweenColumn>
  )
}

export default WizzardNavigation
