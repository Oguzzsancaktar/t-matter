import { Column, InnerWrapper, JustifyBetweenColumn, JustifyCenterRow, Tab } from '@/components'
import { ModalHeader, ModalBody } from '@/components/modals/types'
import React, { useState } from 'react'
import { UserModalSalarySettingsTab, UserModalLogInSettingsTab } from '../Settings'

const UserModalSettingsTab = () => {
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
                name="Log In Settings"
                isActive={activeTab === 'log-in-settings'}
                onClick={() => setActiveTab('log-in-settings')}
              />
            </JustifyCenterRow>
          </JustifyBetweenColumn>
        </InnerWrapper>
      </ModalHeader>
      <ModalBody>
        <InnerWrapper>
          {activeTab === 'salary-settings' ? (
            <UserModalSalarySettingsTab />
          ) : activeTab === 'log-in-settings' ? (
            <UserModalLogInSettingsTab />
          ) : (
            'hata'
          )}
        </InnerWrapper>
      </ModalBody>
    </Column>
  )
}

export default UserModalSettingsTab
