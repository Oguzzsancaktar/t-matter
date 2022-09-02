import React from 'react'
import { ICustomer } from '@/models'
import { ItemContainer, JustifyCenterColumn } from '@/components'
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

export default CustomerModalActivityTab
