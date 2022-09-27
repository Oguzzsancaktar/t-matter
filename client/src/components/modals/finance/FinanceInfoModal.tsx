import { Column, ItemContainer, JustifyBetweenColumn, JustifyCenterRow, Tab } from '@/components'
import { ModalHeader, ModalBody } from '@components/modals/types'
import React, { useState } from 'react'
import { AdditionalTimeTab, FinanceInfoInstallmentTab, NonBillableTab } from '@pages/dashboard/finance-dashboard-card'

const Component = {
  FinanceInfoInstallmentTab,
  AdditionalTimeTab,
  NonBillableTab
}

const FinanceInfoModal: React.FC<{ page: string }> = ({ page }) => {
  const [activeTab, setActiveTab] = useState(page)

  return (
    <ItemContainer height="100%" minHeight="700px" overflow="hidden">
      <Column height="100%">
        <ModalHeader>
          <ItemContainer>
            <JustifyBetweenColumn>
              <JustifyCenterRow>
                <Tab
                  margin="0 1rem 0 0rem"
                  index={0}
                  name="Installments"
                  isActive={activeTab === 'FinanceInfoInstallmentTab'}
                  onClick={() => setActiveTab('FinanceInfoInstallmentTab')}
                />

                <Tab
                  margin="0 1rem 0 0rem"
                  index={1}
                  name="Additional Time"
                  isActive={activeTab === 'AdditionalTimeTab'}
                  onClick={() => setActiveTab('AdditionalTimeTab')}
                />

                <Tab
                  margin="0 1rem 0 0rem"
                  index={2}
                  name="Non Billable"
                  isActive={activeTab === 'NonBillableTab'}
                  onClick={() => setActiveTab('NonBillableTab')}
                />
              </JustifyCenterRow>
            </JustifyBetweenColumn>
          </ItemContainer>
        </ModalHeader>
        <ModalBody backgroundColor="white" padding="0" height="100%">
          {React.createElement(Component[activeTab], {})}
        </ModalBody>
      </Column>
    </ItemContainer>
  )
}

export default FinanceInfoModal
