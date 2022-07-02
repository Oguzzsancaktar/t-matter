import { Badge } from '@/components/badge'
import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenRow, JustifyCenterColumn, JustifyCenterRow } from '@/components/layout'
import { H1 } from '@/components/texts'
import { UserSelect } from '@/components/user-select'
import colors from '@/constants/colors'
import React from 'react'

interface IProps {}
const TaskUserCard: React.FC<IProps> = () => {
  return (
    <ItemContainer>
      <JustifyBetweenRow>
        <ItemContainer>
          <JustifyCenterColumn>
            <ItemContainer>
              <UserSelect />
            </ItemContainer>

            <ItemContainer>
              <JustifyCenterRow>
                <Badge children={'pending'} color={colors.blue.primary} />
              </JustifyCenterRow>
            </ItemContainer>
          </JustifyCenterColumn>
        </ItemContainer>

        <ItemContainer>
          <H1>Task Name</H1>
        </ItemContainer>
      </JustifyBetweenRow>
    </ItemContainer>
  )
}

export default TaskUserCard
