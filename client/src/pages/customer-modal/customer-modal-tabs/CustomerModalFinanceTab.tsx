import React, { useState } from 'react'
import { ICustomer } from '@/models'
import { Column, ItemContainer, JustifyBetweenColumn, JustifyCenterRow, SideDrawer, Tab } from '@/components'
import { ModalBody, ModalHeader } from '@components/modals/types'
import InvoiceTab from '@pages/customer-modal/customer-modal-tabs/finance-tabs/InvoiceTab'
import EstimateTab from '@pages/customer-modal/customer-modal-tabs/finance-tabs/estimate-tab/EstimateTab'
import InstallmentTab from '@pages/customer-modal/customer-modal-tabs/finance-tabs/InstallmentTab'
import ShowHistory from '@components/show-history/ShowHistory'

interface IProps {
  customerId: ICustomer['_id']
}

const Component = {
  InvoiceTab,
  EstimateTab,
  InstallmentTab
}

const CustomerModalFinanceTab: React.FC<IProps> = ({ customerId }) => {
  const [activeTab, setActiveTab] = useState('EstimateTab')
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)

  const handleToggle = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsHistoryOpen(!isHistoryOpen)
  }

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
          {!isHistoryOpen && <ShowHistory onClick={handleToggle}>Show History</ShowHistory>}
        </ModalHeader>

        {React.createElement(Component[activeTab], { customerId })}
        <SideDrawer
          onOutsideClick={() => setTimeout(() => setIsHistoryOpen(false), 0)}
          isHistoryOpen={isHistoryOpen}
        ></SideDrawer>
      </Column>
    </ItemContainer>
  )
}

export default CustomerModalFinanceTab
