import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenColumn, JustifyBetweenRow, JustifyCenterColumn, JustifyCenterRow } from '@/components/layout'
import { H1 } from '@/components/texts'
import { UserSelect } from '@/components/user-select'
import colors from '@/constants/colors'
import { ETaskStatus, ITaskItem, IUser } from '@/models'
import { selectColorForStatus, selectColorForTaskStatus } from '@/utils/statusColorUtil'
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
  return (
    <ItemContainer>
      <JustifyBetweenRow>
        <ItemContainer>
          <JustifyCenterColumn>
            <ItemContainer>
              <UserSelect selectedUser={taskActiveStep?.responsibleUser} onResponsibleChange={onResponsibleChange} />
            </ItemContainer>

            <ItemContainer>
              <JustifyCenterRow>
                <Badge
                  children={Object.values(ETaskStatus)[taskActiveStep?.stepStatus]?.toString().replace('_', ' ')}
                  color={selectColorForTaskStatus(taskActiveStep?.stepStatus)}
                />
              </JustifyCenterRow>
            </ItemContainer>
          </JustifyCenterColumn>
        </ItemContainer>

        <ItemContainer>
          <H1>{taskActiveStep?.category.name}</H1>
        </ItemContainer>

        <ItemContainer width="auto" height="100%">
          <JustifyBetweenColumn width="auto">
            <ItemContainer width="auto">
              <Button
                disabled={!isTaskNotStarted}
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
              <Button padding="0" width="30px" height="30px" color={colors.red.primary} onClick={handleCancelTask}>
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
