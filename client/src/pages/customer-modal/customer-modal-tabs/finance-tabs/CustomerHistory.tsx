import React from 'react'
import { Column, H1, ItemContainer, JustifyBetweenRow } from '@/components'
import styled from 'styled-components'
import { ICustomer, ICustomerHistory } from '@/models'
import { useGetCustomerHistoriesQuery } from '@/services/customers/customerHistoryService'
import { CustomerHistoryTypesColor, CustomerHistoryTypesString } from '@/constants/customerHistoryTypes'
import colors from '@/constants/colors'
import moment from 'moment'
import { FaCheck, FaMailBulk, FaRemoveFormat } from 'react-icons/fa'
import { Row } from '@nextui-org/react'
import CircleImage from '@/components/image/CircleImage'

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
const HistoryItem: React.FC<{ history: ICustomerHistory }> = ({ history }) => {
  return (
    <ItemContainer width="100%" padding="1rem 0" overflow="hidden">
      <JustifyBetweenRow height="auto">
        <ItemContainer width="100px" height="100%">
          <H1 textAlign="center" fontSize="0.8rem" width="100%" fontWeight="900" color={colors.text.primary}>
            {moment(history.createdAt).format('Do MMM')}
          </H1>
        </ItemContainer>
        <ItemContainer width="30px" margin="0 1rem" position="relative" height="100%">
          <ItemContainer
            position="relative"
            zIndex="99"
            borderRadius="50%"
            height="30px"
            width="30px"
            backgroundColor={CustomerHistoryTypesColor[history.type]}
          >
            <Center>
              {history.type === 0 ? (
                <FaMailBulk color={colors.white.primary} />
              ) : history.type === 1 ? (
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
          <Column width="100%">
            <ItemContainer width="100%">
              <Row>
                <H1 width="max-content" fontSize="1rem" fontWeight="bold" color={colors.text.primary}>
                  {CustomerHistoryTypesString[history.type]}{' '}
                </H1>
                <H1 color={colors.gray.middle} fontSize="0.7rem" width="max-content" margin="0 0.2rem">
                  by
                </H1>
                <CircleImage height="25px" width="25px" imageUrl={history.responsible?.profile_img || ''} />
              </Row>
            </ItemContainer>

            <H1 fontSize="0.7rem" color={colors.text.primary} width="100%">
              {moment(history.createdAt).fromNow()}
            </H1>
          </Column>
        </ItemContainer>
      </JustifyBetweenRow>
    </ItemContainer>
  )
}

const CustomerHistory: React.FC<IProps> = ({ customerId }) => {
  const { data: customerHistoryData, isLoading: customerHistoryIsLoading } = useGetCustomerHistoriesQuery(customerId)

  console.log(customerHistoryData)

  return (
    <ItemContainer height="100%" padding="0 1rem" overflow="auto">
      {customerHistoryIsLoading && <div>Loading...</div>}

      {customerHistoryData?.map(history => (
        <HistoryItem history={history} />
      ))}
    </ItemContainer>
  )
}

export default CustomerHistory
