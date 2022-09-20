import colors from '@/constants/colors'
import { initialCategoryCountsFilter } from '@/constants/initialValues'
import { ICustomer, ITaskCategory, IUser } from '@/models'
import { useGetCustomerActivityCategoryCountsQuery } from '@/services/activityService'
import React, { useEffect, useState } from 'react'
import { X, XSquare } from 'react-feather'
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
  handleCategoryFilter: (categoryId: ITaskCategory['_id']) => void
  handleRemoveFilters: () => void
  userFilter?: IUser
  customerId?: ICustomer['_id']
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

const ActivityFilter: React.FC<IProps> = ({
  handleFilterUserChange,
  handleCategoryFilter,
  handleRemoveFilters,
  userFilter,
  customerId
}) => {
  const [categoryCountsFilter, setCategoryCountsFilter] = useState(initialCategoryCountsFilter)

  const { data: activityCategoryCountsData, isLoading: activtyActegoryCountsIsLoading } =
    useGetCustomerActivityCategoryCountsQuery(categoryCountsFilter)

  const onHandleFilterUserChange = (responsible: IUser) => {
    const tempFilter = { ...categoryCountsFilter }
    tempFilter.userId = responsible._id
    handleFilterUserChange(responsible)
    setCategoryCountsFilter(tempFilter)
  }

  const onHandleRemoveFilters = () => {
    const tempFilter = { ...initialCategoryCountsFilter }
    if (customerId) {
      tempFilter.customerId = customerId
    }
    setCategoryCountsFilter(tempFilter)
    handleRemoveFilters()
  }

  const [totalActivity, setTotalActivity] = useState(0)

  useEffect(() => {
    if (activityCategoryCountsData) {
      let total = 0
      activityCategoryCountsData.forEach(cat => (total += cat.count))
      setTotalActivity(total)
    }
    ReactTooltip.rebuild()
  }, [activityCategoryCountsData])

  useEffect(() => {
    if (customerId) {
      const tempFilter = { ...categoryCountsFilter }
      tempFilter.customerId = customerId
      setCategoryCountsFilter(tempFilter)
    }
  }, [customerId])

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
          <UserSelect selectedUser={userFilter} onResponsibleChange={onHandleFilterUserChange} />
        </ItemContainer>
        {activityCategoryCountsData.length > 0 && (
          <ItemContainer
            width="calc(100% - 35px - 1rem - 25px)"
            borderRadius="1rem"
            overflow="hidden"
            margin="0 0.5rem"
          >
            <Row width="100%">
              {activityCategoryCountsData.map((type, index) => (
                <ItemContainer
                  key={index}
                  onClick={() => handleCategoryFilter(type._id?._id)}
                  width={(type.count / totalActivity) * 100 + '%'}
                  margin={totalActivity !== index + 1 && index !== 0 ? ' 0 1px' : ''}
                >
                  <FilterBlock
                    data-tip={type._id?.name + ' - ' + type.count}
                    color={type._id?.color?.color + '90'}
                  ></FilterBlock>
                </ItemContainer>
              ))}
            </Row>
          </ItemContainer>
        )}

        <ItemContainer width="25px" cursorType="pointer" onClick={onHandleRemoveFilters}>
          <XSquare size="25px" color={colors.red.primary} />
        </ItemContainer>
      </JustifyBetweenRow>
    </ItemContainer>
  )
}

export default ActivityFilter
