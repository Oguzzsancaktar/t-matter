import { UserImage } from '@/components/image'
import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenRow, JustifyCenterColumn } from '@/components/layout'
import { ReadCustomerModal } from '@/components/modals'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize, ICustomer, ICustomerTask } from '@/models'
import { openModal } from '@/store'
import React from 'react'

interface IProps {
  taskData: ICustomerTask

  customer: ICustomer
}
const TaskCustomerCard: React.FC<IProps> = ({ taskData, customer }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const handleCustomerClick = () => {
    if (customer) {
      dispatch(
        openModal({
          id: `customerDetailModal-${customer._id}`,
          title: 'Customer / ' + customer?.firstname + ' ' + customer?.lastname,
          body: <ReadCustomerModal customer={customer} />,
          width: ESize.WXLarge,
          height: ESize.HLarge,
          backgroundColor: 'transparent'
        })
      )
    }
  }

  return (
    <ItemContainer margin="0">
      <JustifyBetweenRow>
        <ItemContainer cursorType="pointer" width="60px" height="60px" onClick={handleCustomerClick}>
          <UserImage data-tip={customer.firstname + ' ' + customer.lastname} src={customer?.profile_img} />
        </ItemContainer>

        <ItemContainer width="calc(100% - 60px  - 0.25rem)" margin="0 0.5rem">
          <JustifyCenterColumn>
            <ItemContainer width="100%" height="30px" borderRadius="0.3rem">
              <JustifyCenterColumn width="100%" height="100%">
                <H1 width="100%" textAlign="center" fontWeight="600" color={colors.primary.dark}>
                  {taskData.name}
                </H1>
              </JustifyCenterColumn>
            </ItemContainer>
          </JustifyCenterColumn>
        </ItemContainer>
      </JustifyBetweenRow>
    </ItemContainer>
  )
}

export default TaskCustomerCard
