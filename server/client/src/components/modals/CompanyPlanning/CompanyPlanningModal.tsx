import React, { useState } from 'react'
import { JustifyBetweenColumn, JustifyCenterRow } from '@components/index'
import { InnerWrapper } from '@components/wrapper'

import { Tab } from '@components/index'
import { CompanyPricing, SalarySettings } from '@/pages'
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
              index={2}
              name="Company Pricing"
              isActive={activeTab === 'company-pricing'}
              onClick={() => setActiveTab('company-pricing')}
            />
          </JustifyCenterRow>
        </JustifyBetweenColumn>
      </ModalHeader>

      <ModalBody>{activeTab === 'company-pricing' ? <CompanyPricing /> : <SalarySettings />}</ModalBody>
    </InnerWrapper>
  )
}

export default CompanyPlanningModal
