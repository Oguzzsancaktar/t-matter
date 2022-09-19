import { ItemContainer } from '@/components/item-container'
import { Row } from '@/components/layout'
import { TaskEventSection, TaskInformations, TaskWizzardNavigation } from '@/components'
import React, { useCallback, useEffect, useState } from 'react'
import { ModalBody } from '../types'
import colors from '@/constants/colors'
import { useGetTaskByTaskIdQuery, useUpdateTaskMutation } from '@/services/customers/taskService'
import { EActivity, ETaskStatus, ICustomer, ICustomerTask, ITaskChecklist, IUser } from '@/models'
import Swal from 'sweetalert2'
import { useAuth } from '@/hooks/useAuth'
import { activityApi, useCreateActivityMutation } from '@/services/activityService'
import useAccessStore from '@hooks/useAccessStore'
import { setModalOnClose } from '@/store'
import { useCreateExpiredTaskStepMutation } from '@services/settings/finance-planning/financePlanningService'

interface IProps {
  taskId: string
  customer: ICustomer
  customerId?: ICustomer['_id']
}
const CustomerTaskModal: React.FC<IProps> = ({ taskId, customerId, customer }) => {
  const { loggedUser } = useAuth()

  const [updateTask] = useUpdateTaskMutation()
  const [createActivity] = useCreateActivityMutation()
  const { data: taskData, isLoading: taskIsLoading } = useGetTaskByTaskIdQuery(taskId)
  const [createExpiredTaskStep] = useCreateExpiredTaskStepMutation()
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
    const tempUpdatedTaskData: ICustomerTask = JSON.parse(JSON.stringify(updatedTaskData))
    tempUpdatedTaskData.steps[activeStep].passedTime = timerValue
    setUpdatedTaskData(tempUpdatedTaskData)
  }

  const handleCancelTask = async () => {
    try {
      if (updatedTaskData) {
        Swal.fire({
          title: 'Enter your cancel message',
          input: 'textarea',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Cancel Task',
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

            tempUpdatedTaskData.status = ETaskStatus.Canceled
            tempUpdatedTaskData.steps[activeStep].stepStatus = ETaskStatus.Canceled

            await updateTask(tempUpdatedTaskData)
            await createActivity({
              title: 'Task Canceled',
              content: result.value || ' ',
              customer: tempUpdatedTaskData.customer._id,
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

  const handlePostponeChange = async (value: Date[], dateText: string) => {
    try {
      if (updatedTaskData) {
        Swal.fire({
          title: 'Enter your postpone message',
          input: 'textarea',
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

            console.log('tempUpdatedTaskData', tempUpdatedTaskData)

            await updateTask(tempUpdatedTaskData)
            await createActivity({
              title: 'Task Postponed',
              content: result.value || ' ',
              customer: tempUpdatedTaskData.customer._id,
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
          title: 'Enter your responsible change message',
          input: 'textarea',
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
              customer: tempUpdatedTaskData.customer._id,
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

  const handleAllChecklistCheck = async (tempUpdatedTaskData, index: number, activityContent: string) => {
    const tempChecklist = JSON.parse(JSON.stringify(tempUpdatedTaskData.steps[activeStep].checklistItems))
    tempChecklist.pop()
    if (
      (tempChecklist.length === index && tempChecklist.every(checklist => checklist.isChecked)) ||
      tempChecklist.length === 0
    ) {
      if (
        tempUpdatedTaskData.steps[activeStep].passedTime >
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
            tempUpdatedTaskData.steps[activeStep].passedTime -
            tempUpdatedTaskData.steps[activeStep].checklistItems?.reduce((acc, cur) => acc + cur.duration, 0)
        })
      }
      tempUpdatedTaskData.steps[activeStep].stepStatus = ETaskStatus.Completed

      if (tempUpdatedTaskData.steps[activeStep + 1]) {
        tempUpdatedTaskData.status = ETaskStatus.Progress
        tempUpdatedTaskData.steps[activeStep + 1].stepStatus = ETaskStatus.Progress
        setActiveStep(activeStep + 1)

        await createActivity({
          title: 'Task Checklist Completed',
          content: activityContent || ' ',
          customer: tempUpdatedTaskData.customer._id,
          task: tempUpdatedTaskData._id,
          owner: loggedUser.user?._id || '',
          step: activeStep,
          type: EActivity.TASK_CHECKLIST_CHECKED
        })
        dispatch(activityApi.util.resetApiState())
      } else {
        await createActivity({
          title: 'Task Step Completed',
          content: activityContent || ' ',
          customer: tempUpdatedTaskData.customer._id,
          task: tempUpdatedTaskData._id,
          owner: loggedUser.user?._id || '',
          step: activeStep,
          type: EActivity.TASK_FINISHED
        })
        dispatch(activityApi.util.resetApiState())

        tempUpdatedTaskData.status = ETaskStatus.Completed
      }
      setUpdatedTaskData({ ...tempUpdatedTaskData })
      updateTask(tempUpdatedTaskData)
    }
  }

  const handleCheckboxClick = (checklistItem: ITaskChecklist, index: number) => {
    if (!checklistItem.isChecked && updatedTaskData) {
      Swal.fire({
        title: 'Enter your complete message',
        input: 'textarea',
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
        tempUpdatedTaskData.status = ETaskStatus.Progress
        tempUpdatedTaskData.steps[0].stepStatus = ETaskStatus.Progress
        setUpdatedTaskData(tempUpdatedTaskData)

        await updateTask(tempUpdatedTaskData)
        // await createActivity({
        //   title: 'Task Started',
        //   content: 'Task Started ',
        //   customer: tempUpdatedTaskData.customer._id,
        //   task: tempUpdatedTaskData._id,
        //   owner: loggedUser.user?._id || '',
        //   step: 0,
        //   type: EActivity.TASK_STARTED
        // })
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
