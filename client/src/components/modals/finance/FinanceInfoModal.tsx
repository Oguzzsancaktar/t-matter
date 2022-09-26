import { Column, ItemContainer, JustifyBetweenColumn, JustifyCenterRow, Tab } from '@/components'
import { ModalHeader, ModalBody } from '@components/modals/types'
import React, { useState } from 'react'

const Component = {}

const FinanceInfoModal = () => {
  const [activeTab, setActiveTab] = useState('')

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
                  isActive={activeTab === 'InstallmentsTab'}
                  onClick={() => setActiveTab('InstallmentsTab')}
                />

                <Tab
                  margin="0 1rem 0 0rem"
                  index={1}
                  name="Notifications"
                  isActive={activeTab === 'NotificationsTab'}
                  onClick={() => setActiveTab('NotificationsTab')}
                />
              </JustifyCenterRow>
            </JustifyBetweenColumn>
          </ItemContainer>
        </ModalHeader>
        <ModalBody backgroundColor="white" padding="0" height="100%"></ModalBody>
      </Column>
    </ItemContainer>
  )
}

export default FinanceInfoModal
