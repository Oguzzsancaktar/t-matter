import { Badge } from '@/components/badge'
import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenRow, JustifyCenterColumn, JustifyCenterRow } from '@/components/layout'
import { H1 } from '@/components/texts'
import { UserSelect } from '@/components/user-select'
import colors from '@/constants/colors'
import { ETaskStatus, ITaskItem, IUser } from '@/models'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import React from 'react'

interface IProps {
  taskActiveStep: ITaskItem
  onResponsibleChange: (responsible: IUser) => void
}
const TaskUserCard: React.FC<IProps> = ({ taskActiveStep, onResponsibleChange }) => {
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
                  color={selectColorForStatus(taskActiveStep?.stepStatus)}
                />
              </JustifyCenterRow>
            </ItemContainer>
          </JustifyCenterColumn>
        </ItemContainer>

        <ItemContainer>
          <H1>{taskActiveStep?.category.name}</H1>
        </ItemContainer>
      </JustifyBetweenRow>
    </ItemContainer>
  )
}

export default TaskUserCard
