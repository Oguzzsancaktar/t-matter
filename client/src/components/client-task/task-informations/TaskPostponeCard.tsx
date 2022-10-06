import { DatePicker, ProgressBar } from '@/components'
import { ItemContainer } from '@/components/item-container'
import { Column, JustifyBetweenRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import { useAuth } from '@/hooks/useAuth'
import { ETaskStatus, ITaskItem } from '@/models'
import moment from 'moment'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Calendar, ExternalLink } from 'react-feather'
import Flatpickr from 'react-flatpickr'

interface IProps {
  taskActiveStep: ITaskItem
  onPostponeChange: (value: Date[], dateText: string) => void
}
const TaskPostponeCard: React.FC<IProps> = ({ taskActiveStep, onPostponeChange }) => {
  const [postponeDate, setPostponeDate] = useState({ value: [new Date(taskActiveStep.postponedDate)], dateText: '' })
  const canTaskPostpone: boolean = taskActiveStep.stepStatus === ETaskStatus['Progress']

  const onDateChange = (value: Date[], dateText: string) => {
    setPostponeDate({ value, dateText })
    onPostponeChange(value, dateText)
  }

  return (
    <ItemContainer>
      <Column>
        <ItemContainer>
          <JustifyBetweenRow>
            <Row>
              <ExternalLink size={20} color={colors.text.primary} />
              <ItemContainer margin="0 0 0 -0.2rem ">
                <Flatpickr
                  disabled={!canTaskPostpone}
                  options={{
                    enableTime: false,
                    dateFormat: 'M/d/Y'
                  }}
                  value={taskActiveStep.postponedDate}
                  onChange={onDateChange}
                  placeholder="Postpone Task"
                />
              </ItemContainer>
            </Row>
            <ItemContainer width="auto">
              <H1 width="max-content" fontWeight="400" color={colors.text.primary}>
                {taskActiveStep?.usedPostpone} / {taskActiveStep?.postponeTime}
              </H1>
            </ItemContainer>
          </JustifyBetweenRow>
        </ItemContainer>
        <ItemContainer margin="-0.4rem 0 0 0">
          <ProgressBar
            completionColor={
              taskActiveStep?.usedPostpone > taskActiveStep?.postponeTime ? colors.orange.primary : colors.blue.primary
            }
            completionPercentage={(taskActiveStep?.usedPostpone / taskActiveStep?.postponeTime) * 100}
            // startLabel="Postponed"
            // endLabel="Remaining"
          />
        </ItemContainer>
      </Column>
    </ItemContainer>
  )
}

export default TaskPostponeCard
