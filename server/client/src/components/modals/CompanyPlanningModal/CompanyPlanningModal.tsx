import React, { useState } from 'react'
import { CompanyPricing, JustifyBetweenColumn, JustifyCenterRow, SalarySettings } from '@components/index'
import { InnerWrapper } from '@components/wrapper'

import { Tab } from '@components/index'
import styled from '@emotion/styled'
import colors from '@constants/colors'

const ModalHeader = styled.div`
  border-bottom: 1px solid ${colors.cyan.primary};
  padding: 1rem;
`

const ModalBody = styled.div`
  height: calc(100% - 4rem - 2rem - 84px);
`

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
