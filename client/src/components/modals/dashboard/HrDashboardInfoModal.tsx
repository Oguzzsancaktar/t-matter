import { Column, ItemContainer, JustifyBetweenColumn, JustifyCenterRow, Tab } from '@/components'
import { ModalHeader, ModalBody } from '@components/modals/types'
import React, { useState } from 'react'
import MentalHrTab from '@pages/dashboard/hr-dashboard-card/MentalHrTab'
import AbsentHrTab from '@pages/dashboard/hr-dashboard-card/AbsentHrTab'
import VocationHrTab from '@pages/dashboard/hr-dashboard-card/VocationHrTab'
import OthersHrTab from '@pages/dashboard/hr-dashboard-card/OthersHrTab'
import LoginHrTab from '@pages/dashboard/hr-dashboard-card/LoginHrTab'

const Component = {
  LoginHrTab,
  MentalHrTab,
  AbsentHrTab,
  VocationHrTab,
  OthersHrTab
}

const HrDashboardInfoModal: React.FC<{ page: string; dateRange?: { startDate: Date; endDate: Date } }> = ({
  page,
  dateRange
}) => {
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
                  name="Login"
                  isActive={activeTab === 'LoginHrTab'}
                  onClick={() => setActiveTab('LoginHrTab')}
                />

                <Tab
                  margin="0 1rem 0 0rem"
                  index={1}
                  name="Mental"
                  isActive={activeTab === 'MentalHrTab'}
                  onClick={() => setActiveTab('MentalHrTab')}
                />

                <Tab
                  margin="0 1rem 0 0rem"
                  index={2}
                  name="Absent"
                  isActive={activeTab === 'AbsentHrTab'}
                  onClick={() => setActiveTab('AbsentHrTab')}
                />

                <Tab
                  margin="0 1rem 0 0rem"
                  index={3}
                  name="Vocation"
                  isActive={activeTab === 'VocationHrTab'}
                  onClick={() => setActiveTab('VocationHrTab')}
                />
                <Tab
                  margin="0 1rem 0 0rem"
                  index={4}
                  name="Others"
                  isActive={activeTab === 'OthersHrTab'}
                  onClick={() => setActiveTab('OthersHrTab')}
                />
              </JustifyCenterRow>
            </JustifyBetweenColumn>
          </ItemContainer>
        </ModalHeader>
        <ModalBody backgroundColor="white" padding="0" height="calc(100% - 63px)">
          {Component[activeTab] && React.createElement(Component[activeTab], { dateRange })}
        </ModalBody>
      </Column>
    </ItemContainer>
  )
}

export default HrDashboardInfoModal
