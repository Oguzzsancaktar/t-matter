import { InnerWrapper, JustifyBetweenColumn, JustifyCenterRow, Tab } from '@/components'
import { ModalHeader, ModalBody } from '@/components/modals/types'
import React, { useState } from 'react'
import { UserModalSalarySettingsTab, UserModalLogInSettingsTab } from '../Settings'

const UserModalSettingsTab = () => {
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
              name="Log In Settings"
              isActive={activeTab === 'log-in-settings'}
              onClick={() => setActiveTab('log-in-settings')}
            />
          </JustifyCenterRow>
        </JustifyBetweenColumn>
      </ModalHeader>
      <ModalBody minHeight="700px">
        {activeTab === 'salary-settings' ? (
          <UserModalSalarySettingsTab />
        ) : activeTab === 'log-in-settings' ? (
          <UserModalLogInSettingsTab />
        ) : (
          'hata'
        )}
      </ModalBody>
    </InnerWrapper>
  )
}

export default UserModalSettingsTab
