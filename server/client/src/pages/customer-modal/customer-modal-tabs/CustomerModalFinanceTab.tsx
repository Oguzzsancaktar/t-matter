import React, { useState } from 'react'
import { ICustomer } from '@/models'
import { Column, ItemContainer, JustifyBetweenColumn, JustifyCenterRow, Tab } from '@/components'
import { ModalBody, ModalHeader } from '@components/modals/types'
import InvoiceTab from '@pages/customer-modal/customer-modal-tabs/finance-tabs/InvoiceTab'
import EstimateTab from '@pages/customer-modal/customer-modal-tabs/finance-tabs/estimate-tab/EstimateTab'
import InstallmentTab from '@pages/customer-modal/customer-modal-tabs/finance-tabs/InstallmentTab'

interface IProps {
  customerId: ICustomer['_id']
}

const Component = {
  InvoiceTab,
  EstimateTab,
  InstallmentTab
}
console.log('Component', Component)

const CustomerModalFinanceTab: React.FC<IProps> = ({ customerId }) => {
  const [activeTab, setActiveTab] = useState('EstimateTab')

  return (
    <ItemContainer height="100%" minHeight="700px">
      <Column height="100%">
        <ModalHeader>
          <ItemContainer>
            <JustifyBetweenColumn>
              <JustifyCenterRow>
                <Tab
                  margin="0 1rem 0 0rem"
                  index={0}
                  name="Estimate"
                  isActive={activeTab === 'EstimateTab'}
                  onClick={() => setActiveTab('EstimateTab')}
                />

                <Tab
                  margin="0 1rem 0 0rem"
                  index={1}
                  name="Installment"
                  isActive={activeTab === 'InstallmentTab'}
                  onClick={() => setActiveTab('InstallmentTab')}
                />

                <Tab
                  margin="0 1rem 0 0rem"
                  index={2}
                  name="Invoice"
                  isActive={activeTab === 'InvoiceTab'}
                  onClick={() => setActiveTab('InvoiceTab')}
                />
              </JustifyCenterRow>
            </JustifyBetweenColumn>
          </ItemContainer>
        </ModalHeader>

        {React.createElement(Component[activeTab], { customerId })}
      </Column>
    </ItemContainer>
  )
}

export default CustomerModalFinanceTab
