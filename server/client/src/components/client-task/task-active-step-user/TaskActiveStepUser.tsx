import { ItemContainer } from '@/components/item-container'
import { ProgressBar } from '@/components/progress-bar'
import { ETaskStatus, ITaskItem } from '@/models'
import React, { useEffect, useState } from 'react'

interface IProps {
  taskSteps: ITaskItem[]
}

const TaskActiveStepUser: React.FC<IProps> = ({ taskSteps }) => {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const activeStep = taskSteps.findIndex(step => step.stepStatus === ETaskStatus.Progress)
    if (activeStep && activeStep !== -1) {
      setActiveStep(activeStep)
    }
  }, [taskSteps])

  return <ItemContainer>{taskSteps[activeStep].responsibleUser.firstname}</ItemContainer>
}

export default TaskActiveStepUser
