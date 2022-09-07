import { ProgressBar } from '@/components'
import { ItemContainer } from '@/components/item-container'
import { Column, JustifyBetweenRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import { useAuth } from '@/hooks/useAuth'
import { EStatus, ETaskStatus, ITaskItem } from '@/models'
import { secondsToHourMin } from '@/utils/timeUtils'
import React, { useEffect, useState } from 'react'
import { Calendar } from 'react-feather'

interface IProps {
  taskActiveStep: ITaskItem
  isTaskNotStarted: boolean
  handleTaskTimerChange: (timerValue: number) => void
}
const TaskTimerCard: React.FC<IProps> = ({ taskActiveStep, isTaskNotStarted, handleTaskTimerChange }) => {
  let timer
  const { loggedUser } = useAuth()
  const [passedTime, setPassedTime] = useState(taskActiveStep?.passedTime)

  const [totalDuration, setTotalDuration] = useState(
    taskActiveStep?.checklistItems.reduce((acc, item) => acc + item?.duration, 0)
  )

  const updateCount = () => {
    timer =
      !timer &&
      setInterval(() => {
        setPassedTime(prevCount => {
          handleTaskTimerChange(prevCount + 1)
          return prevCount + 1
        })
      }, 1000)
  }

  useEffect(() => {
    setTotalDuration(taskActiveStep?.checklistItems.reduce((acc, item) => acc + item?.duration, 0))
    setPassedTime(taskActiveStep?.passedTime)
    if (
      loggedUser.user?._id === taskActiveStep?.responsibleUser?._id &&
      !isTaskNotStarted &&
      taskActiveStep.stepStatus === ETaskStatus['Progress']
    ) {
      updateCount()
    }
    return () => clearInterval(timer)
  }, [loggedUser, taskActiveStep, timer])

  return (
    <ItemContainer>
      <Column>
        <ItemContainer>
          <JustifyBetweenRow>
            <Row>
              <Calendar size={20} color={colors.text.primary} />
              <ItemContainer margin="0 0 0 0.3rem ">
                <H1 color={colors.text.primary} fontWeight="400" width="auto">
                  {secondsToHourMin(passedTime, true)}
                </H1>
              </ItemContainer>
            </Row>
            <ItemContainer width="auto">
              <H1 color={colors.text.primary} fontWeight="400" width="max-content">
                {secondsToHourMin(totalDuration, true)}
              </H1>
            </ItemContainer>
          </JustifyBetweenRow>
        </ItemContainer>
        <ItemContainer>
          <ProgressBar
            completionColor={passedTime > totalDuration ? colors.orange.primary : colors.blue.primary}
            completionPercentage={(passedTime / totalDuration) * 100}
            // startLabel="Timer"
            // endLabel="Remaining"
          />
        </ItemContainer>
      </Column>
    </ItemContainer>
  )
}

export default TaskTimerCard
