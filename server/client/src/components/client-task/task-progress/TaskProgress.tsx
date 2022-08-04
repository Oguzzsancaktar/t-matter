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

  const percentage = ((stepStatuses.completed + stepStatuses.canceled) / taskSteps.length) * 100

  useEffect(() => {
    const stepStatusesR = taskSteps.reduce(
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
    setStepStatuses(stepStatusesR)
  }, [taskSteps])

  return (
    <ItemContainer>
      <ProgressBar
        completionPercentage={percentage}
        completionColor={
          stepStatuses.canceled !== 0
            ? colors.red.primary
            : percentage === 100
            ? colors.green.primary
            : colors.blue.primary
        }
      ></ProgressBar>
    </ItemContainer>
  )
}

export default TaskProgress
