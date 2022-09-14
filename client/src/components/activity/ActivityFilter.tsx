import colors from '@/constants/colors'
import { EActivity, ITaskCategory, IUser } from '@/models'
import { useGetActivitiesQuery, useGetCustomerActivityCategoryCountsQuery } from '@/services/activityService'
import { selectColorForActivityType } from '@/utils/statusColorUtil'
import React, { useEffect, useMemo, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'
import { ItemContainer } from '../item-container'
import { JustifyBetweenRow, Row } from '../layout'
import { UserSelect } from '../user-select'

interface IStyledProps {
  color: string
}

interface IProps {
  handleFilterUserChange: (responsible: IUser) => void
  handleCategoryFilter: (activityType: ITaskCategory['_id']) => void
  userFilter?: IUser
}
const FilterBlock = styled.div<IStyledProps>`
  height: 8px;
  width: 100%;
  background-color: ${({ color }) => color};
  color: ${colors.white.primary};
  text-align: center;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const ActivityFilter: React.FC<IProps> = ({ handleFilterUserChange, handleCategoryFilter, userFilter }) => {
  const { data: activityCategoryCountsData, isLoading: activtyActegoryCountsIsLoading } =
    useGetCustomerActivityCategoryCountsQuery()

  const [totalActivity, setTotalActivity] = useState(0)

  useEffect(() => {
    if (activityCategoryCountsData) {
      let total = 0
      activityCategoryCountsData.forEach(cat => (total += cat.count))
      setTotalActivity(total)
    }
    ReactTooltip.rebuild()
  }, [activityCategoryCountsData])

  if (activtyActegoryCountsIsLoading) {
    return <div>Loading...</div>
  }

  if (!activityCategoryCountsData) {
    return <div>Activiries Loading...</div>
  }

  return (
    <ItemContainer width="100%" height="100%">
      <JustifyBetweenRow width="100%" height="100%">
        <ItemContainer width="35px" height="35px">
          <UserSelect selectedUser={userFilter} onResponsibleChange={handleFilterUserChange} />
        </ItemContainer>
        <ItemContainer width="calc(100% - 35px - 1rem)" borderRadius="1rem" overflow="hidden" margin="auto">
          <Row width="100%">
            {activityCategoryCountsData.map((type, index) => (
              <ItemContainer
                key={index}
                onClick={() => handleCategoryFilter(type._id?._id)}
                width={(type.count / totalActivity) * 100 + '%'}
                margin={totalActivity !== index + 1 && index !== 0 ? ' 0 1px' : ''}
              >
                <FilterBlock data-tip={type + ' - ' + type.count} color={type._id?.color + '90'}></FilterBlock>
              </ItemContainer>
            ))}
          </Row>
        </ItemContainer>
      </JustifyBetweenRow>
    </ItemContainer>
  )
}

export default ActivityFilter
