import { DatePicker } from '@/components/date-picker'
import { ItemContainer } from '@/components/item-container'
import { Column, JustifyBetweenRow, Row } from '@/components/layout'
import { ProgressBar } from '@/components/progress-bar'
import { H1 } from '@/components/texts'
import React from 'react'
import { Calendar } from 'react-feather'

interface IProps {}
const TaskDeadlineCard: React.FC<IProps> = () => {
  const handleDateChange = () => {}

  return (
    <ItemContainer>
      <Column>
        <ItemContainer>
          <JustifyBetweenRow>
            <Row>
              <Calendar size={20} />
              <H1 width="auto">Start date</H1>
            </Row>
            <H1 width="auto">3days</H1>
          </JustifyBetweenRow>
        </ItemContainer>
        <ItemContainer>
          <ProgressBar startLabel="Start Date" endLabel="Expire Date" />
        </ItemContainer>
      </Column>
    </ItemContainer>
  )
}

export default TaskDeadlineCard
