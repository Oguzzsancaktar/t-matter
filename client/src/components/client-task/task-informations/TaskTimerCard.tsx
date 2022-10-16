import { ProgressBar, TaskTimerMultipleProgressBar } from '@/components'
import { ItemContainer } from '@/components/item-container'
import { Column, JustifyBetweenRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import { useAuth } from '@/hooks/useAuth'
import useInterval from '@/hooks/useInterval'
import { ITaskItem, ITaskUserWorkTime } from '@/models'
import { secondsToHourMin } from '@/utils/timeUtils'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Calendar, Clock } from 'react-feather'

interface IProps {
  taskActiveStep: ITaskItem
  isTaskNotStarted: boolean
  handleTaskTimerChange: (userWorkTime: ITaskUserWorkTime) => void
  handleUserWorkClick: (userId: string) => void
}

const TaskTimerCard: React.FC<IProps> = ({
  taskActiveStep,
  isTaskNotStarted,
  handleTaskTimerChange,
  handleUserWorkClick
}) => {
  const { loggedUser } = useAuth()

  const delay = useMemo<number>(() => 1000, [])

  const [totalPassedTime, setTotalPassedTime] = useState(0)
  const [counterValue, setCounterValue] = useState(0)

  const stepTotalDuration = useMemo(
    () => taskActiveStep.checklistItems.reduce((prev, current) => prev + current.duration, 0),
    [taskActiveStep]
  )

  const isUserWorkingOnTask = useMemo(
    () => taskActiveStep.responsibleUser._id === loggedUser.user?._id,
    [taskActiveStep.responsibleUser._id, loggedUser.user?._id]
  )

  const calculateTotalPassedTime = () => {
    let totalTime = 0
    for (let index = 0; index < taskActiveStep.workedTimes.length; index++) {
      const work = taskActiveStep.workedTimes[index]
      totalTime += work.time
    }
    setTotalPassedTime(totalTime)
  }

  useInterval(
    () => {
      setCounterValue(counterValue + 1)
    },
    isUserWorkingOnTask ? delay : null
  )

  useEffect(() => {
    if (loggedUser.user && !isTaskNotStarted) {
      let userWork: ITaskUserWorkTime = {
        user: loggedUser.user,
        time: 1
      }
      handleTaskTimerChange(userWork)
    }
  }, [counterValue])

  useEffect(() => {
    calculateTotalPassedTime()
  }, [taskActiveStep])

  return (
    <ItemContainer>
      <Column>
        <ItemContainer>
          <JustifyBetweenRow>
            <Row>
              <Clock size={20} color={colors.text.primary} />
              <ItemContainer margin="0 0 0 0.3rem ">
                <H1 color={colors.text.primary} fontWeight="400" width="auto">
                  {secondsToHourMin(totalPassedTime, true)}
                </H1>
              </ItemContainer>
            </Row>
            <ItemContainer width="auto">
              <H1 color={colors.text.primary} fontWeight="400" width="max-content">
                {secondsToHourMin(stepTotalDuration, true)}
              </H1>
            </ItemContainer>
          </JustifyBetweenRow>
        </ItemContainer>
        <ItemContainer>
          <TaskTimerMultipleProgressBar
            isTimeFinished={totalPassedTime >= stepTotalDuration}
            totalDuration={stepTotalDuration}
            workedTimes={taskActiveStep.workedTimes}
            handleUserWorkClick={handleUserWorkClick}
          />
        </ItemContainer>
      </Column>
    </ItemContainer>
  )
}

export default TaskTimerCard
