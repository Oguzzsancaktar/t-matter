import { Badge } from '@/components/badge'
import { ItemContainer } from '@/components/item-container'
import { Column, JustifyBetweenRow, JustifyCenterColumn, JustifyCenterRow } from '@/components/layout'
import { Tab } from '@/components/tab'
import { H1 } from '@/components/texts'
import { UserSelect } from '@/components/user-select'
import colors from '@/constants/colors'
import React from 'react'

interface IProps {}
const TaskEventSection: React.FC<IProps> = () => {
  return (
    <ItemContainer>
      <Column>
        <ItemContainer>
          <JustifyCenterRow>
            <Tab
              name={'Note'}
              index={0}
              isActive={false}
              onClick={function (e: React.MouseEvent<Element, MouseEvent>): void {
                throw new Error('Function not implemented.')
              }}
            />
          </JustifyCenterRow>
        </ItemContainer>

        <ItemContainer>tab</ItemContainer>
      </Column>
    </ItemContainer>
  )
}

export default TaskEventSection
