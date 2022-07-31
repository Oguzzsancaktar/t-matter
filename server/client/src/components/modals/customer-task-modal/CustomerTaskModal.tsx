import { ItemContainer } from '@/components/item-container'
import { Row } from '@/components/layout'
import { TaskEventSection, TaskInformations, TaskWizzardNavigation } from '@/components'
import React, { useEffect, useMemo, useState } from 'react'
import { ModalHeader } from '../types'
import colors from '@/constants/colors'
import { useGetTaskByTaskIdQuery } from '@/services/customers/taskService'
import { ETaskStatus, ICustomerTask, ITaskChecklist, IUser } from '@/models'
import Swal from 'sweetalert2'

interface IProps {
  taskId: string
}
const CustomerTaskModal: React.FC<IProps> = ({ taskId }) => {
  const { data: taskData, isLoading: taskIsLoading } = useGetTaskByTaskIdQuery(taskId)

  const [activeStep, setActiveStep] = useState<number>(0)
  const [updatedTaskData, setUpdatedTaskData] = useState<ICustomerTask>()

  const isTaskNotStarted = useMemo(
    () => taskData?.steps.filter(step => step.stepStatus === ETaskStatus.Not_Started).length === taskData?.steps.length,
    [taskData]
  )

  const handleStepChange = (step: number) => {
    setActiveStep(step)
  }

  const handlePostponeChange = (value: Date[], dateText: string) => {
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
      }).then(result => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: `Task Postponed`,
            text: result.value
          })

          setUpdatedTaskData({
            ...updatedTaskData,
            steps: updatedTaskData.steps.map((step, index) => {
              if (index === activeStep) {
                return { ...step, postponedDate: dateText, usedPostpone: step.usedPostpone + 1 }
              }
              return step
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

  const handleResponsibleChange = (responsible: IUser) => {
    if (updatedTaskData) {
      setUpdatedTaskData({
        ...updatedTaskData,
        steps: updatedTaskData.steps.map((step, index) => {
          if (index === activeStep) {
            return { ...step, responsibleUser: responsible }
          }
          return step
        })
      })
    }
  }

  const handleAllChecklistCheck = (tempUpdatedTaskData, index: number) => {
    const tempChecklist = JSON.parse(JSON.stringify(tempUpdatedTaskData.steps[activeStep].checklistItems))
    tempChecklist.pop()
    if (
      (tempChecklist.length === index && tempChecklist.every(checklist => checklist.isChecked)) ||
      tempChecklist.length === 0
    ) {
      console.log('selam')
      tempUpdatedTaskData.steps[activeStep].stepStatus = ETaskStatus.Completed
      if (tempUpdatedTaskData.steps[activeStep + 1]) {
        tempUpdatedTaskData.steps[activeStep + 1].stepStatus = ETaskStatus.Progress
        setActiveStep(activeStep + 1)
      }
      console.log('selam 2', tempUpdatedTaskData.steps[activeStep].stepStatus)
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

  useEffect(() => {
    if (taskData && isTaskNotStarted) {
      setUpdatedTaskData(taskData)
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
          console.log('start task')
          const tempUpdatedTaskData = JSON.parse(JSON.stringify(taskData))
          tempUpdatedTaskData.steps[0].stepStatus = ETaskStatus.Progress
          setUpdatedTaskData(tempUpdatedTaskData)
          setActiveStep(0)
        }
      })
    }
  }, [taskData])

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
                    handleResponsibleChange={handleResponsibleChange}
                    handlePostponeChange={handlePostponeChange}
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
