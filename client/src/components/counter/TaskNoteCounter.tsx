import { useAnimationFrame } from '@/hooks/useAnimationFrame'
import { secondsToHourMin } from '@/utils/timeUtils'
import React from 'react'
import { ItemContainer } from '../item-container'

interface IProps {
  setCount?: (value: number) => void
  count?: number
}
const TaskNoteCounter: React.FC<IProps> = () => {
  const [count, setCount] = React.useState(0)

  useAnimationFrame(deltaTime => {
    setCount(prevCount => (prevCount + deltaTime * 0.001) % 100)
  })

  return <ItemContainer>{secondsToHourMin(Math.round(count), true)}</ItemContainer>
}

export default TaskNoteCounter
