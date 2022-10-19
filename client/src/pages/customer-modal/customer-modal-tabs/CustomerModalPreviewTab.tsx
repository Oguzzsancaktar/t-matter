import React, { useEffect, useState } from 'react'
import { EActivity, ICustomer, ITaskCategory, IUser } from '@/models'
import {
  ActivityFilter,
  Column,
  ItemContainer,
  JustifyBetweenRow,
  JustifyCenterColumn,
  NoTableData
} from '@/components'
import { useGetActivitiesQuery } from '@services/activityService'
import ActivityItem from '@components/activity/ActivityItem'
import ReactTooltip from 'react-tooltip'
import { emptyActivtyFilter } from '@/constants/queryParams'
import { AdditionalTimeDonut, DiscountedInvoicesDonut, InvoicesDonut, NonBillableCircleProgress } from './finance-tabs'

interface IProps {
  customerId: ICustomer['_id']
}

const CustomerModalPreviewTab: React.FC<IProps> = ({ customerId }) => {
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
        <ItemContainer height="250px" margin="0 0 1rem 0">
          <JustifyBetweenRow>
            <ItemContainer>chart 1</ItemContainer>

            <ItemContainer>chart 1</ItemContainer>

            <ItemContainer>chart 1</ItemContainer>

            <ItemContainer>chart 1</ItemContainer>
          </JustifyBetweenRow>
        </ItemContainer>

        <ItemContainer height="calc(100% - 250px - 1rem)">
          <JustifyBetweenRow>
            <ItemContainer height="100%">
              <JustifyCenterColumn>
                <ItemContainer height="calc(100% - 250px - 1rem)">bar chart</ItemContainer>

                <ItemContainer height="250px">
                  <JustifyBetweenRow height="100%">
                    <InvoicesDonut selectedInvoice={undefined} onSelect={() => {}} customerId={customerId} />
                    <DiscountedInvoicesDonut selectedInvoice={undefined} onSelect={() => {}} customerId={customerId} />
                    <NonBillableCircleProgress customerId={customerId} />
                    <AdditionalTimeDonut customerId={customerId} />
                  </JustifyBetweenRow>
                </ItemContainer>
              </JustifyCenterColumn>
            </ItemContainer>

            <ItemContainer height="100%">Task activity</ItemContainer>
          </JustifyBetweenRow>
        </ItemContainer>
      </Column>
    </ItemContainer>
  )
}

export default CustomerModalPreviewTab
