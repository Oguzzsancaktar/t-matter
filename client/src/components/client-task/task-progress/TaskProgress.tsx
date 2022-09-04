import { ItemContainer } from '@/components/item-container'
import { ProgressBar } from '@/components/progress-bar'
import { ETaskStatus, ITaskItem } from '@/models'
import { selectColorForTaskStatus } from '@/utils/statusColorUtil'
import React, { useEffect, useState } from 'react'

interface IProps {
  workflowName: string
  taskSteps: ITaskItem[]
  taskStatus: ETaskStatus
}

const TaskProgress: React.FC<IProps> = ({ taskStatus, taskSteps, workflowName }) => {
  const [stepStatuses, setStepStatuses] = useState({
    canceled: 0,
    completed: 0,
    notStarted: 0,
    progress: 0
  })

  const percentage = ((stepStatuses.completed + stepStatuses.canceled + stepStatuses.progress) / taskSteps.length) * 100

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
        reverse={true}
        startLabel={workflowName}
        completionPercentage={percentage}
        completionColor={selectColorForTaskStatus(taskStatus)}
      ></ProgressBar>
    </ItemContainer>
  )
}

export default TaskProgress
