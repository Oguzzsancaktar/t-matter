import React, { useState } from 'react'
import { JustifyBetweenColumn } from '../layout'
import WizzardNavigationItem from './WizzardNavigationItem'

interface IWizzardStep {
  stepName: string
}
interface IProps {
  steps: IWizzardStep[]
  currentIndex: number
}

const WizzardNavigation: React.FC<IProps> = ({ steps }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <JustifyBetweenColumn>
      {steps.map((step, index) => (
        <WizzardNavigationItem stepName={step.stepName} stepIndex={index} isActive={activeIndex === index} />
      ))}
    </JustifyBetweenColumn>
  )
}

export default WizzardNavigation
