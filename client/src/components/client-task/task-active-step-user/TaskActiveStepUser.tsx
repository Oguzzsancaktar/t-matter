import { ItemContainer } from '@/components/item-container'
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

  return (
    <ItemContainer>
      {taskSteps[activeStep]?.responsibleUser?.firstname + ' ' + taskSteps[activeStep]?.responsibleUser?.lastname}
    </ItemContainer>
  )
}

export default TaskActiveStepUser
