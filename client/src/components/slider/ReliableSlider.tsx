import colors from '@/constants/colors'
import useAccessStore from '@/hooks/useAccessStore'
import { ECustomerType, EGender, ESize, EStatus, ICustomer, IRelativeType, IReliableCustomer } from '@/models'
import { useGetCustomerReliablesQuery } from '@/services/customers/customerService'
import { openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import React from 'react'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'
import { Badge } from '../badge'
import { ItemContainer } from '../item-container'
import { JustifyBetweenColumn, JustifyBetweenRow, JustifyCenterRow, Row } from '../layout'
import { ReadCustomerModal } from '../modals'
import { H1 } from '../texts'

type IReliableCustomerExtended = {
  relativeType: {
    fromOrTo: number
    relativeType: IRelativeType
  }
  reliable: ICustomer
}

interface IProps {
  customerId: ICustomer['_id']
  activeIndex: number
  onActiveStepChange: (index: number) => void
  reliableCustomers: IReliableCustomer[] | IReliableCustomerExtended[]
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

const ReliableSlider: React.FC<IProps> = ({ customerId, activeIndex, onActiveStepChange, reliableCustomers }) => {
  // const { data: customerReliablesData, isLoading: customerIsLoading } = useGetCustomerReliablesQuery(customerId)
  reliableCustomers = reliableCustomers as IReliableCustomerExtended[]
  const customer = reliableCustomers[activeIndex]?.reliable
  const relativeType = reliableCustomers[activeIndex].relativeType.relativeType

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const handleReliableClick = (reliableId: ICustomer['_id']) => {
    dispatch(
      openModal({
        id: `customerDetailModal-${reliableId}`,
        title: 'Customer / ' + reliableId,
        body: <ReadCustomerModal customer={customer} />,
        width: ESize.WXLarge,
        height: ESize.HLarge,
        backgroundColor: 'transparent'
      })
    )
  }

  return (
    <ItemContainer>
      <ItemContainer>
        <JustifyBetweenColumn>
          <ItemContainer
            padding="1rem 0"
            borderTop={'1px solid ' + colors.gray.secondary}
            onClick={() => handleReliableClick(customer._id)}
          >
            <JustifyBetweenRow>
              <ItemContainer>
                <JustifyBetweenColumn>
                  <JustifyCenterRow>
                    <ItemContainer width="auto">
                      <H1 fontSize="1.2rem" textAlign="center" color={colors.text.primary} margin="1rem 0">
                        {customer?.firstname + ' ' + customer?.lastname}
                      </H1>
                    </ItemContainer>
                  </JustifyCenterRow>

                  <JustifyCenterRow>
                    <ItemContainer width="auto" margin=" 0 0.5rem 0 0">
                      <Badge children={ECustomerType[customer?.customerType]} color={colors.gray.dark} />
                    </ItemContainer>
                    <ItemContainer width="auto">
                      <Badge color={selectColorForStatus(customer?.status)}>{EStatus[customer?.status]}</Badge>
                    </ItemContainer>
                  </JustifyCenterRow>

                  <JustifyCenterRow>
                    <ItemContainer width="auto">
                      <H1 fontSize="0.8rem" textAlign="center" color={colors.text.primary} margin="0.5rem 0">
                        {customer?.email}
                      </H1>
                    </ItemContainer>
                  </JustifyCenterRow>

                  <JustifyCenterRow>
                    <ItemContainer width="auto">
                      <H1 fontSize="0.8rem" textAlign="center" color={colors.text.primary} margin="0.5rem 0">
                        {customer?.phone}
                      </H1>
                    </ItemContainer>
                  </JustifyCenterRow>

                  <JustifyCenterRow>
                    <ItemContainer width="auto">
                      <H1 fontSize="0.8rem" textAlign="center" color={colors.text.primary} margin="0.5rem 0">
                        {reliableCustomers[activeIndex].relativeType.fromOrTo === 0
                          ? relativeType.relateTo
                          : relativeType.relateFrom}
                      </H1>
                    </ItemContainer>
                  </JustifyCenterRow>
                </JustifyBetweenColumn>
              </ItemContainer>
            </JustifyBetweenRow>
          </ItemContainer>

          <ItemContainer>
            <JustifyCenterRow>
              {reliableCustomers.map((customerReliable, index) => (
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
    </ItemContainer>
  )
}

export default ReliableSlider
