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
        width: ESize.XLarge,
        height: ESize.Large,
        backgroundColor: 'transparent'
      })
    )
  }

  return (
    <ItemContainer>
      <ItemContainer onClick={() => handleReliableClick(customer._id)}>
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
                  <JustifyCenterRow>
                    <ItemContainer width="auto">{customer?.firstname + ' ' + customer?.lastname}</ItemContainer>
                  </JustifyCenterRow>

                  <JustifyCenterRow>
                    <ItemContainer width="auto">
                      <Badge color={selectColorForStatus(customer?.status)}>{EStatus[customer?.status]}</Badge>
                    </ItemContainer>
                    <ItemContainer width="auto">
                      <Badge children={ECustomerType[customer?.customerType]} color={colors.gray.dark} />
                    </ItemContainer>
                  </JustifyCenterRow>

                  <JustifyCenterRow>
                    <ItemContainer width="auto">{customer?.email}</ItemContainer>
                  </JustifyCenterRow>

                  <JustifyCenterRow>
                    <ItemContainer width="auto">{customer?.phone}</ItemContainer>
                  </JustifyCenterRow>

                  <JustifyCenterRow>
                    <ItemContainer width="auto">
                      {reliableCustomers[activeIndex].relativeType.fromOrTo == 0
                        ? relativeType.relateTo
                        : relativeType.relateFrom}
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
