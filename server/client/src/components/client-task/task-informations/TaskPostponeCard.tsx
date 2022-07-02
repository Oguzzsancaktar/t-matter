import { ProgressBar } from '@/components'
import { ItemContainer } from '@/components/item-container'
import { Column, JustifyBetweenRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import React from 'react'
import { Calendar, ExternalLink } from 'react-feather'

interface IProps {}
const TaskPostponeCard: React.FC<IProps> = () => {
  return (
    <ItemContainer>
      <Column>
        <ItemContainer>
          <JustifyBetweenRow>
            <Row>
              <ExternalLink size={20} />
              <H1 width="auto">14/11/2022</H1>
            </Row>
            <H1 width="auto">4/1</H1>
          </JustifyBetweenRow>
        </ItemContainer>
        <ItemContainer>
          <ProgressBar startLabel="Postponed" endLabel="Remaining" />
        </ItemContainer>
      </Column>
    </ItemContainer>
  )
}

export default TaskPostponeCard
