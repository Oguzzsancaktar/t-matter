import { ItemContainer } from '@/components/item-container'
import { ProgressBar } from '@/components/progress-bar'
import colors from '@/constants/colors'
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
        if (step.stepStatus === ETaskStatus.Canceled) {
          acc.canceled++
        }
        if (step.stepStatus === ETaskStatus.Completed) {
          acc.completed++
        }
        if (step.stepStatus === ETaskStatus.Not_Started) {
          acc.notStarted++
        }
        if (step.stepStatus === ETaskStatus.Progress) {
          acc.progress++
        }
        return acc
      },
      { canceled: 0, completed: 0, notStarted: 0, progress: 0 }
    )
    setStepStatuses(stepStatuses)
  }, [taskSteps])

  useEffect(() => {
    const activeStep = taskSteps.findIndex(step => step.stepStatus === ETaskStatus.Progress)
    if (activeStep && activeStep !== -1) {
      setActiveStep(activeStep)
    }
  }, [taskSteps])

  return (
    <ItemContainer>
      <ProgressBar completionPercentage={0} completionColor={colors.blue.primary}></ProgressBar>
    </ItemContainer>
  )
}

export default TaskProgress
