import React from 'react'
import { useGetActivitiesQuery } from '@services/activityService'
import { ITask } from '@/models'
import { ItemContainer, JustifyCenterColumn } from '@/components'
import ActivityItem from '@components/activity/ActivityItem'
interface IProps {
  task: ITask['_id']
  step: number
  taskNoteFilterUserId: string
}
const CustomerTaskModalNoteTab: React.FC<IProps> = ({ task, step, taskNoteFilterUserId }) => {
  const { data, isLoading } = useGetActivitiesQuery({
    task,
    step,
    userId: taskNoteFilterUserId.length ? taskNoteFilterUserId : undefined
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <ItemContainer>
      <JustifyCenterColumn>
        {data?.map((activity, index) => (
          <ItemContainer height="auto" key={index} overflow="hidden">
            <ActivityItem activity={activity} updatable={true} />
          </ItemContainer>
        ))}
      </JustifyCenterColumn>
    </ItemContainer>
  )
}

export default CustomerTaskModalNoteTab
