import { TaskWizzardNavigation } from '@components/client-task'
import { ItemContainer } from '@/components/item-container'
import { Row } from '@/components/layout'
import colors from '@/constants/colors'
import useAccessStore from '@/hooks/useAccessStore'
import { useAuth } from '@/hooks/useAuth'
import {
  ICustomer,
  ICustomerTask,
  ETaskStatus,
  EActivity,
  IUser,
  ITaskChecklist,
  ITaskUserWorkTime,
  ESize
} from '@/models'
import { useCreateActivityMutation, activityApi } from '@/services/activityService'
import { useUpdateTaskMutation, useGetTaskByTaskIdQuery, taskApi } from '@/services/customers/taskService'
import { useCreateExpiredTaskStepMutation } from '@/services/settings/finance-planning/financePlanningService'
import { closeModal, openModal, setModalOnClose } from '@/store'
import React, { useCallback, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { ModalBody } from '../types'
import TaskInformations from '@/components/client-task/task-informations/TaskInformations'
import TaskEventSection from '@/components/client-task/task-informations/TaskEventSection'
import { NoteEditorModal, SpeechModal } from '@/components'
import useSound from 'use-sound'
import { CUSTOMER_ACTIVITY_TYPES } from '@/constants/customerActivityTypes'
import { useCreateCustomerActivityMutation } from '@/services/customers/customerActivityService'
import moment from 'moment'

interface IProps {
  taskId: string
  customer: ICustomer
  customerId?: ICustomer['_id']
}

const CustomerTaskModal: React.FC<IProps> = ({ taskId, customerId, customer }) => {
  const { loggedUser } = useAuth()
  const [updateTask] = useUpdateTaskMutation()
  const [checkPlay] = useSound('sounds/check-play.wav')
  const [cancelPlay] = useSound('sounds/task-cancel.wav')

  const [createCustomerActivity] = useCreateCustomerActivityMutation()

  const [createActivity] = useCreateActivityMutation()
  const { data: taskData, isLoading: taskIsLoading } = useGetTaskByTaskIdQuery(taskId)
  const [createExpiredTaskStep] = useCreateExpiredTaskStepMutation()
  const [activeStep, setActiveStep] = useState<number>(0)
  const [updatedTaskData, setUpdatedTaskData] = useState<ICustomerTask>()
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [taskNoteFilterUserId, setTaskNoteFilterUserId] = useState('')
  const { useAppSelector } = useAccessStore()
  const socket = useAppSelector(state => state.socketGlobal.socket)

  const handleResetActivityUserFilter = () => {
    setTaskNoteFilterUserId('')
  }

  const [isTaskNotStarted, setIsTaskNotStarted] = useState(
    updatedTaskData?.steps.filter(step => step.stepStatus === ETaskStatus.Not_Started).length ===
      updatedTaskData?.steps.length
  )

  const updateTaskData = useCallback(async () => {
    if (updatedTaskData) {
      updateTask(updatedTaskData)
      taskApi.util.resetApiState()
    }
  }, [updatedTaskData])

  const handleUserWorkClick = (userId: string) => {
    setTaskNoteFilterUserId(userId)
  }

  const handleTaskTimerChange = (userWorkTime: ITaskUserWorkTime) => {
    const tempUpdatedTaskData: ICustomerTask = JSON.parse(JSON.stringify(updatedTaskData))
    const activeTaskStep = tempUpdatedTaskData.steps[activeStep]
    const { user: worker } = userWorkTime

    const workArr = tempUpdatedTaskData.steps[activeStep].workedTimes

    const existingUser = activeTaskStep.workedTimes.find(work => work.user._id === worker._id)

    if (existingUser) {
      const updatedWork: ITaskUserWorkTime = { time: existingUser.time + userWorkTime.time, user: existingUser.user }
      const otherWorks = workArr.filter(work => work.user._id !== existingUser.user._id)
      tempUpdatedTaskData.steps[activeStep].workedTimes = [...otherWorks, updatedWork]
    } else {
      tempUpdatedTaskData.steps[activeStep].workedTimes = [...workArr, userWorkTime]
    }

    setUpdatedTaskData(tempUpdatedTaskData)
  }

  const handleConfirmCancelTask = async (timerVal, noteContent) => {
    dispatch(closeModal(`SpeechModal-cancel-${taskData?._id}`))

    const tempUpdatedTaskData: ICustomerTask = JSON.parse(JSON.stringify(updatedTaskData))

    tempUpdatedTaskData.status = ETaskStatus.Canceled
    tempUpdatedTaskData.steps[activeStep].stepStatus = ETaskStatus.Canceled
    cancelPlay()

    await updateTask(tempUpdatedTaskData)

    await createActivity({
      title: 'Task Canceled',

      content: noteContent,
      usedTime: timerVal,
      customer: tempUpdatedTaskData.customer._id,
      stepCategory: tempUpdatedTaskData.steps[activeStep].category._id,
      task: tempUpdatedTaskData._id,
      owner: loggedUser.user?._id || '',
      step: activeStep,
      type: EActivity.TASK_CANCELED
    })
    dispatch(activityApi.util.resetApiState())
    setUpdatedTaskData({ ...tempUpdatedTaskData })
  }

  const handleCancelTask = () => {
    dispatch(
      openModal({
        id: `SpeechModal-cancel-${updatedTaskData?._id}`,
        title: 'Cancel Note',
        body: (
          <SpeechModal
            id={`SpeechModal-cancel-${updatedTaskData?._id}`}
            headerText={`Cancel Note ( ${customer.firstname + ' ' + customer.lastname} / ${updatedTaskData?.name} )`}
            cb={handleConfirmCancelTask}
          />
        ),
        height: ESize.HSmall,
        width: ESize.WSmall,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleStepChange = (step: number) => {
    socket?.emit('taskStepChange', { taskId, activeTaskStep: step })
    setActiveStep(step)
  }

  const handleConfirmPostponeChange = async (timerVal, noteContent, dateText: string) => {
    dispatch(closeModal(`SpeechModal-postpone-${taskData?._id}`))

    const tempUpdatedTaskData: ICustomerTask = JSON.parse(JSON.stringify(updatedTaskData))

    tempUpdatedTaskData.steps[activeStep].usedPostpone = +tempUpdatedTaskData.steps[activeStep].usedPostpone + 1
    tempUpdatedTaskData.steps[activeStep].postponedDate = moment(dateText).valueOf()

    await updateTask(tempUpdatedTaskData)
    await createActivity({
      title: 'Task Postponed',
      content: noteContent,
      usedTime: timerVal,
      stepCategory: tempUpdatedTaskData.steps[activeStep].category._id,
      customer: tempUpdatedTaskData.customer._id,
      task: tempUpdatedTaskData._id,
      owner: loggedUser.user?._id || '',
      step: activeStep,
      type: EActivity.TASK_POSTPONED
    })
    dispatch(activityApi.util.resetApiState())

    setUpdatedTaskData({ ...tempUpdatedTaskData })
  }

  const handlePostponeChange = async (value: Date[], dateText: string) => {
    if (
      (updatedTaskData?.steps[activeStep].usedPostpone || 0) >= (updatedTaskData?.steps[activeStep].postponeLimit || 0)
    ) {
      dispatch(
        openModal({
          id: `SpeechModal-postpone-${updatedTaskData?._id}`,
          title: 'Postpone Note',
          body: (
            <SpeechModal
              id={`SpeechModal-postpone-${updatedTaskData?._id}`}
              headerText={`Responsible Note ( ${customer.firstname + ' ' + customer.lastname} / ${
                updatedTaskData?.name
              } )`}
              cb={(timerVal, noteContent) => handleConfirmPostponeChange(timerVal, noteContent, dateText)}
            />
          ),
          height: ESize.HSmall,
          width: ESize.WSmall,
          maxWidth: ESize.WSmall
        })
      )
    } else {
      const tempUpdatedTaskData: ICustomerTask = JSON.parse(JSON.stringify(updatedTaskData))

      tempUpdatedTaskData.steps[activeStep].usedPostpone = +tempUpdatedTaskData.steps[activeStep].usedPostpone + 1
      tempUpdatedTaskData.steps[activeStep].postponedDate = moment(dateText).valueOf()

      await updateTask(tempUpdatedTaskData)
      setUpdatedTaskData({ ...tempUpdatedTaskData })
    }
  }

  const handleConfirmResponsibleChange = async (timerVal, noteContent, responsible: IUser) => {
    dispatch(closeModal(`SpeechModal-responsible-${taskData?._id}`))

    const tempUpdatedTaskData: ICustomerTask = JSON.parse(JSON.stringify(updatedTaskData))

    tempUpdatedTaskData.steps[activeStep].responsibleUser = responsible
    tempUpdatedTaskData.steps[activeStep].addedFrom = loggedUser.user

    await updateTask(tempUpdatedTaskData)

    await createActivity({
      title: 'Task Responsible Changed',
      content: noteContent,
      usedTime: timerVal,
      customer: tempUpdatedTaskData.customer._id,
      stepCategory: tempUpdatedTaskData.steps[activeStep].category._id,
      task: tempUpdatedTaskData._id,
      owner: loggedUser.user?._id || '',
      step: activeStep,
      type: EActivity.TASK_RESPONSIBLE_CHANGED
    })

    dispatch(activityApi.util.resetApiState())
    setUpdatedTaskData({ ...tempUpdatedTaskData })
  }

  const handleResponsibleChange = (responsible: IUser) => {
    dispatch(
      openModal({
        id: `SpeechModal-responsible-${updatedTaskData?._id}`,
        title: 'Responsible Change Note',
        body: (
          <SpeechModal
            id={`SpeechModal-responsible-${updatedTaskData?._id}`}
            headerText={`Responsible Change Note ( ${customer.firstname + ' ' + customer.lastname} / ${
              updatedTaskData?.name
            } )`}
            cb={(timerVal, noteContent) => handleConfirmResponsibleChange(timerVal, noteContent, responsible)}
          />
        ),
        height: ESize.HSmall,
        width: ESize.WSmall,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleAllChecklistCheck = async (
    tempUpdatedTaskData,
    index: number,
    activityContent: string,
    timerVal: number
  ) => {
    const tempChecklist = JSON.parse(JSON.stringify(tempUpdatedTaskData.steps[activeStep].checklistItems))
    tempChecklist.pop()

    if (
      !tempUpdatedTaskData.steps[activeStep].checklistItems.every(checklist => checklist.isChecked === true) ||
      tempUpdatedTaskData.steps[activeStep + 1]
    ) {
      await createActivity({
        title: 'Task Checklist Completed',
        content: activityContent || ' ',
        usedTime: timerVal,
        stepCategory: tempUpdatedTaskData.steps[activeStep].category._id,
        customer: tempUpdatedTaskData.customer._id,
        task: tempUpdatedTaskData._id,
        owner: loggedUser.user?._id || '',
        step: activeStep,
        type: EActivity.TASK_CHECKLIST_CHECKED
      })
    }

    if (
      (tempChecklist.length === index && tempChecklist.every(checklist => checklist.isChecked)) ||
      tempChecklist.length === 0
    ) {
      if (
        tempUpdatedTaskData.steps[activeStep].workedTimes.reduce((acc, w) => {
          return acc + w.time
        }, 0) > tempUpdatedTaskData.steps[activeStep].checklistItems?.reduce((acc, cur) => acc + cur.duration, 0)
      ) {
        createExpiredTaskStep({
          task: tempUpdatedTaskData._id as string,
          stepIndex: activeStep,
          customer: customerId || '',
          user: loggedUser?.user?._id as string,
          index: 0,
          isInvoiced: false,
          expiredTime:
            tempUpdatedTaskData.steps[activeStep].workedTimes.reduce((acc, w) => {
              return acc + w.time
            }, 0) - tempUpdatedTaskData.steps[activeStep].checklistItems?.reduce((acc, cur) => acc + cur.duration, 0)
        })
      }

      tempUpdatedTaskData.steps[activeStep].stepStatus = ETaskStatus.Completed

      if (tempUpdatedTaskData.steps[activeStep + 1]) {
        tempUpdatedTaskData.status = ETaskStatus.Progress
        tempUpdatedTaskData.steps[activeStep + 1].stepStatus = ETaskStatus.Progress
        handleStepChange(activeStep + 1)
      } else {
        await createActivity({
          title: 'Task Completed',
          content: activityContent || ' ',
          usedTime: timerVal,
          stepCategory: tempUpdatedTaskData.steps[activeStep].category._id,
          customer: tempUpdatedTaskData.customer._id,
          task: tempUpdatedTaskData._id,
          owner: loggedUser.user?._id || '',
          step: activeStep,
          type: EActivity.TASK_FINISHED
        })

        await createCustomerActivity({
          customer: customer._id,
          creator: loggedUser.user?._id || '',
          type: CUSTOMER_ACTIVITY_TYPES.TASK_COMPLETED
        })

        tempUpdatedTaskData.status = ETaskStatus.Completed
      }
      setUpdatedTaskData({ ...tempUpdatedTaskData })
      updateTask(tempUpdatedTaskData)
    }

    dispatch(activityApi.util.resetApiState())
  }

  const handleConfirmCheck = async (timerVal, noteContent, checklistItem: ITaskChecklist, index: number) => {
    dispatch(closeModal(`NoteEditorModal-responsible-${taskData?._id}`))
    checkPlay()
    const tempUpdatedTaskData = JSON.parse(JSON.stringify(updatedTaskData))
    tempUpdatedTaskData.steps[activeStep].checklistItems[index].isChecked = true
    handleAllChecklistCheck(tempUpdatedTaskData, index, noteContent, timerVal)
    setUpdatedTaskData(tempUpdatedTaskData)

    if (loggedUser.user) {
      let userWork: ITaskUserWorkTime = {
        user: loggedUser.user,
        time: timerVal
      }

      const activeTaskStep = tempUpdatedTaskData.steps[activeStep]
      const { user: worker } = userWork

      const workArr = tempUpdatedTaskData.steps[activeStep].workedTimes

      const existingUser = activeTaskStep.workedTimes.find(work => work.user._id === worker._id)

      if (existingUser) {
        const updatedWork: ITaskUserWorkTime = {
          time: existingUser.time + userWork.time,
          user: existingUser.user
        }
        const otherWorks = workArr.filter(work => work.user._id !== existingUser.user._id)
        tempUpdatedTaskData.steps[activeStep].workedTimes = [...otherWorks, updatedWork]
      } else {
        tempUpdatedTaskData.steps[activeStep].workedTimes = [...workArr, userWork]
      }
    }

    await updateTask(tempUpdatedTaskData)

    // await createActivity({
    //   title: 'Task Checklist checked',

    //   content: noteContent,
    //   usedTime: timerVal,
    //   customer: tempUpdatedTaskData.customer._id,
    //   stepCategory: tempUpdatedTaskData.steps[activeStep].category._id,
    //   task: tempUpdatedTaskData._id,
    //   owner: loggedUser.user?._id || '',
    //   step: activeStep,
    //   type: EActivity.TASK_CHECKLIST_CHECKED
    // })

    // dispatch(activityApi.util.resetApiState())
    setUpdatedTaskData({ ...tempUpdatedTaskData })
  }

  const handleCheckboxClick = (checklistItem: ITaskChecklist, index: number) => {
    dispatch(
      openModal({
        id: `NoteEditorModal-responsible-${updatedTaskData?._id}`,
        title: 'Checklist Note',
        body: (
          <NoteEditorModal
            id={`NoteEditorModal-responsible-${updatedTaskData?._id}`}
            headerText={`Checklist Note ( ${customer.firstname + ' ' + customer.lastname} / ${updatedTaskData?.name} )`}
            cb={(timerVal, noteContent) => handleConfirmCheck(timerVal, noteContent, checklistItem, index)}
          />
        ),
        height: ESize.HMedium,
        width: ESize.WMedium,
        maxWidth: ESize.WMedium
      })
    )
  }

  const handleStartTask = () => {
    Swal.fire({
      icon: 'question',
      title: 'Do you want to start this task now?',
      showCancelButton: true,
      confirmButtonColor: colors.blue.primary,
      cancelButtonColor: colors.red.primary,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then(async result => {
      if (result.isConfirmed) {
        const tempUpdatedTaskData = JSON.parse(JSON.stringify(taskData))
        tempUpdatedTaskData.status = ETaskStatus.Progress
        tempUpdatedTaskData.steps[0].stepStatus = ETaskStatus.Progress

        setUpdatedTaskData(tempUpdatedTaskData)

        await updateTask(tempUpdatedTaskData)
      } else {
        setUpdatedTaskData(taskData)
      }
    })
  }

  useEffect(() => {
    dispatch(
      setModalOnClose({
        modalId: 'customerTaksModal' + taskId,
        onClose: () => {
          socket?.emit('removeActiveTaskStep', { taskId })
          updateTaskData()
        }
      })
    )
  }, [updateTaskData])

  useEffect(() => {
    if (!taskIsLoading && taskData) {
      const tempUpdatedTaskData: ICustomerTask = JSON.parse(JSON.stringify(taskData))

      const taskNotStartedYet =
        taskData?.steps.filter(step => step.stepStatus === ETaskStatus.Not_Started).length === taskData?.steps.length
      setIsTaskNotStarted(taskNotStartedYet)

      if (taskNotStartedYet && loggedUser.user?._id === taskData.steps[0].responsibleUser._id) {
        handleStartTask()
      } else {
        if (taskData) {
          socket?.emit('addActiveTaskStep', { task: taskData, activeTaskStep: activeStep, user: loggedUser.user })
          const lastStep = tempUpdatedTaskData.steps
            .filter(
              step =>
                step.stepStatus === ETaskStatus.Progress ||
                step.stepStatus === ETaskStatus.Completed ||
                step.stepStatus === ETaskStatus.Canceled
            )
            .pop()

          const lastStepIndex = tempUpdatedTaskData.steps.findIndex(step => step === lastStep)

          setUpdatedTaskData(tempUpdatedTaskData)
          if (lastStepIndex && lastStepIndex !== -1) {
            handleStepChange(lastStepIndex)
          }
        }
      }
    }
  }, [taskData, taskIsLoading])

  useEffect(() => {
    if (!updatedTaskData) {
      return
    }
    const interval = setInterval(() => {
      if (updatedTaskData?.steps && updatedTaskData?.steps[activeStep]?.workedTimes) {
        const workedTime = updatedTaskData?.steps[activeStep]?.workedTimes.reduce((acc, user) => {
          return acc + user.time
        }, 0)
        socket?.emit('updateTaskWorkedTime', { taskId, workedTime })
      }
    }, 1100)
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [updatedTaskData])

  return (
    <ItemContainer height="100%" overflow="hidden" borderRadius="0.3rem">
      {taskData && !taskIsLoading && updatedTaskData ? (
        <>
          <ModalBody height="calc(100% )" padding="0" withModalFooter={false}>
            <ItemContainer height="100%">
              {!taskIsLoading && taskData && (
                <Row height="100%">
                  <ItemContainer width="calc(30px + 2rem)" height="100%" backgroundColor={colors.primary.dark}>
                    <TaskWizzardNavigation
                      activeStep={activeStep}
                      taskData={updatedTaskData}
                      onStepChange={handleStepChange}
                    />
                  </ItemContainer>

                  <ItemContainer width="400px" height="100%" padding="0 1rem" backgroundColor={colors.white.primary}>
                    <TaskInformations
                      customer={customer}
                      activeStep={activeStep}
                      taskData={updatedTaskData}
                      isTaskNotStarted={isTaskNotStarted}
                      handleCheckboxClick={handleCheckboxClick}
                      handleResponsibleChange={handleResponsibleChange}
                      handlePostponeChange={handlePostponeChange}
                      handleCancelTask={handleCancelTask}
                      handleStartTask={handleStartTask}
                      handleTaskTimerChange={handleTaskTimerChange}
                      handleUserWorkClick={handleUserWorkClick}
                      handleResetActivityUserFilter={handleResetActivityUserFilter}
                    />
                  </ItemContainer>

                  <ItemContainer
                    width="calc(100% - 400px - 30px - 2rem)"
                    height="100%"
                    backgroundColor={colors.white.primary}
                  >
                    <TaskEventSection
                      taskData={updatedTaskData}
                      task={taskId}
                      activeStepNumber={activeStep}
                      taskNoteFilterUserId={taskNoteFilterUserId}
                    />
                  </ItemContainer>
                </Row>
              )}
            </ItemContainer>
          </ModalBody>
        </>
      ) : (
        <div>loading</div>
      )}
    </ItemContainer>
  )
}

export default CustomerTaskModal
