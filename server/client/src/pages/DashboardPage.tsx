import { Baloon, ItemContainer, JustifyBetweenColumn, JustifyBetweenRow, UserBadge } from '@/components'
import { useAuth } from '@hooks/useAuth'
import React, { useEffect } from 'react'
import { useGetActivitiesQuery } from '@services/activityService'
import ActivityItem from '@components/activity/ActivityItem'
import colors from '@/constants/colors'
import ReactTooltip from 'react-tooltip'

const DashboardPage: React.FC = () => {
  const { data, isLoading } = useGetActivitiesQuery({})

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [data])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <ItemContainer padding="1rem" height="calc(100vh - 50px - 2rem)">
      <JustifyBetweenRow height="100%">
        <ItemContainer width="35%" height="100%">
          <JustifyBetweenColumn height="100%">
            <ItemContainer
              borderBottom={'1px solid ' + colors.gray.secondary}
              borderTop={'1px solid ' + colors.gray.secondary}
              borderLeft={'1px solid ' + colors.gray.secondary}
              borderRight={'1px solid ' + colors.gray.secondary}
              borderRadius="0.3rem"
              padding="1rem"
              margin="0.5rem"
            >
              <JustifyBetweenRow>header</JustifyBetweenRow>
            </ItemContainer>
            <ItemContainer
              borderBottom={'1px solid ' + colors.gray.secondary}
              borderTop={'1px solid ' + colors.gray.secondary}
              borderLeft={'1px solid ' + colors.gray.secondary}
              borderRight={'1px solid ' + colors.gray.secondary}
              borderRadius="0.3rem"
              padding="1rem"
              overflow="auto"
              height="100%"
            >
              {data?.map((activity, index) => (
                <ItemContainer height="auto" key={index}>
                  <ActivityItem activity={activity} />
                </ItemContainer>
              ))}
            </ItemContainer>
          </JustifyBetweenColumn>
        </ItemContainer>

        <ItemContainer
          width="30%"
          borderBottom={'1px solid ' + colors.gray.secondary}
          borderTop={'1px solid ' + colors.gray.secondary}
          borderLeft={'1px solid ' + colors.gray.secondary}
          borderRight={'1px solid ' + colors.gray.secondary}
          borderRadius="0.3rem"
          padding="1rem"
          margin="0 1rem"
        >
          asdf
        </ItemContainer>

        <ItemContainer
          width="35%"
          borderBottom={'1px solid ' + colors.gray.secondary}
          borderTop={'1px solid ' + colors.gray.secondary}
          borderLeft={'1px solid ' + colors.gray.secondary}
          borderRight={'1px solid ' + colors.gray.secondary}
          borderRadius="0.3rem"
          padding="1rem"
        >
          zxcv
        </ItemContainer>
      </JustifyBetweenRow>
    </ItemContainer>
  )
}

export default DashboardPage
