import { UserImage } from '@/components/image'
import { ItemContainer } from '@/components/item-container'
import { Column, Row } from '@/components/layout'
import { ProgressBar } from '@/components/progress-bar'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import { ETaskStatus, ITaskItem } from '@/models'
import { selectColorForTaskStatus } from '@/utils/statusColorUtil'
import React, { useEffect, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'

interface IProps {
  workflowName: string
  taskSteps: ITaskItem[]
  taskStatus: ETaskStatus
  taskId: string
  workflowStatus: number
}

const StyledReactTooltip = styled(ReactTooltip)`
  border-radius: 0.3rem !important;
  padding: 0.3rem 0.5rem !important;
  background-color: ${colors.gray.secondary} !important;
  border: 2px solid ${colors.white.secondary} !important;
  opacity: 1 !important;
  overflow: hidden;
  transition: 0s;
  &:after {
    border-top-color: ${colors.gray.secondary} !important;
  }
`

const TaskProgress: React.FC<IProps> = ({ taskStatus, taskSteps, workflowName, taskId, workflowStatus }) => {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    switch (workflowStatus) {
      case ETaskStatus.Not_Started:
        setActiveStep(0)
        break

      case ETaskStatus.Canceled:
        setActiveStep(taskSteps.findIndex(step => step.stepStatus === ETaskStatus.Canceled))
        break

      case ETaskStatus.Progress:
        setActiveStep(taskSteps.findIndex(step => step.stepStatus === ETaskStatus.Progress))
        break

      case ETaskStatus.Completed:
        setActiveStep(taskSteps.length - 1)
        break
    }
  }, [taskSteps])

  const [stepStatuses, setStepStatuses] = useState({
    canceled: 0,
    completed: 0,
    notStarted: 0,
    progress: 0
  })

  const percentage = ((stepStatuses.completed + stepStatuses.canceled + stepStatuses.progress) / taskSteps.length) * 100
  ReactTooltip.rebuild()

  useEffect(() => {
    const stepStatusesR = taskSteps.reduce(
      (acc, step) => {
        if (step.stepStatus === ETaskStatus.Canceled) {
          acc.canceled++
        }
        if (step.stepStatus === ETaskStatus.Completed) {
          acc.completed++
        }
        if (step.stepStatus === ETaskStatus.Not_Started) {
          acc.notStarted++
        }
        if (step.stepStatus === ETaskStatus.Progress) {
          acc.progress++
        }
        return acc
      },
      { canceled: 0, completed: 0, notStarted: 0, progress: 0 }
    )
    setStepStatuses(stepStatusesR)
  }, [taskSteps])

  return (
    <ItemContainer data-tip data-for={'taskProgressTooltip-' + taskId}>
      <ProgressBar
        reverse={true}
        startLabel={workflowName}
        completionPercentage={percentage}
        completionColor={selectColorForTaskStatus(taskStatus) + '99'}
      ></ProgressBar>

      <StyledReactTooltip id={'taskProgressTooltip-' + taskId} effect="solid">
        <Row>
          <ItemContainer margin="0 0.5rem 0 0" transition="none">
            <UserImage width="40px" height="40px" src={taskSteps[activeStep]?.responsibleUser.profile_img}></UserImage>
          </ItemContainer>
          <Column>
            <H1 color={colors.text.primary} width="max-content">
              {taskSteps[activeStep]?.category.name}
            </H1>

            <Row>
              <H1 color={colors.text.primary} width="max-content">
                {taskSteps.length} Steps{' '}
              </H1>
              <H1 color={colors.text.primary} margin="0 0.3rem" width="max-content">
                -
              </H1>
              <H1 color={colors.text.primary} width="max-content">
                {activeStep + 1}/{taskSteps.length}
              </H1>
            </Row>
          </Column>
        </Row>
      </StyledReactTooltip>
    </ItemContainer>
  )
}

export default TaskProgress
