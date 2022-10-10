import { ITaskStep } from '@models/Entities/workflow/task/ICustomerTask'
import moment from 'moment'
import { TASK_CONDITIONS } from '@constants/task'
import { EStatus, ETaskStatus } from '@/models'

const isTimerCondition = (taskStep: ITaskStep) => {
  const totalUsedTime = taskStep.steps.workedTimes.reduce((acc, user) => {
    return acc + user.time
  }, 0)

  return (
    totalUsedTime >=
    taskStep.steps.checklistItems.reduce((acc, item) => {
      return acc + item.duration
    }, 0)
  )
}

const isPostponeCondition = (taskStep: ITaskStep) => {
  return taskStep.steps.usedPostpone >= taskStep.steps.postponeTime
}

const isExpireCondition = (taskStep: ITaskStep) => {
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

const filterCompletedTaskSteps = (tasks: ITaskStep[]) => {
  return tasks.filter(task => task.steps.checklistItems.every(item => item.isChecked))
}

const filterNewTaskSteps = (tasks: ITaskStep[]) => {
  return tasks.filter(
    task => task.steps.checklistItems.some(item => !item.isChecked) && task.steps.stepStatus !== ETaskStatus.Canceled
  )
}

const filterCancelledTaskSteps = (tasks: ITaskStep[]) => {
  return tasks.filter(task => task.steps.stepStatus === ETaskStatus.Canceled)
}

const filterTransferTaskSteps = (tasks: ITaskStep[], workingHours: number) => {
  const tempTasks = [...tasks]
  let totalWorkingHours = filterNewTaskSteps(tempTasks).reduce((acc, task) => {
    return acc + task.steps.checklistItems.reduce((acc, item) => acc + item.duration, 0)
  }, 0)
  totalWorkingHours = totalWorkingHours / 3600
  console.log(totalWorkingHours)
  const rest = totalWorkingHours - workingHours
  if (rest > 0) {
    const result: ITaskStep[] = []
    let total = 0
    for (let i = 0; i < tempTasks.length; i++) {
      const task = tempTasks[i]
      const duration = task.steps.checklistItems.reduce((acc, item) => acc + item.duration, 0) / 3600
      if (duration + total <= rest) {
        total += duration
        result.push(task)
      }
    }
    return result
  }
  return tempTasks
}

const filterTaskStepsByCondition = (tasks: ITaskStep[], conditionType: string): ITaskStep[] => {
  if (conditionType === 'ALL') {
    return tasks
  }
  if (conditionType === TASK_CONDITIONS.EXPIRE) {
    return tasks.filter(task => isExpireCondition(task))
  }
  if (conditionType === TASK_CONDITIONS.POSTPONE) {
    return tasks.filter(task => isPostponeCondition(task))
  }
  if (conditionType === TASK_CONDITIONS.TIMER) {
    return tasks.filter(task => isTimerCondition(task))
  }
  return []
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
  filterTransferTaskSteps
}
