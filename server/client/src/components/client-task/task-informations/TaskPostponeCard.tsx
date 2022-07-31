import { DatePicker, ProgressBar } from '@/components'
import { ItemContainer } from '@/components/item-container'
import { Column, JustifyBetweenRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import { ITaskItem } from '@/models'
import moment from 'moment'
import React, { useState } from 'react'
import { Calendar, ExternalLink } from 'react-feather'
import Flatpickr from 'react-flatpickr'

interface IProps {
  taskActiveStep: ITaskItem
  onPostponeChange: (value: Date[], dateText: string) => void
}
const TaskPostponeCard: React.FC<IProps> = ({ taskActiveStep, onPostponeChange }) => {
  return (
    <ItemContainer>
      <Column>
        <ItemContainer>
          <JustifyBetweenRow>
            <Row>
              <ExternalLink size={20} />
              <H1 width="auto">
                <Flatpickr
                  options={{
                    enableTime: false,
                    dateFormat: 'M/d/Y'
                  }}
                  value={taskActiveStep.postponedDate}
                  onChange={onPostponeChange}
                  placeholder="Postpone Task"
                />
              </H1>
            </Row>
            <H1 width="80px">
              {taskActiveStep?.usedPostpone} / {taskActiveStep?.postponeTime}
            </H1>
          </JustifyBetweenRow>
        </ItemContainer>
        <ItemContainer>
          <ProgressBar
            completionColor={colors.blue.primary}
            completionPercentage={taskActiveStep?.usedPostpone / taskActiveStep?.postponeTime}
            startLabel="Postponed"
            endLabel="Remaining"
          />
        </ItemContainer>
      </Column>
    </ItemContainer>
  )
}

export default TaskPostponeCard
