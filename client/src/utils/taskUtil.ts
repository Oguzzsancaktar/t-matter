import { ITaskStep } from '@models/Entities/workflow/task/ICustomerTask'
import moment from 'moment'
import { TASK_CONDITIONS } from '@constants/task'

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

const filterCompletedTasks = (tasks: ITaskStep[]) => {
  return tasks.filter(task => task.steps.checklistItems.every(item => item.isChecked))
}

const filterNewTasks = (tasks: ITaskStep[]) => {
  return tasks.filter(task => task.steps.checklistItems.some(item => !item.isChecked))
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
  filterCompletedTasks,
  filterNewTasks
}
