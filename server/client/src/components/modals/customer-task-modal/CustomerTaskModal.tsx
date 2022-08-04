import { ItemContainer } from '@/components/item-container'
import { Row } from '@/components/layout'
import { TaskEventSection, TaskInformations, TaskWizzardNavigation } from '@/components'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ModalHeader } from '../types'
import colors from '@/constants/colors'
import { useGetTaskByTaskIdQuery, useUpdateTaskMutation } from '@/services/customers/taskService'
import { EActivity, ETaskStatus, ICustomerTask, ITaskChecklist, IUser } from '@/models'
import Swal from 'sweetalert2'
import { useAuth } from '@/hooks/useAuth'
import { activityApi, useCreateActivityMutation } from '@/services/activityService'
import useAccessStore from '@hooks/useAccessStore'
import { setModalOnClose } from '@/store'

interface IProps {
  taskId: string
}
const CustomerTaskModal: React.FC<IProps> = ({ taskId }) => {
  const { loggedUser } = useAuth()

  const [updateTask] = useUpdateTaskMutation()
  const [createActivity] = useCreateActivityMutation()
  const { data: taskData, isLoading: taskIsLoading } = useGetTaskByTaskIdQuery(taskId)

  const [activeStep, setActiveStep] = useState<number>(0)
  const [updatedTaskData, setUpdatedTaskData] = useState<ICustomerTask>()
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [isTaskNotStarted, setIsTaskNotStarted] = useState(
    updatedTaskData?.steps.filter(step => step.stepStatus === ETaskStatus.Not_Started).length ===
      updatedTaskData?.steps.length
  )

  const updateTaskData = useCallback(async () => {
    if (updatedTaskData) {
      updateTask(updatedTaskData)
    }
  }, [updatedTaskData])

  const handleTaskTimerChange = (timerValue: number) => {
    console.log(timerValue)
    const tempUpdatedTaskData: ICustomerTask = JSON.parse(JSON.stringify(updatedTaskData))
    tempUpdatedTaskData.steps[activeStep].passedTime = timerValue
    setUpdatedTaskData(tempUpdatedTaskData)
  }

  const handleCancelTask = async () => {
    try {
      if (updatedTaskData) {
        Swal.fire({
          title: 'Enter your cancel message',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Cancel',
          showLoaderOnConfirm: true,
          preConfirm: login => {
            return login
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then(async result => {
          const tempUpdatedTaskData: ICustomerTask = JSON.parse(JSON.stringify(updatedTaskData))

          if (result.isConfirmed) {
            Swal.fire({
              icon: 'success',
              title: `Task Canceled`,
              text: result.value
            })

            tempUpdatedTaskData.steps[activeStep].stepStatus = ETaskStatus.Canceled

            await updateTask(tempUpdatedTaskData)
            await createActivity({
              title: 'Task Canceled',
              content: result.value || ' ',
              customer: tempUpdatedTaskData.customerId,
              task: tempUpdatedTaskData._id,
              owner: loggedUser.user?._id || '',
              step: activeStep,
              type: EActivity.TASK_CANCELED
            })
            dispatch(activityApi.util.resetApiState())

            setUpdatedTaskData({ ...tempUpdatedTaskData })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Cancelled'
            })
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleStepChange = (step: number) => {
    if (isTaskNotStarted && step > activeStep) {
      Swal.fire({
        title: 'You can not go to next step',
        text: 'You can not go to next step because you have not started this task',
        icon: 'error'
      })
    } else {
      setActiveStep(step)
    }
  }

  const handlePostponeChange = async (value: Date[], dateText: string) => {
    try {
      if (updatedTaskData) {
        Swal.fire({
          title: 'Enter your postpone message',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Postponed',
          showLoaderOnConfirm: true,
          preConfirm: login => {
            return login
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then(async result => {
          const tempUpdatedTaskData: ICustomerTask = JSON.parse(JSON.stringify(updatedTaskData))

          if (result.isConfirmed) {
            Swal.fire({
              icon: 'success',
              title: `Task Postponed`,
              text: result.value
            })

            tempUpdatedTaskData.steps[activeStep].usedPostpone = +tempUpdatedTaskData.steps[activeStep].usedPostpone + 1
            tempUpdatedTaskData.steps[activeStep].postponedDate = dateText

            await updateTask(tempUpdatedTaskData)
            await createActivity({
              title: 'Task Postponed',
              content: result.value || ' ',
              customer: tempUpdatedTaskData.customerId,
              task: tempUpdatedTaskData._id,
              owner: loggedUser.user?._id || '',
              step: activeStep,
              type: EActivity.TASK_POSTPONED
            })
            dispatch(activityApi.util.resetApiState())

            setUpdatedTaskData({ ...tempUpdatedTaskData })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Cancelled'
            })
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleResponsibleChange = (responsible: IUser) => {
    try {
      if (updatedTaskData) {
        Swal.fire({
          title: 'Enter your responsible chanfe message',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Change Responsible',
          showLoaderOnConfirm: true,
          preConfirm: login => {
            return login
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then(async result => {
          const tempUpdatedTaskData: ICustomerTask = JSON.parse(JSON.stringify(updatedTaskData))

          if (result.isConfirmed) {
            Swal.fire({
              icon: 'success',
              title: `Task Postponed`,
              text: result.value
            })

            tempUpdatedTaskData.steps[activeStep].responsibleUser = responsible

            await updateTask(tempUpdatedTaskData)
            await createActivity({
              title: 'Task Responsible Changed',
              content: result.value.toString() || ' ',
              customer: tempUpdatedTaskData.customerId,
              task: tempUpdatedTaskData._id,
              owner: loggedUser.user?._id || '',
              step: activeStep,
              type: EActivity.TASK_RESPONSIBLE_CHANGED
            })
            dispatch(activityApi.util.resetApiState())

            setUpdatedTaskData({ ...tempUpdatedTaskData })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Cancelled'
            })
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleAllChecklistCheck = (tempUpdatedTaskData, index: number) => {
    const tempChecklist = JSON.parse(JSON.stringify(tempUpdatedTaskData.steps[activeStep].checklistItems))
    tempChecklist.pop()
    if (
      (tempChecklist.length === index && tempChecklist.every(checklist => checklist.isChecked)) ||
      tempChecklist.length === 0
    ) {
      tempUpdatedTaskData.steps[activeStep].stepStatus = ETaskStatus.Completed
      if (tempUpdatedTaskData.steps[activeStep + 1]) {
        tempUpdatedTaskData.steps[activeStep + 1].stepStatus = ETaskStatus.Progress
        setActiveStep(activeStep + 1)
      }
      setUpdatedTaskData({ ...tempUpdatedTaskData })
    }
  }

  const handleCheckboxClick = (checklistItem: ITaskChecklist, index: number) => {
    if (!checklistItem.isChecked && updatedTaskData) {
      Swal.fire({
        title: 'Enter your complete message',
        input: 'text',
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
      }).then(result => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: `Checklist Completed`,
            text: result.value
          })
          const tempUpdatedTaskData = JSON.parse(JSON.stringify(updatedTaskData))
          tempUpdatedTaskData.steps[activeStep].checklistItems[index].isChecked = true
          handleAllChecklistCheck(tempUpdatedTaskData, index)
          setUpdatedTaskData(tempUpdatedTaskData)
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Cancelled'
          })
        }
      })
    }
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
        tempUpdatedTaskData.steps[0].stepStatus = ETaskStatus.Progress
        setUpdatedTaskData(tempUpdatedTaskData)

        await updateTask(tempUpdatedTaskData)
        await createActivity({
          title: 'Task Started',
          content: 'Task Started ',
          customer: tempUpdatedTaskData.customer._id,
          task: tempUpdatedTaskData._id,
          owner: loggedUser.user?._id || '',
          step: 0,
          type: EActivity.TASK_STARTED
        })
        dispatch(activityApi.util.resetApiState())
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
      const tempUpdatedTaskData = JSON.parse(JSON.stringify(taskData))

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
    <ItemContainer minHeight="750px">
      {taskData && !taskIsLoading && updatedTaskData ? (
        <>
          <ModalHeader>{taskData?.name}</ModalHeader>
          <ItemContainer height="calc(100% - 52px)">
            {!taskIsLoading && taskData && (
              <Row height="100%">
                <ItemContainer width="auto" height="100%">
                  <TaskWizzardNavigation
                    activeStep={activeStep}
                    taskData={updatedTaskData}
                    onStepChange={handleStepChange}
                  />
                </ItemContainer>

                <ItemContainer width="400px" height="100%" padding="0 2rem" backgroundColor={colors.white.primary}>
                  <TaskInformations
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
                  width="calc(100% - 400px)"
                  height="100%"
                  padding="0 2rem"
                  backgroundColor={colors.white.secondary}
                >
                  <TaskEventSection task={taskId} step={activeStep} />
                </ItemContainer>
              </Row>
            )}
          </ItemContainer>
        </>
      ) : (
        <div>loading</div>
      )}
    </ItemContainer>
  )
}

export default CustomerTaskModal
