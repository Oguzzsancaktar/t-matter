import { DatePicker, ProgressBar } from '@/components'
import { ItemContainer } from '@/components/item-container'
import { Column, JustifyBetweenRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import { ITaskItem } from '@/models'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { Calendar, ExternalLink } from 'react-feather'
import Flatpickr from 'react-flatpickr'

interface IProps {
  taskActiveStep: ITaskItem
  onPostponeChange: (value: Date[], dateText: string) => void
}
const TaskPostponeCard: React.FC<IProps> = ({ taskActiveStep, onPostponeChange }) => {
  const [postponeDate, setPostponeDate] = useState({ value: [new Date(taskActiveStep.postponedDate)], dateText: '' })
  const notInitialRender = useRef(false)

  const onDateChange = (value: Date[], dateText: string) => {
    setPostponeDate({ value, dateText })
  }

  useEffect(() => {
    if (notInitialRender.current) {
      onPostponeChange(postponeDate.value, postponeDate.dateText)
    } else {
      notInitialRender.current = true
    }
  }, [postponeDate])

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
                  onChange={onDateChange}
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
            completionColor={
              taskActiveStep?.usedPostpone > taskActiveStep?.postponeTime ? colors.orange.primary : colors.blue.primary
            }
            completionPercentage={(taskActiveStep?.usedPostpone / taskActiveStep?.postponeTime) * 100}
            startLabel="Postponed"
            endLabel="Remaining"
          />
        </ItemContainer>
      </Column>
    </ItemContainer>
  )
}

export default TaskPostponeCard
