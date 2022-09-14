import React from 'react'
import { Baloon, JustifyCenterRow, UserImage } from '@/components'
import { IActivity } from '@/models'

interface IProps {
  activity: IActivity
}

const ActivityItem: React.FC<IProps> = ({ activity }) => {
  console.log('q', activity)
  return (
    <JustifyCenterRow width="100%" margin="0 0 16px 0">
      <UserImage
        margin="0 8px 0 0"
        width="50px"
        height="50px"
        src="https://via.placeholder.com/150"
        data-tip={activity.owner.firstname + ' ' + activity.owner.lastname}
      />
      <Baloon
        customer={activity.customer}
        task={activity.task}
        type={activity.type}
        title={activity.title}
        content={activity.content}
        date={activity.createdAt}
        links={activity.links}
      />
    </JustifyCenterRow>
  )
}

export default ActivityItem
