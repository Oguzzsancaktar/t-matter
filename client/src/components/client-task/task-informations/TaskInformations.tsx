import { Button } from '@/components/button'
import { TaskNoteCounter } from '@/components/counter'
import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenColumn, Column } from '@/components/layout'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import useAccessStore from '@/hooks/useAccessStore'
import { useAuth } from '@/hooks/useAuth'

import { EActivity, ICustomer, ICustomerTask, ITaskChecklist, IUser } from '@/models'
import { activityApi, useCreateActivityMutation } from '@/services/activityService'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import TaskChecklistCard from './TaskChecklistCard'
import TaskCustomerCard from './TaskCustomerCard'
import TaskDeadlineCard from './TaskDeadlineCard'
import TaskPostponeCard from './TaskPostponeCard'
import TaskTimerCard from './TaskTimerCard'
import TaskUserCard from './TaskUserCard'

const SwalReactContent = withReactContent(Swal)
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

  const isResponsibleUserLoggedUser = useMemo(
    () => loggedUser.user?._id === taskData.steps[activeStep].responsibleUser._id,
    [loggedUser.user, taskData.steps[activeStep].responsibleUser]
  )

  const handleNonResponsibleNewNoteCounter = (value: number) => {
    console.log('value from new counter', value)
  }

  const handleAddNewNote = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    SwalReactContent.fire({
      title: 'Enter your note message',
      input: 'textarea',
      inputAttributes: {
        autocapitalize: 'off'
      },
      html: isResponsibleUserLoggedUser ? '' : <TaskNoteCounter />,
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
            <TaskCustomerCard customer={customer} taskData={taskData} />
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
              <H1 cursor="pointer" textAlign="center" color={colors.primary.dark}>
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
