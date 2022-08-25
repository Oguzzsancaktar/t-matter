import { Column, ItemContainer, JustifyBetweenColumn, JustifyCenterRow, Tab } from '@/components'
import { ModalHeader, ModalBody } from '@/components/modals/types'
import { IUser } from '@/models'
import React, { useState } from 'react'
import { UserModalSalarySettingsTab, UserModalWorkingScheduleSettingsTab } from '../settings'

interface IProps {
  userId: IUser['_id']
}
const UserModalSettingsTab: React.FC<IProps> = ({ userId }) => {
  const [activeTab, setActiveTab] = useState('salary-settings')

  return (
    <Column height="100%">
      <ModalHeader>
        <ItemContainer>
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
                name="Working Schedule Settings"
                isActive={activeTab === 'working-schedule-settings'}
                onClick={() => setActiveTab('working-schedule-settings')}
              />
            </JustifyCenterRow>
          </JustifyBetweenColumn>
        </ItemContainer>
      </ModalHeader>
      <ModalBody minHeight="100% - 63px">
        <ItemContainer height="100%">
          {activeTab === 'salary-settings' ? (
            <UserModalSalarySettingsTab userId={userId} />
          ) : activeTab === 'working-schedule-settings' ? (
            <UserModalWorkingScheduleSettingsTab userId={userId} />
          ) : (
            'hata'
          )}
        </ItemContainer>
      </ModalBody>
    </Column>
  )
}

export default UserModalSettingsTab
