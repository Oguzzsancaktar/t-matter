import { DatePicker } from '@/components/date-picker'
import { ItemContainer } from '@/components/item-container'
import { Column, JustifyBetweenRow, Row } from '@/components/layout'
import { ProgressBar } from '@/components/progress-bar'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import { ITaskItem } from '@/models'
import moment from 'moment'
import React from 'react'
import { Calendar } from 'react-feather'

interface IProps {
  taskActiveStep: ITaskItem
}
const TaskDeadlineCard: React.FC<IProps> = ({ taskActiveStep }) => {
  const percentage =
    (moment(Date.now()).diff(moment(taskActiveStep.startDate)) /
      moment(taskActiveStep.endDate).diff(moment(taskActiveStep.startDate))) *
    100

  return (
    <ItemContainer>
      <Column>
        <ItemContainer>
          <JustifyBetweenRow>
            <Row>
              <Calendar size={20} />
              <H1 width="auto">{moment(taskActiveStep.startDate).format('MMMM DD YYYY')}</H1>
            </Row>
            <ItemContainer width="80px">
              <H1>{moment(taskActiveStep.endDate).diff(moment(Date.now()), 'days')} days</H1>
            </ItemContainer>
          </JustifyBetweenRow>
        </ItemContainer>
        <ItemContainer>
          <ProgressBar
            completionColor={colors.blue.primary}
            completionPercentage={percentage}
            startLabel="Start Date"
            endLabel="Expire Date"
          />
        </ItemContainer>
      </Column>
    </ItemContainer>
  )
}

export default TaskDeadlineCard
