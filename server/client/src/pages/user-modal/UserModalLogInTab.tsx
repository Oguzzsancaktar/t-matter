import { InnerWrapper, JustifyBetweenColumn, JustifyCenterRow, Tab } from '@/components'
import { ModalHeader, ModalBody } from '@/components/modals/types'
import React, { useState } from 'react'
import { UserRoleSettings, UserTaskSettingsTab, UserPageSettingsTab } from '../Settings'

const UserModalLogInTab = () => {
  const [activeTab, setActiveTab] = useState('user-role-settings')

  return (
    <InnerWrapper>
      <ModalHeader>
        <JustifyBetweenColumn>
          <JustifyCenterRow>
            <Tab
              margin="0 1rem 0 0rem"
              index={1}
              name="User Role Settings"
              isActive={activeTab === 'user-role-settings'}
              onClick={() => setActiveTab('user-role-settings')}
            />

            {/* <Tab
              margin="0 1rem 0 0rem"
              index={2}
              name="User Task Setting"
              isActive={activeTab === 'user-task-settings'}
              onClick={() => setActiveTab('user-task-settings')}
            /> */}

            <Tab
              margin="0 1rem 0 0rem"
              index={2}
              name="User Settings"
              isActive={activeTab === 'user-page-settings'}
              onClick={() => setActiveTab('user-page-settings')}
            />
          </JustifyCenterRow>
        </JustifyBetweenColumn>
      </ModalHeader>
      <ModalBody minHeight="700px">
        {activeTab === 'user-role-settings' ? (
          <UserRoleSettings />
        ) : activeTab === 'user-task-settings' ? (
          <UserTaskSettingsTab />
        ) : (
          <UserPageSettingsTab />
        )}
      </ModalBody>
    </InnerWrapper>
  )
}

export default UserModalLogInTab
