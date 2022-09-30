import { ProgressBar } from '@/components'
import { ItemContainer } from '@/components/item-container'
import { Column, JustifyBetweenRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import { useAnimationFrame } from '@/hooks/useAnimationFrame'
import { useAuth } from '@/hooks/useAuth'
import { ITaskItem } from '@/models'
import { secondsToHourMin } from '@/utils/timeUtils'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Calendar } from 'react-feather'

interface IProps {
  taskActiveStep: ITaskItem
  isTaskNotStarted: boolean
  handleTaskTimerChange: (timerValue: number) => void
}

const TaskTimerCard: React.FC<IProps> = ({ taskActiveStep, isTaskNotStarted, handleTaskTimerChange }) => {
  const { loggedUser } = useAuth()

  const findActiveWorker = useCallback(
    () => taskActiveStep.passedTime.find(work => work.user._id === taskActiveStep.responsibleUser._id),
    []
  )

  const [workerData, setWorkerData] = useState(findActiveWorker)

  const [willTimerWork, setWillTimerWork] = useState<boolean>(
    loggedUser.user?._id === taskActiveStep.responsibleUser._id && !isTaskNotStarted
  )

  const [passedTime, setPassedTime] = useState(workerData?.time || 0)

  const totalDuration = useMemo(
    () => taskActiveStep?.checklistItems.reduce((acc, item) => acc + item?.duration, 0),
    [taskActiveStep]
  )

  useAnimationFrame(deltaTime => {
    console.log(willTimerWork)
    setPassedTime(prevCount => {
      if (willTimerWork) {
        console.log(1)
        return prevCount + deltaTime * 0.001
      } else {
        console.log(2)
        return prevCount
      }
    })
  })

  console.log(workerData)

  useEffect(() => {
    setWillTimerWork(loggedUser.user?._id === taskActiveStep.responsibleUser._id && !isTaskNotStarted)
  }, [taskActiveStep.responsibleUser._id])

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
