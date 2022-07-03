import React, { useState } from 'react'
import { Column, JustifyBetweenColumn, JustifyCenterRow } from '@components/index'
import { InnerWrapper } from '@components/wrapper'

import { Tab } from '@components/index'
import { CompanyPricing, CustomerSettings, SalarySettings } from '@/pages'
import { ModalBody, ModalHeader } from '../types'

const CompanyPlanningModal = () => {
  const [activeTab, setActiveTab] = useState('salary-settings')

  return (
    <Column>
      <ModalHeader>
        <InnerWrapper>
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
        </InnerWrapper>
      </ModalHeader>

      <ModalBody minHeight="700px">
        <InnerWrapper>
          {activeTab === 'salary-settings' ? (
            <SalarySettings />
          ) : activeTab === 'company-pricing' ? (
            <CompanyPricing />
          ) : (
            <CustomerSettings />
          )}
        </InnerWrapper>
      </ModalBody>
    </Column>
  )
}

export default CompanyPlanningModal
