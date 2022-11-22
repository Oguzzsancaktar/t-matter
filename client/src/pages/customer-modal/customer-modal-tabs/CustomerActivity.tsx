import React from 'react'
import { Column, H1, ItemContainer, JustifyBetweenRow } from '@/components'
import styled from 'styled-components'
import { ICustomer, ICustomerActivity } from '@/models'
import { useGetCustomerActivitiesQuery } from '@/services/customers/customerActivityService'
import { CustomerActivityTypesColor, CustomerActivityTypesString } from '@/constants/customerActivityTypes'
import colors from '@/constants/colors'
import moment from 'moment'
import { FaCheck, FaMailBulk, FaRemoveFormat } from 'react-icons/fa'

interface IProps {
  customerId: ICustomer['_id']
}
const Center = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ActivityItem: React.FC<{ activity: ICustomerActivity }> = ({ activity }) => {
  return (
    <ItemContainer width="100%" padding="1rem 0" overflow="hidden">
      <JustifyBetweenRow height="auto">
        <ItemContainer width="100px" height="100%">
          <H1 textAlign="center" fontSize="14px" width="100%" fontWeight="900" color={colors.text.primary}>
            {moment(activity.createdAt).format('Do MMM')}
          </H1>
        </ItemContainer>
        <ItemContainer width="30px" margin="0 1rem" position="relative" height="100%">
          <ItemContainer
            position="relative"
            zIndex="99"
            borderRadius="50%"
            height="30px"
            width="30px"
            backgroundColor={CustomerActivityTypesColor[activity.type]}
          >
            <Center>
              {activity.type === 0 ? (
                <FaMailBulk color={colors.white.primary} />
              ) : activity.type === 1 ? (
                <FaCheck color={colors.white.primary} />
              ) : (
                <FaRemoveFormat color={colors.white.primary} />
              )}
            </Center>
          </ItemContainer>

          <ItemContainer
            height="400%"
            width="1px"
            backgroundColor={colors.gray.disabled}
            position="absolute"
            top="-1rem"
            left="50%"
            zIndex="0"
          />
        </ItemContainer>
        <ItemContainer>
          <Column>
            <H1 width="100%" fontSize="16px" fontWeight="bold" color={colors.text.primary}>
              {CustomerActivityTypesString[activity.type]}
            </H1>

            <H1 fontSize="13px" color={colors.text.primary} width="100%">
              {moment(activity.createdAt).fromNow()}
            </H1>
          </Column>
        </ItemContainer>
      </JustifyBetweenRow>
    </ItemContainer>
  )
}

const CustomerActivity: React.FC<IProps> = ({ customerId }) => {
  const { data: customerActivityData, isLoading: customerActivityIsLoading } = useGetCustomerActivitiesQuery(customerId)

  return (
    <ItemContainer height="100%" padding="0 1rem" overflow="auto">
      {customerActivityIsLoading && <div>Loading...</div>}

      {customerActivityData?.map((activity, index) => (
        <ActivityItem activity={activity} key={index} />
      ))}
    </ItemContainer>
  )
}

export default CustomerActivity
