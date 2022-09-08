import React, { useState } from 'react'
import { Column, ItemContainer, JustifyBetweenColumn, JustifyCenterRow } from '@components/index'

import { Tab } from '@components/index'
import { CompanyPricing, CompanyVariables, SalarySettings, CompanyInfo } from '@/pages'
import { ModalBody, ModalHeader } from '../types'

const Component = {
  CompanyPricing,
  CompanyVariables,
  SalarySettings,
  CompanyInfo
}

const CompanyPlanningModal = () => {
  const [activeTab, setActiveTab] = useState('CompanyPricing')

  return (
    <Column height="100%">
      <ModalHeader>
        <JustifyBetweenColumn>
          <JustifyCenterRow>
            <Tab
              margin="0 1rem 0 0rem"
              index={0}
              name="Company Info"
              isActive={activeTab === 'CompanyInfo'}
              onClick={() => setActiveTab('CompanyInfo')}
            />

            <Tab
              margin="0 1rem 0 0rem"
              index={1}
              name="Salary Settings"
              isActive={activeTab === 'SalarySettings'}
              onClick={() => setActiveTab('SalarySettings')}
            />

            <Tab
              margin="0 1rem 0 0rem"
              index={2}
              name="Company Pricing"
              isActive={activeTab === 'CompanyPricing'}
              onClick={() => setActiveTab('CompanyPricing')}
            />

            <Tab
              index={3}
              name="Company Variables"
              isActive={activeTab === 'CompanyVariables'}
              onClick={() => setActiveTab('CompanyVariables')}
            />
          </JustifyCenterRow>
        </JustifyBetweenColumn>
      </ModalHeader>

      <ModalBody height="calc(100% - 63px)">
        <ItemContainer height="100%">{React.createElement(Component[activeTab], {})}</ItemContainer>
      </ModalBody>
    </Column>
  )
}

export default CompanyPlanningModal
