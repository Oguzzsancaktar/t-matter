import React from 'react'
import { ICustomer } from '@/models'
import { InnerWrapper, JustifyCenterColumn } from '@/components'
import { useGetActivitiesQuery } from '@services/activityService'
import ActivityItem from '@components/activity/ActivityItem'

interface IProps {
  customerId: ICustomer['_id']
}

const CustomerModalActivityTab: React.FC<IProps> = ({ customerId }) => {
  const { data, isLoading } = useGetActivitiesQuery({ customer: customerId })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div style={{ height: '700px', overflow: 'auto' }}>
      <InnerWrapper>
        <JustifyCenterColumn>
          {data?.map(activity => (
            <ActivityItem activity={activity} />
          ))}
        </JustifyCenterColumn>
      </InnerWrapper>
    </div>
  )
}

export default CustomerModalActivityTab
