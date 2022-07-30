import { ItemContainer } from '@/components/item-container'
import { ProgressBar } from '@/components/progress-bar'
import { ETaskStatus, ITaskItem } from '@/models'
import React, { useEffect, useState } from 'react'

interface IProps {
  taskSteps: ITaskItem[]
}

const TaskProgress: React.FC<IProps> = ({ taskSteps }) => {
  const [stepStatuses, setStepStatuses] = useState({
    canceled: 0,
    completed: 0,
    notStarted: 0,
    progress: 0
  })

  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const stepStatuses = taskSteps.reduce(
      (acc, step) => {
        if (step.stepStatus === ETaskStatus.CANCELED) {
          acc.canceled++
        }
        if (step.stepStatus === ETaskStatus.COMPLETED) {
          acc.completed++
        }
        if (step.stepStatus === ETaskStatus.NOT_STARTED) {
          acc.notStarted++
        }
        if (step.stepStatus === ETaskStatus.PROGRESS) {
          acc.progress++
        }
        return acc
      },
      { canceled: 0, completed: 0, notStarted: 0, progress: 0 }
    )
    setStepStatuses(stepStatuses)
  }, [taskSteps])

  useEffect(() => {
    const activeStep = taskSteps.findIndex(step => step.stepStatus === ETaskStatus.PROGRESS)
    if (activeStep && activeStep !== -1) {
      setActiveStep(activeStep)
    }
  }, [taskSteps])

  return (
    <ItemContainer>
      <ProgressBar></ProgressBar>
    </ItemContainer>
  )
}

export default TaskProgress
