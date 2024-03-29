import React, { useEffect, useState } from 'react'
import { EActivity, ICustomer, ITaskCategory, IUser } from '@/models'
import { ActivityFilter, Column, ItemContainer, JustifyCenterColumn, NoTableData } from '@/components'
import { useGetActivitiesQuery } from '@services/activityService'
import ActivityItem from '@components/activity/ActivityItem'
import ReactTooltip from 'react-tooltip'
import { emptyActivtyFilter } from '@/constants/queryParams'

interface IProps {
  customerId: ICustomer['_id']
}

const CustomerModalActivityTab: React.FC<IProps> = ({ customerId }) => {
  const [activityFilter, setActivityFilter] = useState({ ...emptyActivtyFilter, customerId })
  const { data, isLoading } = useGetActivitiesQuery(activityFilter)

  const [userFilter, setUserFilter] = useState<IUser>()

  const handleFilterUserChange = (user: IUser) => {
    setActivityFilter({ ...activityFilter, userId: user._id })
    setUserFilter(user)
  }

  const handleTypeFilter = (categoryId: ITaskCategory['_id']) => {
    setActivityFilter({ ...activityFilter, categoryId })
  }

  const handleRemoveFilters = () => {
    setActivityFilter({ ...emptyActivtyFilter, customerId })
  }

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [data])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <ItemContainer padding="1rem" height="100%" overflow="hidden">
      <Column height="100%">
        <ItemContainer height="40px">
          <ActivityFilter
            userFilter={userFilter}
            handleFilterUserChange={handleFilterUserChange}
            handleCategoryFilter={handleTypeFilter}
            handleRemoveFilters={handleRemoveFilters}
            customerId={customerId}
          />
        </ItemContainer>

        <ItemContainer height="100%" margin="1rem 0 0 0" overflow="auto">
          {!data || data?.length === 0 ? (
            <NoTableData />
          ) : (
            data?.map((activity, index) => (
              <ItemContainer height="auto" key={index}>
                <ActivityItem activity={activity} />
              </ItemContainer>
            ))
          )}
        </ItemContainer>
      </Column>
    </ItemContainer>
  )
}

export default CustomerModalActivityTab
