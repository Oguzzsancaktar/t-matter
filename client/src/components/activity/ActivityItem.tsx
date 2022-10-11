import React from 'react'
import { Baloon, H1, ItemContainer, UserImage } from '@/components'
import { IActivity } from '@/models'
import colors from '@/constants/colors'
import moment from 'moment'
import styled from 'styled-components'
import { RowStyled } from '@/shared'
import { secondsToHourMin } from '@/utils/timeUtils'

interface IProps {
  activity: IActivity
}

const RowBaseline = styled(RowStyled)`
  align-items: flex-start;
  overflow: hidden;
`
const ActivityItem: React.FC<IProps> = ({ activity }) => {
  return (
    <RowBaseline width="100%" padding="1rem 0" height="auto">
      <ItemContainer width="100px" height="100%">
        <H1 textAlign="center" fontSize="0.8rem" width="100%" fontWeight="900" color={colors.text.primary}>
          {moment(activity.createdAt).format('Do YYYY')}
        </H1>
        <H1 textAlign="center" fontSize="0.7rem" color={colors.text.primary} width="100%">
          {moment(activity.createdAt).fromNow()}
        </H1>
        {activity?.usedTime && (
          <H1 textAlign="center" fontSize="0.7rem" color={colors.text.primary} width="100%">
            {secondsToHourMin(activity.usedTime, true)}
          </H1>
        )}
      </ItemContainer>

      <ItemContainer margin="0rem 0.5rem" width="auto" height="100%" position="relative">
        <ItemContainer
          width="1px"
          height="200vh"
          backgroundColor={colors.gray.disabled}
          position="absolute"
          top="-1rem"
          left="50%"
          zIndex="0"
        />

        <ItemContainer width="35px">
          <UserImage
            width="35px"
            height="35px"
            src={activity.owner?.profile_img}
            padding="0"
            margin="0"
            data-tip={activity.owner.firstname + ' ' + activity.owner.lastname}
          />
        </ItemContainer>
      </ItemContainer>

      <ItemContainer width="calc(100% - 35px - 100px - 1rem)">
        <Baloon
          customer={activity.customer}
          task={activity.task}
          type={activity.type}
          title={activity.title}
          content={activity.content}
          date={activity.createdAt}
          links={activity.links}
        />
      </ItemContainer>
    </RowBaseline>
  )
}

export default ActivityItem
