import React, { useState } from 'react'
import { Column, ItemContainer, JustifyBetweenColumn, JustifyCenterRow } from '@components/index'

import { Tab } from '@components/index'
import { CompanyPricing, CompanyVariables, SalarySettings } from '@/pages'
import { ModalBody, ModalHeader } from '../types'

const CompanyPlanningModal = () => {
  const [activeTab, setActiveTab] = useState('salary-settings')

  return (
    <Column height="100%">
      <ModalHeader>
        <JustifyBetweenColumn>
          <JustifyCenterRow>
            <Tab
              margin="0 1rem 0 0rem"
              index={0}
              name="Salary Settings"
              isActive={activeTab === 'salary-settings'}
              onClick={() => setActiveTab('salary-settings')}
            />

            <Tab
              margin="0 1rem 0 0rem"
              index={1}
              name="Company Pricing"
              isActive={activeTab === 'company-pricing'}
              onClick={() => setActiveTab('company-pricing')}
            />

            <Tab
              index={2}
              name="Company Variables"
              isActive={activeTab === 'customer-settings'}
              onClick={() => setActiveTab('customer-settings')}
            />
          </JustifyCenterRow>
        </JustifyBetweenColumn>
      </ModalHeader>

      <ModalBody height="calc(100% - 63px)">
        <ItemContainer height="100%">
          {activeTab === 'salary-settings' ? (
            <SalarySettings />
          ) : activeTab === 'company-pricing' ? (
            <CompanyPricing />
          ) : (
            <CompanyVariables />
          )}
        </ItemContainer>
      </ModalBody>
    </Column>
  )
}

export default CompanyPlanningModal
