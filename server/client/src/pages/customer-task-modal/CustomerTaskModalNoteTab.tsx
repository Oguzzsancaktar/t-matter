import React from 'react'
import { useGetActivitiesQuery } from '@services/activityService'
import { ITask } from '@/models'
import { ItemContainer, JustifyCenterColumn } from '@/components'
import ActivityItem from '@components/activity/ActivityItem'
interface IProps {
  task: ITask['_id']
  step: number
}
const CustomerTaskModalNoteTab: React.FC<IProps> = ({ task, step }) => {
  const { data, isLoading } = useGetActivitiesQuery({ task, step })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div style={{ height: '700px', overflow: 'auto' }}>
      <ItemContainer>
        <JustifyCenterColumn>
          {data?.map((activity, index) => (
            <ItemContainer height="auto" key={index}>
              <ActivityItem activity={activity} />
            </ItemContainer>
          ))}
        </JustifyCenterColumn>
      </ItemContainer>
    </div>
  )
}

export default CustomerTaskModalNoteTab
