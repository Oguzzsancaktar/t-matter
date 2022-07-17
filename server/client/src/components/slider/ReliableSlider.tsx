import colors from '@/constants/colors'
import { ECustomerType, EGender, EStatus, ICustomer } from '@/models'
import { useGetCustomerReliablesQuery } from '@/services/customers/customerService'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import React from 'react'
import styled from 'styled-components'
import { Badge } from '../badge'
import { ItemContainer } from '../item-container'
import { JustifyBetweenColumn, JustifyBetweenRow, JustifyCenterRow, Row } from '../layout'

interface IProps {
  customerId: ICustomer['_id']
  activeIndex: number
  onActiveStepChange: (index: number) => void
}

interface IStyledProps {
  isActive: boolean
}

const SliderDot = styled.div<IStyledProps>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ isActive }) => (isActive ? colors.gray.dark : colors.gray.secondary)};
`

const ReliableSlider: React.FC<IProps> = ({ customerId, activeIndex, onActiveStepChange }) => {
  const { data: customerReliablesData, isLoading: customerIsLoading } = useGetCustomerReliablesQuery(customerId)

  console.log('customerReliablesData', customerReliablesData)
  return (
    <ItemContainer>
      {!customerIsLoading && customerReliablesData && (
        <ItemContainer>
          <JustifyBetweenColumn>
            <ItemContainer
              borderBottom={'1px solid ' + colors.gray.secondary}
              borderTop={'1px solid ' + colors.gray.secondary}
              borderLeft={'1px solid ' + colors.gray.secondary}
              borderRight={'1px solid ' + colors.gray.secondary}
              borderRadius={'0.3rem 0.3rem 0.3rem 0.3rem'}
            >
              <JustifyBetweenRow>
                <ItemContainer>
                  <JustifyBetweenColumn>
                    <JustifyBetweenRow>
                      <ItemContainer>Name</ItemContainer>
                      <ItemContainer width="auto">
                        {customerReliablesData[activeIndex].firstname +
                          ' ' +
                          customerReliablesData[activeIndex].lastname}
                      </ItemContainer>
                    </JustifyBetweenRow>
                    <JustifyBetweenRow>
                      <ItemContainer>Email</ItemContainer>
                      <ItemContainer width="auto">{customerReliablesData[activeIndex].email}</ItemContainer>
                    </JustifyBetweenRow>

                    <JustifyBetweenRow>
                      <ItemContainer>Phone</ItemContainer>
                      <ItemContainer width="auto">{customerReliablesData[activeIndex].phone}</ItemContainer>
                    </JustifyBetweenRow>

                    <JustifyBetweenRow>
                      <ItemContainer>Gender</ItemContainer>
                      <ItemContainer width="auto">
                        {customerReliablesData[activeIndex].gender === 0 ? EGender.FEMALE : EGender.MALE}
                      </ItemContainer>
                    </JustifyBetweenRow>
                    <JustifyBetweenRow>
                      <ItemContainer>Status</ItemContainer>
                      <ItemContainer width="auto">
                        <Badge color={selectColorForStatus(customerReliablesData[activeIndex].status)}>
                          {EStatus[customerReliablesData[activeIndex].status]}
                        </Badge>
                      </ItemContainer>
                    </JustifyBetweenRow>

                    <JustifyBetweenRow>
                      <ItemContainer>Customer Type</ItemContainer>
                      <ItemContainer width="auto">
                        <Badge
                          children={ECustomerType[customerReliablesData[activeIndex].customerType]}
                          color={colors.gray.dark}
                        />
                      </ItemContainer>
                    </JustifyBetweenRow>

                    <JustifyBetweenRow>
                      <ItemContainer>Reffered By</ItemContainer>
                      <ItemContainer>
                        {/* <Badge color={customerReliablesData[activeIndex].refferedBy.color}>
                          {customerReliablesData[activeIndex].refferedBy.name}
                        </Badge> */}
                      </ItemContainer>
                    </JustifyBetweenRow>
                  </JustifyBetweenColumn>
                </ItemContainer>
              </JustifyBetweenRow>
            </ItemContainer>

            <ItemContainer>
              <JustifyCenterRow>
                {customerReliablesData.map((customerReliable, index) => (
                  <ItemContainer
                    width="auto"
                    margin="0.2rem"
                    cursorType="pointer"
                    onClick={() => onActiveStepChange(index)}
                  >
                    <SliderDot key={index} isActive={index === activeIndex} />
                  </ItemContainer>
                ))}
              </JustifyCenterRow>
            </ItemContainer>
          </JustifyBetweenColumn>
        </ItemContainer>
      )}
    </ItemContainer>
  )
}

export default ReliableSlider
