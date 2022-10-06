import { secondsToHourMin } from '@/utils/timeUtils'
import React, { useMemo, useState } from 'react'
import { useInterval } from 'usehooks-ts'
import { ItemContainer } from '../item-container'

interface IProps {
  setCount?: (value: number) => void
  count?: number
}
const TaskNoteCounter: React.FC<IProps> = () => {
  const delay = useMemo<number>(() => 1000, [])
  const [count, setCount] = useState(0)

  useInterval(() => {
    setCount(count + 1)
  }, delay)

  return <ItemContainer>{secondsToHourMin(Math.round(count), true)}</ItemContainer>
}

export default TaskNoteCounter
