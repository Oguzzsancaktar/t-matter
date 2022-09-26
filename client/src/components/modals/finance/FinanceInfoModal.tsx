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
                  name="Paid"
                  isActive={activeTab === 'PaidTab'}
                  onClick={() => setActiveTab('PaidTab')}
                />

                <Tab
                  margin="0 1rem 0 0rem"
                  index={1}
                  name="Unpaid"
                  isActive={activeTab === 'UnpaidTab'}
                  onClick={() => setActiveTab('UnpaidTab')}
                />

                <Tab
                  margin="0 1rem 0 0rem"
                  index={2}
                  name="Additional"
                  isActive={activeTab === 'AdditionalTab'}
                  onClick={() => setActiveTab('AdditionalTab')}
                />

                <Tab
                  margin="0 1rem 0 0rem"
                  index={3}
                  name="Non Billable"
                  isActive={activeTab === 'NonBillableTab'}
                  onClick={() => setActiveTab('NonBillableTab')}
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
