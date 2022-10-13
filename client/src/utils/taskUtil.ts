import { ITaskStep } from '@models/Entities/workflow/task/ICustomerTask'
import moment from 'moment'
import { TASK_CONDITIONS } from '@constants/task'
import { ETaskStatus } from '@/models'

const getTaskStepTotalWorkingTime = (taskStep: ITaskStep) => {
  if (!taskStep) return 0
  return taskStep.steps.workedTimes.reduce((acc, user) => {
    return acc + user.time
  }, 0)
}

const getTaskStepTotalTime = (taskStep: ITaskStep | undefined) => {
  if (!taskStep) return 0
  return taskStep.steps.checklistItems.reduce((acc, item) => {
    return acc + item.duration
  }, 0)
}

const isTimerCondition = (taskStep: ITaskStep | undefined) => {
  if (!taskStep) return false

  return getTaskStepTotalWorkingTime(taskStep) >= getTaskStepTotalTime(taskStep)
}

const isPostponeCondition = (taskStep: ITaskStep | undefined) => {
  if (!taskStep) return false

  return taskStep.steps.usedPostpone >= taskStep.steps.postponeTime
}

const isExpireCondition = (taskStep: ITaskStep | undefined) => {
  if (!taskStep) return false

  return moment().isAfter(moment(taskStep.steps.endDate))
}

const taskStepConditionSelector = (taskStep: ITaskStep) => {
  let count = 0
  if (isTimerCondition(taskStep)) {
    count++
  }
  if (isPostponeCondition(taskStep)) {
    count++
  }
  if (isExpireCondition(taskStep)) {
    count++
  }
  return count
}

const filterCompletedTaskSteps = (tasks: ITaskStep[] | undefined) => {
  if (!tasks) return []
  return tasks.filter(task => task.steps.checklistItems.every(item => item.isChecked))
}

const filterNewTaskSteps = (tasks: ITaskStep[] | undefined) => {
  if (!tasks) return []

  return tasks.filter(task => {
    return (
      task.steps.checklistItems.some(item => !item.isChecked) &&
      task.steps.stepStatus !== ETaskStatus.Canceled &&
      !tasks.find(t => t.stepIndex < task.stepIndex && t._id === task._id)
    )
  })
}

const filterCancelledTaskSteps = (tasks: ITaskStep[] | undefined) => {
  if (!tasks) return []

  return tasks?.filter(task => task.steps.stepStatus === ETaskStatus.Canceled)
}

const filterTransferTaskSteps = (tasks: ITaskStep[] | undefined, workingHours: number) => {
  if (!tasks) return []

  const tempTasks = [...tasks]
  const newTasks = filterNewTaskSteps(tempTasks)
  let totalWorkingHours = newTasks.reduce((acc, task) => {
    return acc + getTaskStepTotalTime(task)
  }, 0)
  totalWorkingHours = totalWorkingHours / 3600
  const rest = totalWorkingHours - workingHours

  if (rest > 0) {
    const result: ITaskStep[] = []
    let total = 0
    for (let i = 0; i < newTasks.length; i++) {
      const task = newTasks[i]
      const duration = getTaskStepTotalTime(task) / 3600

      if (duration + total <= rest) {
        total = total + duration
        result.push(task)
      }
    }
    return result
  }
  return []
}

const filterTaskStepsByCondition = (tasks: ITaskStep[] | undefined, conditionType: string): ITaskStep[] => {
  if (!tasks) return []

  if (conditionType === 'ALL') {
    return tasks
  }
  if (conditionType === TASK_CONDITIONS.EXPIRE) {
    return tasks?.filter(task => isExpireCondition(task))
  }
  if (conditionType === TASK_CONDITIONS.POSTPONE) {
    return tasks?.filter(task => isPostponeCondition(task))
  }
  if (conditionType === TASK_CONDITIONS.TIMER) {
    return tasks?.filter(task => isTimerCondition(task))
  }
  return []
}

const filterTaskStepsByWorkflowType = (tasksSteps: ITaskStep[] | undefined, workflowType: string): ITaskStep[] => {
  if (!tasksSteps) return []

  return tasksSteps.filter(task => task.workflow._id === workflowType || workflowType === 'ALL')
}

const filterTaskStepsByTaskCategory = (tasksSteps: ITaskStep[] | undefined, taskCategory: string): ITaskStep[] => {
  if (!tasksSteps) return []

  return tasksSteps.filter(task => task.steps.category._id === taskCategory || taskCategory === 'ALL')
}

export {
  isTimerCondition,
  isPostponeCondition,
  isExpireCondition,
  taskStepConditionSelector,
  filterTaskStepsByCondition,
  filterCompletedTaskSteps,
  filterNewTaskSteps,
  filterCancelledTaskSteps,
  filterTransferTaskSteps,
  getTaskStepTotalWorkingTime,
  getTaskStepTotalTime,
  filterTaskStepsByWorkflowType,
  filterTaskStepsByTaskCategory
}
