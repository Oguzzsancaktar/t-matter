import React from 'react'
import { ICustomer } from '@/models'
import { Baloon, InnerWrapper, JustifyCenterColumn } from '@/components'
import { useGetActivitiesQuery } from '@services/activityService'

interface IProps {
  customerId: ICustomer['_id']
}

const CustomerModalActivityTab: React.FC<IProps> = ({ customerId }) => {
  const { data, isLoading } = useGetActivitiesQuery({ customer: customerId })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <InnerWrapper>
      {data?.map(activity => (
        <JustifyCenterColumn width="100%" margin="0 0 16px 0">
          <Baloon title={activity.title} content={activity.content} date={activity.createdAt} />
        </JustifyCenterColumn>
      ))}
    </InnerWrapper>
  )
}

export default CustomerModalActivityTab
