import React, { useState } from 'react'
import { JustifyBetweenColumn, JustifyCenterRow } from '@components/index'
import { InnerWrapper } from '@components/wrapper'

import { Tab } from '@components/index'
import { CompanyPricing, CustomerSettings, SalarySettings } from '@/pages'
import { ModalBody, ModalHeader } from '../types'

const CompanyPlanningModal = () => {
  const [activeTab, setActiveTab] = useState('salary-settings')

  return (
    <InnerWrapper>
      <ModalHeader>
        <JustifyBetweenColumn>
          <JustifyCenterRow>
            <Tab
              margin="0 1rem 0 0rem"
              index={1}
              name="Salary Settings"
              isActive={activeTab === 'salary-settings'}
              onClick={() => setActiveTab('salary-settings')}
            />

            <Tab
              margin="0 1rem 0 0rem"
              index={2}
              name="Company Pricing"
              isActive={activeTab === 'company-pricing'}
              onClick={() => setActiveTab('company-pricing')}
            />

            <Tab
              index={3}
              name="Customer Settings"
              isActive={activeTab === 'customer-settings'}
              onClick={() => setActiveTab('customer-settings')}
            />
          </JustifyCenterRow>
        </JustifyBetweenColumn>
      </ModalHeader>

      <ModalBody>
        {activeTab === 'salary-settings' ? (
          <SalarySettings />
        ) : activeTab === 'company-pricing' ? (
          <CompanyPricing />
        ) : (
          <CustomerSettings />
        )}
      </ModalBody>
    </InnerWrapper>
  )
}

export default CompanyPlanningModal
