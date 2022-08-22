import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenColumn } from '@/components/layout'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import { ICustomer } from '@/models'
import { CreateContactTab, UpdateContactTab } from '@/pages/customer-modal'
import { useGetCustomerByIdQuery } from '@/services/customers/customerService'
import React from 'react'
import { ModalBody, ModalHeader } from '../types'

interface IProps {
  customerId: ICustomer['_id']
}
const UpdateCustomerModal: React.FC<IProps> = ({ customerId }) => {
  const { data: customerDetailData, isLoading: customerDetailDataIsLoading } = useGetCustomerByIdQuery(customerId)

  return (
    <ItemContainer height="100%">
      {customerDetailData && !customerDetailDataIsLoading && (
        <JustifyBetweenColumn height="100%">
          <ModalHeader>
            <H1 width="100%" textAlign="center" color={colors.white.primary}>
              {customerDetailData.customerType === 0 ? 'Update Contact' : 'Update Client'} -{' '}
              {customerDetailData.firstname + ' ' + customerDetailData.lastname}
            </H1>
          </ModalHeader>
          <ModalBody minHeight="100% - 63px">
            {customerDetailData?.customerType === 0 ? (
              <UpdateContactTab customer={customerDetailData} />
            ) : customerDetailData?.customerType === 1 ? (
              <CreateContactTab />
            ) : (
              'Something went wrong'
            )}
          </ModalBody>
        </JustifyBetweenColumn>
      )}
    </ItemContainer>
  )
}

export default UpdateCustomerModal
