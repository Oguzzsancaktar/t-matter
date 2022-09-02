import { Column, JustifyBetweenColumn, JustifyCenterRow } from '@/components/layout'
import React, { useState } from 'react'
import { ItemContainer, Tab } from '@/components'
import { ModalHeader, ModalBody } from '@components/modals/types'
import { InvoiceCategoryTab, PaymentSettingsTab, PointSettingsTab } from '@/pages'

const Component = {
  InvoiceCategoryTab,
  PaymentSettingsTab,
  PointSettingsTab
}

const FinancePlaningModal = () => {
  const [activeTab, setActiveTab] = useState('InvoiceCategoryTab')

  return (
    <ItemContainer minHeight="700px">
      <Column>
        <ModalHeader>
          <ItemContainer>
            <JustifyBetweenColumn>
              <JustifyCenterRow>
                <Tab
                  margin="0 1rem 0 0rem"
                  index={0}
                  name="Invoice Category"
                  isActive={activeTab === 'InvoiceCategoryTab'}
                  onClick={() => setActiveTab('InvoiceCategoryTab')}
                />

                <Tab
                  margin="0 1rem 0 0rem"
                  index={1}
                  name="Payment Settings"
                  isActive={activeTab === 'PaymentSettingsTab'}
                  onClick={() => setActiveTab('PaymentSettingsTab')}
                />

                <Tab
                  margin="0 1rem 0 0rem"
                  index={2}
                  name="Point Settings"
                  isActive={activeTab === 'PointSettingsTab'}
                  onClick={() => setActiveTab('PointSettingsTab')}
                />
              </JustifyCenterRow>
            </JustifyBetweenColumn>
          </ItemContainer>
        </ModalHeader>

        <ModalBody height="800px">{React.createElement(Component[activeTab])}</ModalBody>
      </Column>
    </ItemContainer>
  )
}

export default FinancePlaningModal
