import { TaskWizzardNavigation } from '@components/client-task'
import { TaskNoteCounter } from '@/components/counter'
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
import { useUpdateTaskMutation, useGetTaskByTaskIdQuery } from '@/services/customers/taskService'
import { useCreateExpiredTaskStepMutation } from '@/services/settings/finance-planning/financePlanningService'
import { closeModal, openModal, setModalOnClose } from '@/store'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ModalBody } from '../types'
import TaskInformations from '@/components/client-task/task-informations/TaskInformations'
import TaskEventSection from '@/components/client-task/task-informations/TaskEventSection'
import { NoteEditorModal } from '@/components'
import useSound from 'use-sound'

const SwalReactContent = withReactContent(Swal)

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

  const [createActivity] = useCreateActivityMutation()
  const { data: taskData, isLoading: taskIsLoading } = useGetTaskByTaskIdQuery(taskId)
  const [createExpiredTaskStep] = useCreateExpiredTaskStepMutation()
  const [activeStep, setActiveStep] = useState<number>(0)
  const [updatedTaskData, setUpdatedTaskData] = useState<ICustomerTask>()
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const isResponsibleUserLoggedUser = useMemo(
    () => loggedUser.user?._id === taskData?.steps[activeStep].responsibleUser._id,
    [loggedUser.user, taskData?.steps[activeStep].responsibleUser]
  )

  const [isTaskNotStarted, setIsTaskNotStarted] = useState(
    updatedTaskData?.steps.filter(step => step.stepStatus === ETaskStatus.Not_Started).length ===
      updatedTaskData?.steps.length
  )

  const updateTaskData = useCallback(async () => {
    if (updatedTaskData) {
      updateTask(updatedTaskData)
    }
  }, [updatedTaskData])

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
    dispatch(closeModal(`NoteEditorModal-cancel-${taskData?._id}`))

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
        id: `NoteEditorModal-cancel-${updatedTaskData?._id}`,
        title: 'Cancel Note',
        body: (
          <NoteEditorModal
            id={`NoteEditorModal-cancel-${updatedTaskData?._id}`}
            headerText={`Cancel Note ( ${customer.firstname + ' ' + customer.lastname} / ${updatedTaskData?.name} )`}
            cb={handleConfirmCancelTask}
          />
        ),
        height: ESize.HMedium,
        width: ESize.WMedium,
        maxWidth: ESize.WMedium
      })
    )
  }

  const handleStepChange = (step: number) => {
    // if (isTaskNotStarted && step > activeStep) {
    //   Swal.fire({
    //     title: 'You can not go to next step',
    //     text: 'You can not go to next step because you have not started this task',
    //     icon: 'error'
    //   })
    // } else {
    //   setActiveStep(step)
    // }

    setActiveStep(step)
  }

  const handleConfirmPostponeChange = async (timerVal, noteContent, dateText: string) => {
    dispatch(closeModal(`NoteEditorModal-postpone-${taskData?._id}`))

    const tempUpdatedTaskData: ICustomerTask = JSON.parse(JSON.stringify(updatedTaskData))

    tempUpdatedTaskData.steps[activeStep].usedPostpone = +tempUpdatedTaskData.steps[activeStep].usedPostpone + 1
    tempUpdatedTaskData.steps[activeStep].postponedDate = dateText

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
      (updatedTaskData?.steps[activeStep].usedPostpone || 0) >= (updatedTaskData?.steps[activeStep].postponeTime || 0)
    ) {
      dispatch(
        openModal({
          id: `NoteEditorModal-postpone-${updatedTaskData?._id}`,
          title: 'Postpone Note',
          body: (
            <NoteEditorModal
              id={`NoteEditorModal-postpone-${updatedTaskData?._id}`}
              headerText={`Cancel Note ( ${customer.firstname + ' ' + customer.lastname} / ${updatedTaskData?.name} )`}
              cb={(timerVal, noteContent) => handleConfirmPostponeChange(timerVal, noteContent, dateText)}
            />
          ),
          height: ESize.HMedium,
          width: ESize.WMedium,
          maxWidth: ESize.WMedium
        })
      )
    } else {
      const tempUpdatedTaskData: ICustomerTask = JSON.parse(JSON.stringify(updatedTaskData))

      tempUpdatedTaskData.steps[activeStep].usedPostpone = +tempUpdatedTaskData.steps[activeStep].usedPostpone + 1
      tempUpdatedTaskData.steps[activeStep].postponedDate = dateText

      await updateTask(tempUpdatedTaskData)
      setUpdatedTaskData({ ...tempUpdatedTaskData })
    }
  }

  const handleConfirmResponsibleChange = async (timerVal, noteContent, responsible: IUser) => {
    dispatch(closeModal(`NoteEditorModal-responsible-${taskData?._id}`))

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
        id: `NoteEditorModal-responsible-${updatedTaskData?._id}`,
        title: 'Cancel Note',
        body: (
          <NoteEditorModal
            id={`NoteEditorModal-responsible-${updatedTaskData?._id}`}
            headerText={`Cancel Note ( ${customer.firstname + ' ' + customer.lastname} / ${updatedTaskData?.name} )`}
            cb={(timerVal, noteContent) => handleConfirmResponsibleChange(timerVal, noteContent, responsible)}
          />
        ),
        height: ESize.HMedium,
        width: ESize.WMedium,
        maxWidth: ESize.WMedium
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
        tempUpdatedTaskData.steps[activeStep].workedTimes >
        tempUpdatedTaskData.steps[activeStep].checklistItems?.reduce((acc, cur) => acc + cur.duration, 0)
      ) {
        createExpiredTaskStep({
          task: tempUpdatedTaskData._id as string,
          stepIndex: activeStep,
          customer: customerId || '',
          user: loggedUser?.user?._id as string,
          index: 0,
          isInvoiced: false,
          expiredTime:
            tempUpdatedTaskData.steps[activeStep].workedTimes -
            tempUpdatedTaskData.steps[activeStep].checklistItems?.reduce((acc, cur) => acc + cur.duration, 0)
        })
      }

      tempUpdatedTaskData.steps[activeStep].stepStatus = ETaskStatus.Completed

      if (tempUpdatedTaskData.steps[activeStep + 1]) {
        tempUpdatedTaskData.status = ETaskStatus.Progress
        tempUpdatedTaskData.steps[activeStep + 1].stepStatus = ETaskStatus.Progress
        setActiveStep(activeStep + 1)
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

        tempUpdatedTaskData.status = ETaskStatus.Completed
      }
      setUpdatedTaskData({ ...tempUpdatedTaskData })
      updateTask(tempUpdatedTaskData)
    }

    dispatch(activityApi.util.resetApiState())
  }

<<<<<<< HEAD
  const handleConfirmCheck = async (timerVal, noteContent, checklistItem: ITaskChecklist, index: number) => {
    dispatch(closeModal(`NoteEditorModal-responsible-${taskData?._id}`))

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
=======
  const handleCheckboxClick = (checklistItem: ITaskChecklist, index: number) => {
    if (!checklistItem.isChecked && updatedTaskData) {
      SwalReactContent.fire({
        title: 'Enter your complete message',
        input: 'textarea',
        html: isResponsibleUserLoggedUser ? '' : <TaskNoteCounter />,
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Complete',
        showLoaderOnConfirm: true,
        preConfirm: login => {
          return login
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(async result => {
        if (result.isConfirmed) {
          checkPlay()
          Swal.fire({
            icon: 'success',
            title: `Checklist Completed`,
            text: result.value
          })
          const tempUpdatedTaskData = JSON.parse(JSON.stringify(updatedTaskData))
          tempUpdatedTaskData.steps[activeStep].checklistItems[index].isChecked = true
          handleAllChecklistCheck(tempUpdatedTaskData, index, result.value)
          setUpdatedTaskData(tempUpdatedTaskData)
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Cancelled'
          })
>>>>>>> refs/remotes/origin/master
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
        title: 'Cancel Note',
        body: (
          <NoteEditorModal
            id={`NoteEditorModal-responsible-${updatedTaskData?._id}`}
            headerText={`Cancel Note ( ${customer.firstname + ' ' + customer.lastname} / ${updatedTaskData?.name} )`}
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
    dispatch(setModalOnClose({ modalId: 'customerTaksModal' + taskId, onClose: updateTaskData }))
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
            setActiveStep(lastStepIndex)
          }
        }
      }
    }
  }, [taskData, taskIsLoading])

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
                    />
                  </ItemContainer>

                  <ItemContainer
                    width="calc(100% - 400px - 30px - 2rem)"
                    height="100%"
                    backgroundColor={colors.white.primary}
                  >
                    <TaskEventSection taskData={updatedTaskData} task={taskId} activeStepNumber={activeStep} />
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
