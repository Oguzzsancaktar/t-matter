import React from 'react'
import { Baloon, H1, ItemContainer, JustifyCenterColumn, JustifyCenterRow, UserImage } from '@/components'
import { IActivity } from '@/models'
import colors from '@/constants/colors'
import moment from 'moment'
import styled from 'styled-components'

interface IProps {
  activity: IActivity
}

const ActivityItem: React.FC<IProps> = ({ activity }) => {
  const CustomItemContainer = styled(JustifyCenterRow)`
    align-items: baseline;
    /* max-height: 200px; */
    /* overflow: auto; */
  `
  return (
    <CustomItemContainer width="100%" margin="0 0 16px 0" height="auto">
      <ItemContainer width="100px" height="100%">
        <JustifyCenterColumn width="auto">
          <H1 textAlign="center" fontSize="0.8rem" fontWeight="900" color={colors.text.primary}>
            {moment(activity.createdAt).format('Do YYYY')}
          </H1>
          <H1 textAlign="center" fontSize="0.7rem" color={colors.text.primary} width="max-content">
            {moment(activity.createdAt).fromNow()}
          </H1>
        </JustifyCenterColumn>
      </ItemContainer>
      <ItemContainer
        transform="translate(0%, 35%);"
        margin="1rem 0.5rem 0 0.5rem"
        width="auto"
        height="100%"
        position="relative"
      >
        <ItemContainer
          width="1px"
          height="100vh"
          backgroundColor={colors.gray.disabled}
          position="absolute"
          left="50%"
          top="-50px"
        />

        <ItemContainer width="35px">
          <UserImage
            width="35px"
            height="35px"
            src={activity.owner?.profile_img}
            padding="0"
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
    </CustomItemContainer>
  )
}

export default ActivityItem
