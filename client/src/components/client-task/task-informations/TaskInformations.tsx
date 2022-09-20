import { Button } from '@/components/button'
import { ItemContainer } from '@/components/item-container'
import { Column, JustifyBetweenColumn } from '@/components/layout'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import useAccessStore from '@/hooks/useAccessStore'
import { useAuth } from '@/hooks/useAuth'

import { EActivity, ICustomer, ICustomerTask, ITaskChecklist, IUser } from '@/models'
import { activityApi, useCreateActivityMutation } from '@/services/activityService'
import React from 'react'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { TaskChecklistCard, TaskCustomerCard, TaskDeadlineCard, TaskPostponeCard, TaskTimerCard, TaskUserCard } from '.'

interface IProps {
  taskData: ICustomerTask
  isTaskNotStarted: boolean
  activeStep: number
  customer: ICustomer
  handleCheckboxClick: (checklistItem: ITaskChecklist, index: number) => void
  handleResponsibleChange: (responsible: IUser) => void
  handlePostponeChange: (value: Date[], dateText: string) => void
  handleCancelTask: () => void
  handleStartTask: () => void
  handleTaskTimerChange: (timerValue) => void
}

const InformationCard = styled(ItemContainer)`
  border-radius: 0.3rem;
  background: ${'transparent'};
  padding: 1rem;
  margin: ${({ margin }) => (margin ? margin : '1rem 0')};

  &:not(:first-child) {
    margin-top: 0;
  }
`
const TaskInformations: React.FC<IProps> = ({
  taskData,
  activeStep,
  isTaskNotStarted,
  customer,
  handleCheckboxClick,
  handleResponsibleChange,
  handlePostponeChange,
  handleCancelTask,
  handleStartTask,
  handleTaskTimerChange
}) => {
  const { loggedUser } = useAuth()
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const [createActivity] = useCreateActivityMutation()

  const handleAddNewNote = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    Swal.fire({
      title: 'Enter your note message',
      input: 'textarea',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Add Note',
      showLoaderOnConfirm: true,
      preConfirm: login => {
        return login
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(async result => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: `Note Created`,
          text: result.value
        })

        await createActivity({
          title: 'Note Added',
          content: result.value || ' ',
          customer: taskData.customer._id,
          stepCategory: taskData.steps[activeStep].category._id,
          task: taskData._id,
          owner: loggedUser.user?._id || '',
          step: activeStep,
          type: EActivity.NORMAL_NOTE
        })
        dispatch(activityApi.util.resetApiState())
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Cancelled'
        })
      }
    })
  }

  return (
    <ItemContainer height="100%">
      {taskData && taskData.steps[activeStep] ? (
        <JustifyBetweenColumn height="100%">
          <InformationCard height="100px" margin="0">
            <TaskCustomerCard customer={customer} taskActiveStep={taskData.steps[activeStep]} />
          </InformationCard>

          <InformationCard height="100px">
            <TaskUserCard
              taskActiveStep={taskData.steps[activeStep]}
              onResponsibleChange={handleResponsibleChange}
              handleCancelTask={handleCancelTask}
              handleStartTask={handleStartTask}
              isTaskNotStarted={isTaskNotStarted}
            />
          </InformationCard>

          <ItemContainer backgroundColor={'transparent'} borderRadius="0.3rem" margin="0 0 1rem 0">
            <Column height="100%">
              <InformationCard height="80px">
                <TaskDeadlineCard taskActiveStep={taskData.steps[activeStep]} />
              </InformationCard>

              <InformationCard height="80px">
                <TaskPostponeCard taskActiveStep={taskData.steps[activeStep]} onPostponeChange={handlePostponeChange} />
              </InformationCard>

              <InformationCard height="80px">
                <TaskTimerCard
                  taskActiveStep={taskData.steps[activeStep]}
                  isTaskNotStarted={isTaskNotStarted}
                  handleTaskTimerChange={handleTaskTimerChange}
                />
              </InformationCard>
            </Column>
          </ItemContainer>

          <InformationCard height="calc(100% - 100px - 80px - 80px - 80px - 6rem)">
            <TaskChecklistCard
              taskActiveStep={taskData.steps[activeStep]}
              handleCheckboxClick={handleCheckboxClick}
              checklistData={taskData.steps[activeStep]?.checklistItems}
            />
          </InformationCard>

          <ItemContainer margin="0 0 1rem 0">
            <Button onClick={handleAddNewNote} color={colors.gray.middle}>
              <H1 textAlign="center" color={colors.primary.dark}>
                Add Note
              </H1>
            </Button>
          </ItemContainer>
        </JustifyBetweenColumn>
      ) : (
        <div>Loading</div>
      )}
    </ItemContainer>
  )
}

export default TaskInformations
