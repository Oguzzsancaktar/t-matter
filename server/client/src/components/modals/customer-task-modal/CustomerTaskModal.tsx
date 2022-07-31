import { ItemContainer } from '@/components/item-container'
import { Row } from '@/components/layout'
import { TaskEventSection, TaskInformations, TaskWizzardNavigation } from '@/components'
import React, { useEffect, useState } from 'react'
import { ModalHeader } from '../types'
import colors from '@/constants/colors'
import { useGetTaskByTaskIdQuery } from '@/services/customers/taskService'
import { ETaskStatus, ICustomerTask, ITaskChecklist } from '@/models'
import Swal from 'sweetalert2'

interface IProps {
  taskId: string
}
const CustomerTaskModal: React.FC<IProps> = ({ taskId }) => {
  const { data: taskData, isLoading: taskIsLoading } = useGetTaskByTaskIdQuery(taskId)

  const [activeStep, setActiveStep] = useState<number>(0)
  const [updatedTaskData, setUpdatedTaskData] = useState<ICustomerTask>()

  const handleStepChange = (step: number) => {
    setActiveStep(step)
  }

  const handleCheckboxClick = (checklistItem: ITaskChecklist) => {
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

          setUpdatedTaskData({
            ...updatedTaskData,
            steps: updatedTaskData.steps.map((item, index) => {
              if (index === activeStep) {
                return {
                  ...item,
                  checklistItems: item.checklistItems.map(ci => {
                    if (ci._id === checklistItem._id) {
                      return {
                        ...ci,
                        isChecked: !ci.isChecked
                      }
                    }
                    return ci
                  })
                }
              }
              return item
            })
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Cancelled'
          })
        }
      })
    }
  }

  const controlStepStatus = () => {
    let isStepCompleted = false

    updatedTaskData?.steps.map((step, index) => {
      const isAllChecklistsCompleted = step.checklistItems.find(item => item.isChecked === false)

      if (!isAllChecklistsCompleted) {
        setUpdatedTaskData({
          ...updatedTaskData,
          steps: updatedTaskData.steps.map((item, i) => {
            if (index === activeStep) {
              isStepCompleted = true
              return {
                ...item,
                stepStatus: ETaskStatus.Completed
              }
            }
            return item
          })
        })
      }
    })

    return isStepCompleted
  }

  useEffect(() => {
    const isStepCompleted = controlStepStatus()
    if (isStepCompleted && updatedTaskData) {
      setUpdatedTaskData({
        ...updatedTaskData,
        steps: updatedTaskData.steps.map((item, index) => {
          if (updatedTaskData.steps.length > activeStep + 1 && index === activeStep + 1) {
            setActiveStep(activeStep + 1)
            return {
              ...item,
              stepStatus: ETaskStatus.Progress
            }
          }
          return item
        })
      })
    }
  }, [updatedTaskData?.steps[activeStep]?.checklistItems])

  useEffect(() => {
    if (taskData && !taskIsLoading) {
      if (taskData.steps.filter(step => step.stepStatus === ETaskStatus.Not_Started).length === taskData.steps.length) {
        Swal.fire({
          icon: 'question',
          title: 'Do you want to start this task now?',
          showCancelButton: true,
          confirmButtonColor: colors.blue.primary,
          cancelButtonColor: colors.red.primary,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then(result => {
          if (result.isConfirmed) {
            setUpdatedTaskData({
              ...taskData,
              steps: taskData.steps.map((step, index) => {
                if (index === 0) {
                  console.log('step', step)
                  return {
                    ...step,
                    stepStatus: ETaskStatus.Progress
                  }
                }
                return step
              })
            })
            setActiveStep(0)
          } else {
            setUpdatedTaskData(taskData)
            setActiveStep(taskData.steps.findIndex(step => step.stepStatus === ETaskStatus.Progress))
          }
        })
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
                    handleCheckboxClick={handleCheckboxClick}
                  />
                </ItemContainer>

                <ItemContainer
                  width="calc(100% - 400px)"
                  height="100%"
                  padding="0 2rem"
                  backgroundColor={colors.white.secondary}
                >
                  <TaskEventSection />
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
