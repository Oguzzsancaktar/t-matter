import { Column } from '@/components/layout'
import { InnerWrapper } from '@/components/wrapper'
import { ICustomer } from '@/models'
import { CreateContactTab, UpdateContactTab } from '@/pages/customer-modal'
import { useGetCustomerByIdQuery } from '@/services/customers/customerService'
import React, { useState } from 'react'
import { ModalBody } from '../types'

interface IProps {
  customerId: ICustomer['_id']
}
const UpdateCustomerModal: React.FC<IProps> = ({ customerId }) => {
  const { data: customerDetailData, isLoading: customerDetailDataIsLoading } = useGetCustomerByIdQuery(customerId)

  const [activeTab, setActiveTab] = useState<number>(customerDetailData?.customerType || 0)

  return (
    <Column>
      {customerDetailData && !customerDetailDataIsLoading && (
        <ModalBody>
          <InnerWrapper>
            {activeTab === 0 ? (
              <UpdateContactTab customer={customerDetailData} />
            ) : activeTab === 1 ? (
              <CreateContactTab />
            ) : (
              'Something went wrong'
            )}
          </InnerWrapper>
        </ModalBody>
      )}
    </Column>
  )
}

export default UpdateCustomerModal
