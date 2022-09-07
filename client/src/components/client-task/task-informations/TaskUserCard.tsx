import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenColumn, JustifyBetweenRow, JustifyCenterColumn, JustifyCenterRow } from '@/components/layout'
import { H1 } from '@/components/texts'
import { UserSelect } from '@/components/user-select'
import colors from '@/constants/colors'
import { useAuth } from '@/hooks/useAuth'
import { ETaskStatus, ITaskItem, IUser } from '@/models'
import { selectColorForTaskStatus } from '@/utils/statusColorUtil'
import React from 'react'
import { PlayCircle, XCircle } from 'react-feather'

interface IProps {
  taskActiveStep: ITaskItem
  isTaskNotStarted: boolean
  onResponsibleChange: (responsible: IUser) => void
  handleCancelTask: () => void
  handleStartTask: () => void
}
const TaskUserCard: React.FC<IProps> = ({
  taskActiveStep,
  isTaskNotStarted,
  onResponsibleChange,
  handleCancelTask,
  handleStartTask
}) => {
  const { loggedUser } = useAuth()
  const isResponsibleUserCurrentLoggedUser = taskActiveStep.responsibleUser._id === loggedUser.user?._id
  const canResponsibleUserChange: boolean =
    taskActiveStep.stepStatus === ETaskStatus['Progress'] || taskActiveStep.stepStatus === ETaskStatus['Not_Started']
  const canTaskCancel: boolean = canResponsibleUserChange && isResponsibleUserCurrentLoggedUser

  return (
    <ItemContainer>
      <JustifyBetweenRow>
        <ItemContainer width="60px" height="60px">
          <UserSelect
            disabled={!canResponsibleUserChange}
            selectedUser={taskActiveStep?.responsibleUser}
            onResponsibleChange={onResponsibleChange}
          />
        </ItemContainer>

        <ItemContainer width="calc(100% - 60px - 30px - 1rem)" margin="0 0.5rem">
          <JustifyCenterColumn>
            <ItemContainer
              width="100%"
              backgroundColor={colors.gray.middle}
              height="30px"
              borderRadius="0.3rem"
              margin="0 0 0.25rem 0"
            >
              <JustifyCenterColumn width="100%" height="100%">
                <H1 width="100%" textAlign="center" fontWeight="600" color={colors.primary.dark}>
                  {taskActiveStep?.category.name}
                </H1>
              </JustifyCenterColumn>
            </ItemContainer>

            <ItemContainer width="100%" height="30px">
              <JustifyCenterRow width="100%">
                <Badge
                  width="100%"
                  children={Object.values(ETaskStatus)[taskActiveStep?.stepStatus]?.toString().replace('_', ' ')}
                  color={selectColorForTaskStatus(taskActiveStep?.stepStatus)}
                />
              </JustifyCenterRow>
            </ItemContainer>
          </JustifyCenterColumn>
        </ItemContainer>

        <ItemContainer width="calc(30px)">
          <JustifyBetweenColumn width="auto">
            <ItemContainer width="auto" margin="0 0 0.25rem 0" cursorType="pointer">
              <Button
                disabled={!isTaskNotStarted || !isResponsibleUserCurrentLoggedUser}
                padding="0"
                width="30px"
                height="30px"
                color={colors.green.primary}
                onClick={handleStartTask}
              >
                <PlayCircle size={20} />
              </Button>
            </ItemContainer>

            <ItemContainer width="auto">
              <Button
                padding="0"
                width="30px"
                height="30px"
                color={colors.red.primary}
                disabled={!canTaskCancel}
                onClick={handleCancelTask}
              >
                <XCircle size={20} />
              </Button>
            </ItemContainer>
          </JustifyBetweenColumn>
        </ItemContainer>
      </JustifyBetweenRow>
    </ItemContainer>
  )
}

export default TaskUserCard
