import { Button } from '@/components/button'
import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenColumn, Column, JustifyBetweenRow, Row } from '@/components/layout'
import { NoteEditorModal } from '@/components/modals'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import useAccessStore from '@/hooks/useAccessStore'
import { useAuth } from '@/hooks/useAuth'

import {
  EActivity,
  ESize,
  ETaskStatus,
  ICustomer,
  ICustomerTask,
  ITaskChecklist,
  ITaskUserWorkTime,
  IUser
} from '@/models'
import { activityApi, useCreateActivityMutation } from '@/services/activityService'
import { closeModal, openModal } from '@/store'
import React, { useMemo } from 'react'
import { Delete } from 'react-feather'
import styled from 'styled-components'
import TaskChecklistCard from './TaskChecklistCard'
import TaskDeadlineCard from './TaskDeadlineCard'
import TaskPostponeCard from './TaskPostponeCard'
import TaskTimerCard from './TaskTimerCard'
import TaskUserCard from './TaskUserCard'

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
  handleTaskTimerChange: (userWorkTime: ITaskUserWorkTime) => void
  handleUserWorkClick: (userId: string) => void
  handleResetActivityUserFilter: () => void
}

const InformationCard = styled(ItemContainer)`
  border-radius: 0.3rem;
  background: ${'transparent'};
  padding: 0rem;
  margin: ${({ margin }) => (margin ? margin : '1rem 0')};
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
  handleTaskTimerChange,
  handleUserWorkClick,
  handleResetActivityUserFilter
}) => {
  const { loggedUser } = useAuth()

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [createActivity] = useCreateActivityMutation()

  const isResponsibleUserLoggedUser = useMemo(
    () => loggedUser.user?._id === taskData.steps[activeStep].responsibleUser._id,
    [loggedUser.user, taskData.steps[activeStep].responsibleUser]
  )

  const canStepCancel = useMemo(
    () => taskData.steps[activeStep].stepStatus !== ETaskStatus.Completed,
    [taskData, activeStep]
  )

  const handleConfirmAddNewNote = async (timerVal, noteContent) => {
    dispatch(closeModal(`NoteEditorModal-note-${taskData._id}`))

    await createActivity({
      title: 'Note Added',
      content: noteContent,
      usedTime: timerVal,
      customer: taskData.customer._id,
      stepCategory: taskData.steps[activeStep].category._id,
      task: taskData._id,
      owner: loggedUser.user?._id || '',
      step: activeStep,
      type: EActivity.NORMAL_NOTE
    })
    dispatch(activityApi.util.resetApiState())
  }

  const handleAddNewNote = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    dispatch(
      openModal({
        id: `NoteEditorModal-note-${taskData._id}`,
        title: 'Add Note',
        body: (
          <NoteEditorModal
            id={`NoteEditorModal-note-${taskData._id}`}
            headerText={`Add Note ( ${customer.firstname + ' ' + customer.lastname} / ${taskData.name} )`}
            cb={handleConfirmAddNewNote}
          />
        ),
        height: ESize.HMedium,
        width: ESize.WMedium,
        maxWidth: ESize.WMedium
      })
    )
  }

  return (
    <ItemContainer height="100%">
      {taskData && taskData.steps[activeStep] ? (
        <JustifyBetweenColumn height="100%">
          <InformationCard height="65px">
            <TaskUserCard
              customer={customer}
              taskData={taskData}
              taskActiveStep={taskData.steps[activeStep]}
              onResponsibleChange={handleResponsibleChange}
              handleCancelTask={handleCancelTask}
              handleStartTask={handleStartTask}
              isTaskNotStarted={isTaskNotStarted}
            />
          </InformationCard>

          <ItemContainer backgroundColor={'transparent'} borderRadius="0.3rem" margin="5rem 0 -2rem 0">
            <Column height="100%">
              <InformationCard height="100%" margin="0" zIndex="99">
                <JustifyBetweenRow width="100%" height="220px">
                  <TaskDeadlineCard taskActiveStep={taskData.steps[activeStep]} />

                  <TaskPostponeCard
                    taskActiveStep={taskData.steps[activeStep]}
                    onPostponeChange={handlePostponeChange}
                  />
                </JustifyBetweenRow>
              </InformationCard>

              <InformationCard height="30px" margin="3rem 0 2rem 0">
                <Row>
                  <TaskTimerCard
                    taskActiveStep={taskData.steps[activeStep]}
                    isTaskNotStarted={isTaskNotStarted}
                    handleTaskTimerChange={handleTaskTimerChange}
                    handleUserWorkClick={handleUserWorkClick}
                  />
                  <ItemContainer
                    onClick={() => handleResetActivityUserFilter()}
                    margin="0 0 0 0.5rem"
                    width="30px"
                    cursorType="pointer"
                  >
                    <JustifyBetweenColumn height="100%">
                      <Delete size={20} />
                    </JustifyBetweenColumn>
                  </ItemContainer>
                </Row>
              </InformationCard>
            </Column>
          </ItemContainer>

          <InformationCard height="calc(100% - 100px - 200px - 30px - 6rem)">
            <TaskChecklistCard
              taskActiveStep={taskData.steps[activeStep]}
              handleCheckboxClick={handleCheckboxClick}
              checklistData={taskData.steps[activeStep]?.checklistItems}
            />
          </InformationCard>

          <ItemContainer margin="0 0 1rem 0">
            <JustifyBetweenRow>
              <ItemContainer width="100%">
                <Button
                  disabled={!isTaskNotStarted || !isResponsibleUserLoggedUser}
                  color={colors.green.primary}
                  onClick={handleStartTask}
                >
                  Start
                </Button>
              </ItemContainer>

              <ItemContainer width="100%" margin="0 1rem">
                <Button
                  padding="0"
                  width="100%"
                  height="30px"
                  color={colors.red.primary}
                  disabled={!canStepCancel}
                  onClick={handleCancelTask}
                >
                  Cancel
                </Button>
              </ItemContainer>

              <ItemContainer width="100%">
                <Button onClick={handleAddNewNote} color={colors.gray.middle}>
                  <H1 cursor="pointer" textAlign="center" color={colors.primary.dark}>
                    Add Note
                  </H1>
                </Button>
              </ItemContainer>
            </JustifyBetweenRow>
          </ItemContainer>
        </JustifyBetweenColumn>
      ) : (
        <div>Loading</div>
      )}
    </ItemContainer>
  )
}

export default TaskInformations
