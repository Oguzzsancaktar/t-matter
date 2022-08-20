import colors from '@/constants/colors'
import { EActivity, IUser } from '@/models'
import { useGetActivitiesQuery } from '@/services/activityService'
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

const ActivityFilter = () => {
  const { data: activitiesData, isLoading } = useGetActivitiesQuery({})

  const activityTypesArr = useMemo(() => Object.keys(EActivity), [EActivity])
  const activityTypes = [...JSON.parse(JSON.stringify(activityTypesArr))].slice(
    activityTypesArr.length / 2,
    activityTypesArr.length
  )
  const obj = activityTypes.reduce((o, key) => Object.assign(o, { [key]: 0 }), {})

  const [userFilter, setUserFilter] = useState<IUser>()
  const [typeFilter, setTypeFilter] = useState<EActivity>()

  const [activityTypeValues, setActivityTypeValues] = useState(obj)

  const handleFilterUserChange = (user: IUser) => {
    setUserFilter(user)
  }

  const handleTypeFilter = (type: EActivity) => {
    setTypeFilter(type)
  }

  useEffect(() => {
    ReactTooltip.rebuild()

    if (activitiesData) {
      const stepStatusesR = activitiesData.reduce(
        (acc, activity) => {
          if (activity.type === EActivity.NORMAL_NOTE) {
            acc.NORMAL_NOTE++
          }
          if (activity.type === EActivity.TASK_CANCELED) {
            acc.TASK_CANCELED++
          }
          if (activity.type === EActivity.TASK_CHECKLIST_CHECKED) {
            acc.TASK_CHECKLIST_CHECKED++
          }
          if (activity.type === EActivity.TASK_FINISHED) {
            acc.TASK_FINISHED++
          }

          if (activity.type === EActivity.TASK_POSTPONED) {
            acc.TASK_POSTPONED++
          }

          if (activity.type === EActivity.TASK_POSTPONED) {
            acc.TASK_POSTPONED++
          }

          if (activity.type === EActivity.TASK_RESPONSIBLE_CHANGED) {
            acc.TASK_RESPONSIBLE_CHANGED++
          }

          if (activity.type === EActivity.TASK_STARTED) {
            acc.TASK_STARTED++
          }
          return acc
        },
        { ...obj }
      )
      setActivityTypeValues(stepStatusesR)
    }
  }, [activitiesData])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!activitiesData) {
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
            {activityTypes.map((type, index) => (
              <ItemContainer
                key={index}
                onClick={() => handleTypeFilter(+EActivity[type])}
                width={(activityTypeValues[type] / activitiesData.length) * 100 + '%'}
                margin={activityTypes.length !== index + 1 && index !== 0 ? ' 0 1px' : ''}
              >
                <FilterBlock
                  data-tip={type.split('_').join(' ') + ' - ' + activityTypeValues[type]}
                  color={selectColorForActivityType(+EActivity[type]) + '90'}
                ></FilterBlock>
              </ItemContainer>
            ))}
          </Row>
        </ItemContainer>
      </JustifyBetweenRow>
    </ItemContainer>
  )
}

export default ActivityFilter
