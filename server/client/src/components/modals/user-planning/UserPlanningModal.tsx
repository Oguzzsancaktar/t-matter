import React, { useState } from 'react'
import { UserPageSettingsTab, UserRoleSettings, UserTaskSettingsTab } from '@/pages'
import { Column, JustifyBetweenColumn, JustifyCenterRow } from '@components/layout'
import { Tab } from '@components/tab'
import { ModalBody, ModalHeader } from '../types'

const UserPlanningModal = () => {
  const [activeTab, setActiveTab] = useState('user-role-settings')

  return (
    <Column height="100%">
      <ModalHeader>
        <JustifyBetweenColumn>
          <JustifyCenterRow>
            <Tab
              margin="0 1rem 0 0rem"
              index={0}
              name="User Role Settings"
              isActive={activeTab === 'user-role-settings'}
              onClick={() => setActiveTab('user-role-settings')}
            />

            <Tab
              margin="0 1rem 0 0rem"
              index={1}
              name="User Settings"
              isActive={activeTab === 'user-page-settings'}
              onClick={() => setActiveTab('user-page-settings')}
            />
          </JustifyCenterRow>
        </JustifyBetweenColumn>
      </ModalHeader>

      <ModalBody minHeight="100% - 63px">
        {activeTab === 'user-role-settings' ? (
          <UserRoleSettings />
        ) : activeTab === 'user-task-settings' ? (
          <UserTaskSettingsTab />
        ) : (
          <UserPageSettingsTab />
        )}
      </ModalBody>
    </Column>
  )
}

export default UserPlanningModal
