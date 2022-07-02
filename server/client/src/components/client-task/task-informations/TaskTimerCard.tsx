import { ProgressBar } from '@/components'
import { ItemContainer } from '@/components/item-container'
import { Column, JustifyBetweenRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import React from 'react'
import { Calendar } from 'react-feather'

interface IProps {}
const TaskTimerCard: React.FC<IProps> = () => {
  return (
    <ItemContainer>
      <Column>
        <ItemContainer>
          <JustifyBetweenRow>
            <Row>
              <Calendar size={20} />
              <H1 width="auto">00:02:15</H1>
            </Row>
            <H1 width="auto">00:15:00</H1>
          </JustifyBetweenRow>
        </ItemContainer>
        <ItemContainer>
          <ProgressBar startLabel="Timer" endLabel="Remaining" />
        </ItemContainer>
      </Column>
    </ItemContainer>
  )
}

export default TaskTimerCard
